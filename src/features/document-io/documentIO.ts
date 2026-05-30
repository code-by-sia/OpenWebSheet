import { UI } from '@/lib/UI';

export function saveDocument(ui: UI | null) {
  if (!ui) {
    return;
  }

  const anchor = document.createElement('a');
  anchor.download = 'document.ows';
  anchor.href = 'data:application/octet-stream,' + encodeURIComponent(ui.save());
  anchor.target = '_blank';
  anchor.click();
}

export function loadDocument(ui: UI | null) {
  if (!ui) {
    return;
  }

  const input = document.createElement('input');
  input.accept = '.ows';
  input.type = 'file';
  input.addEventListener('change', () => readSelectedFile(input, ui));
  input.click();
}

function readSelectedFile(input: HTMLInputElement, ui: UI) {
  const file = input.files && input.files[0];
  if (!file) {
    return;
  }

  const reader = new FileReader();
  reader.addEventListener('load', () => ui.load(reader.result as string));
  reader.readAsText(file, 'utf8');
}
