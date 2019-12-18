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
    const x2 = Math.min(x + w, this.get_right());
    const y2 = Math.min(y + h, this.get_bottom());

    w = Math.min(x2 - x, this.get_width());
    h = Math.min(y2 - y, this.get_height());

    x = Math.max(x, this.get_left());
    y = Math.max(y, this.get_top());

    return new ContextMask(x, y, w, h);
  }

}
