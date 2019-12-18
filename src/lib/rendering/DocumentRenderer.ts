export interface DocumentRenderer {

  Element: HTMLElement;
  render(): void;

  resize(): void;
}
