import React from 'react';
import { OpenDocument } from '@/lib/core/Document';
import { UI } from '@/lib/UI';

interface SpreadsheetSurfaceProps {
  onChange: (doc: OpenDocument) => void;
  onReady: (ui: UI) => void;
  registerLoad: (load: ((data: string) => void) | null) => void;
}

export function SpreadsheetSurface(props: SpreadsheetSurfaceProps) {
  const container = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (!container.current) {
      return;
    }

    const ui = new UI(container.current);
    const onChange = (doc: OpenDocument) => props.onChange(doc);

    ui.addOnChangeEventListener(onChange);
    props.onReady(ui);
    props.registerLoad((data: string) => ui.load(data));

    return () => {
      ui.removeOnChangeEventListener(onChange);
      props.registerLoad(null);
    };
  }, []);

  return React.createElement('div', {className: 'ows-sheet-surface', ref: container});
}
