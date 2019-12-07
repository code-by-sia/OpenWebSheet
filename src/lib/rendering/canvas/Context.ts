import { TextAlign } from "../../core/Appearance";

/**
 * Created by SiamandM on 6/16/2016.
 */

export enum LayoutDirection {
  LeftToRight = 1,
  RightToLeft = 2
}

export class Point {

  constructor(x: number = 0, y: number = 0) {
    this.x = x;
    this.y = y;
  }

  x: number;
  y: number;
}

export class ContextMask {

  private x: number = 0;
  private y: number = 0;
  private width: number = 0;
  private height: number = 0;

  constructor(left: number, top: number, width: number, height: number) {
    this.x = left;
    this.y = top;
    this.width = width;
    this.height = height;
  }


  public get_left() {
    return this.x;
  }

  public set_left(value: number) {
    this.x = value;
  }

  public get_top() {
    return this.y;
  }

  public get_right() {
    return this.x + this.width;
  }

  public get_bottom() {
    return this.y + this.height;
  }

  public set_top(value: number) {
    this.y = value;
  }

  public get_width() {
    return this.width;
  }

  public set_width(value: number) {
    this.width = value;
  }

  public get_height() {
    return this.height;
  }

  public set_height(value: number) {
    this.height = value;
  }

  public set_value(x: number, y: number, w: number, h: number) {
    this.x = x;
    this.y = y;
    this.width = w;
    this.height = h;
  }

  public get_combinedMask(x: number, y: number, w: number, h: number) {
    let x2 = Math.min(x + w, this.get_right());
    let y2 = Math.min(y + h, this.get_bottom());

    w = Math.min(x2 - x, this.get_width());
    h = Math.min(y2 - y, this.get_height());

    x = Math.max(x, this.get_left());
    y = Math.max(y, this.get_top());

    return new ContextMask(x, y, w, h);
  }

}

export class Context {

  private context2d: CanvasRenderingContext2D;
  private width: number;
  private height: number;
  private currentMask!: ContextMask | null;
  private maskStack: ContextMask[] = [];

  public direction: LayoutDirection = LayoutDirection.LeftToRight;
  public textAlign: TextAlign = TextAlign.Left;
  public fillStyle: any = '#fff';
  public strokeStyle = '#000';
  public strokeSize = 1;
  public contentFillStyle = '#000';
  public fontStyle = "";
  public fontSize = 12;
  public fontName = "Tahoma";

  constructor(context: CanvasRenderingContext2D, width: number, height: number) {
    this.context2d = context;
    this.width = width;
    this.height = height;
  }


  private applyFill() {
    this.context2d.fillStyle = this.fillStyle;
  }

  private applyStroke() {
    this.context2d.strokeStyle = this.strokeStyle;
    this.context2d.lineWidth = this.strokeSize;
  }

  private applyContent() {
    const style = this.fontStyle.replace('underline', '');
    this.context2d.fillStyle = this.contentFillStyle;
    this.context2d.font = (`${this.fontStyle} ${this.fontSize}px ${this.fontName}`).trim();
    this.context2d.textAlign = 'left';
  }

  get_directed_x(x: number, width: number = 0) {
    if (this.direction == LayoutDirection.LeftToRight)
      return x;
    return this.width - x - width;
  }

  get_textWidth(text: string) {
    return this.context2d.measureText(text).width;
  }

  save() {
    this.context2d.save();
    this.context2d.translate(-0.5, -0.5);
    if (this.currentMask) {
      let cmask = this.currentMask;

      this.context2d.rect(cmask.get_left(), cmask.get_top(), cmask.get_width(), cmask.get_height());
      this.context2d.clip();
    }

  }

  restore() {
    this.context2d.restore();
  }

  setMask(x: number, y: number, w: number, h: number, affectPreviousMask: boolean = false) {
    x = this.get_directed_x(x, w);

    if (this.currentMask) {
      this.maskStack.push(this.currentMask);
    }
    if (affectPreviousMask && this.currentMask) {
      this.currentMask = this.currentMask.get_combinedMask(x, y, w, h);
    } else {
      this.currentMask = new ContextMask(x, y, w, h);
    }
  }

  unmask() {
    if (this.maskStack.length > 0) {
      this.currentMask = <ContextMask>this.maskStack.pop();
    } else {
      this.currentMask = null;
    }
  }

  clearRect(x: number, y: number, w: number, h: number) {
    x = this.get_directed_x(x, w);
    this.save();
    this.context2d.clearRect(x, y, w, h);
    this.restore();
  }

  fillRect(x: number, y: number, w: number, h: number) {
    x = this.get_directed_x(x, w);
    this.save();
    this.applyFill();
    this.context2d.beginPath();
    this.context2d.fillRect(x, y, w, h);
    this.context2d.fill();
    this.restore();
  }

  strokeRect(x: number, y: number, w: number, h: number) {
    x = this.get_directed_x(x, w);
    this.save();
    this.applyStroke();
    this.context2d.beginPath();
    this.context2d.strokeRect(x, y, w, h);
    this.context2d.stroke();
    this.restore();
  }

  line(x1: number, y1: number, x2: number, y2: number) {
    x1 = this.get_directed_x(x1);
    x2 = this.get_directed_x(x2);

    this.save();
    this.applyStroke();
    this.context2d.beginPath();
    this.context2d.moveTo(x1, y1);
    this.context2d.lineTo(x2, y2);
    this.context2d.stroke();
    this.restore();
  }

  private internalPath(close: boolean, stroke: boolean, fill: boolean, points: Point[]) {
    let args: any = [close, stroke, fill];
    for (let i = 0; i < points.length; i++)
      args.push(points[i]);
    this.path.apply(this, args);
  }

  path(close: boolean, stroke: boolean, fill: boolean, ...points: Point[]) {
    this.save();
    this.applyStroke();
    this.applyFill();
    this.context2d.beginPath();
    let point = points[0];
    let drpx = this.get_directed_x(point.x);
    this.context2d.moveTo(drpx, point.y);
    for (let i = 1; i < points.length; i++) {
      point = points[i];
      let drx = this.get_directed_x(point.x);
      this.context2d.lineTo(drx, point.y);
    }
    if (close) {
      this.context2d.closePath();
    }
    if (fill) {
      this.context2d.fill();
    }
    if (stroke) {
      this.context2d.stroke();
    }

    this.restore();
  }

  openPath(...points: Point[]) {
    this.internalPath(false, true, false, points);
  }

  closePath(...points: Point[]) {
    this.internalPath(true, true, false, points);
  }

  fillOpenPath(...points: Point[]) {
    this.internalPath(false, true, true, points);
  }

  fillClosePath(...points: Point[]) {
    this.internalPath(true, false, true, points);
  }

  rect(x: number, y: number, w: number, h: number) {
    x = this.get_directed_x(x, w);
    this.fillRect(x, y, w, h);
    this.strokeRect(x, y, w, h);
  }

  fillText(text: string, x: number, y: number, width: number) {
    x = this.get_directed_x(x, width);
    this.save();
    this.applyContent();
    let delta = 0;
    let textWidth = this.get_textWidth(text);
    if (this.textAlign == TextAlign.Center) {
      delta = (width - textWidth) / 2;
    } else if (this.textAlign == TextAlign.Right) {
      delta = width - textWidth - 10;//TODO: fix that constant value [indent]
    }
    if (this.fontStyle && this.fontStyle.indexOf('underline') != -1) {
      this.rect(x, y + this.fontSize + 2, this.context2d.measureText(text).width, 0);
    }

    this.context2d.fillText(text, x + delta, y + this.fontSize);
    this.restore();
  }

  createGradient(x: number, y: number, w: number, h: number, ...stops: any[]) {
    let grd = this.context2d.createLinearGradient(x, y, x + w, y + h);
    for (let n of stops) {
      grd.addColorStop(n[0], n[1]);
    }
    return grd;
  }
}
