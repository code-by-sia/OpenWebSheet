export interface DocumentRenderer {
  render(): void;

  resize(): void;

  Element: HTMLElement;
}
