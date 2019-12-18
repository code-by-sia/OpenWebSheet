import { TextAlign } from '../../core/Appearance';
import { LayoutDirection } from '@/lib/rendering/canvas/LayoutDirection';
import { Point } from '@/lib/rendering/canvas/Point';
import { ContextMask } from '@/lib/rendering/canvas/ContextMask';

/**
 * Created by SiamandM on 6/16/2016.
 */
export class Context {

  public direction: LayoutDirection = LayoutDirection.LeftToRight;
  public textAlign: TextAlign = TextAlign.Left;
  public fillStyle: any = '#fff';
  public strokeStyle = '#000';
  public strokeSize = 1;
  public contentFillStyle = '#000';
  public fontStyle = '';
  public fontSize = 12;
  public fontName = 'Tahoma';

  private context2d: CanvasRenderingContext2D;
  private width: number;
  private height: number;
  private currentMask!: ContextMask | null;
  private maskStack: ContextMask[] = [];

  constructor(context: CanvasRenderingContext2D, width: number, height: number) {
    this.context2d = context;
    this.width = width;
    this.height = height;
  }

  public get_directed_x(x: number, width: number = 0) {
    if (this.direction === LayoutDirection.LeftToRight) {
      return x;
    }
    return this.width - x - width;
  }

  public get_textWidth(text: string) {
    return this.context2d.measureText(text).width;
  }

  public save() {
    this.context2d.save();
    this.context2d.translate(-0.5, -0.5);
    if (this.currentMask) {
      const cmask = this.currentMask;

      this.context2d.rect(cmask.get_left(), cmask.get_top(), cmask.get_width(), cmask.get_height());
      this.context2d.clip();
    }

  }

  public restore() {
    this.context2d.restore();
  }

  public setMask(x: number, y: number, w: number, h: number, affectPreviousMask: boolean = false) {
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

  public unmask() {
    if (this.maskStack.length > 0) {
      this.currentMask = (this.maskStack.pop() as ContextMask);
    } else {
      this.currentMask = null;
    }
  }

  public clearRect(x: number, y: number, w: number, h: number) {
    x = this.get_directed_x(x, w);
    this.save();
    this.context2d.clearRect(x, y, w, h);
    this.restore();
  }

  public fillRect(x: number, y: number, w: number, h: number) {
    x = this.get_directed_x(x, w);
    this.save();
    this.applyFill();
    this.context2d.beginPath();
    this.context2d.fillRect(x, y, w, h);
    this.context2d.fill();
    this.restore();
  }

  public strokeRect(x: number, y: number, w: number, h: number) {
    x = this.get_directed_x(x, w);
    this.save();
    this.applyStroke();
    this.context2d.beginPath();
    this.context2d.strokeRect(x, y, w, h);
    this.context2d.stroke();
    this.restore();
  }

  public line(x1: number, y1: number, x2: number, y2: number) {
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

  public path(close: boolean, stroke: boolean, fill: boolean, ...points: Point[]) {
    this.save();
    this.applyStroke();
    this.applyFill();
    this.context2d.beginPath();
    let point = points[0];
    const drpx = this.get_directed_x(point.x);
    this.context2d.moveTo(drpx, point.y);
    for (let i = 1; i < points.length; i++) {
      point = points[i];
      const drx = this.get_directed_x(point.x);
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

  public openPath(...points: Point[]) {
    this.internalPath(false, true, false, points);
  }

  public closePath(...points: Point[]) {
    this.internalPath(true, true, false, points);
  }

  public fillOpenPath(...points: Point[]) {
    this.internalPath(false, true, true, points);
  }

  public fillClosePath(...points: Point[]) {
    this.internalPath(true, false, true, points);
  }

  public rect(x: number, y: number, w: number, h: number) {
    x = this.get_directed_x(x, w);
    this.fillRect(x, y, w, h);
    this.strokeRect(x, y, w, h);
  }

  public fillText(text: string, x: number, y: number, width: number) {
    x = this.get_directed_x(x, width);
    this.save();
    this.applyContent();
    let delta = 0;
    const textWidth = this.get_textWidth(text);
    if (this.textAlign === TextAlign.Center) {
      delta = (width - textWidth) / 2;
    } else if (this.textAlign === TextAlign.Right) {
      delta = width - textWidth - 10; // TODO: fix that constant value [indent]
    }
    if (this.fontStyle && this.fontStyle.indexOf('underline') !== -1) {
      this.rect(x, y + this.fontSize + 2, this.context2d.measureText(text).width, 0);
    }

    this.context2d.fillText(text, x + delta, y + this.fontSize);
    this.restore();
  }

  public createGradient(x: number, y: number, w: number, h: number, ...stops: any[]) {
    const grd = this.context2d.createLinearGradient(x, y, x + w, y + h);
    for (const n of stops) {
      grd.addColorStop(n[0], n[1]);
    }
    return grd;
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

  private internalPath(close: boolean, stroke: boolean, fill: boolean, points: Point[]) {
    const args: any = [close, stroke, fill];
    for (const point of points) {
      args.push(point);
    }
    this.path.apply(this, args);
  }
}
