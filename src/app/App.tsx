import React from 'react';
import { OpenDocument } from '@/lib/core/Document';
import { Appearance } from '@/lib/core/Appearance';
import { UI } from '@/lib/UI';
import { loadDocument, saveDocument } from '@/features/document-io/documentIO';
import { FormulaBar } from '@/features/formula/FormulaBar';
import { RibbonMenu } from '@/features/ribbon/RibbonMenu';
import { SpreadsheetSurface } from '@/features/sheet/SpreadsheetSurface';
import { AppAction, SheetState } from './types';

const defaultState: SheetState = {isMerged: false, label: 'A1', originalValue: '', value: ''};

export default function App() {
  const [appearance, setAppearance] = React.useState(new Appearance());
  const [fileMode, setFileMode] = React.useState<'file' | 'local'>('file');
  const [sheetState, setSheetState] = React.useState(defaultState);
  const fileModeRef = React.useRef(fileMode);
  const loadRef = React.useRef<((data: string) => void) | null>(null);
  const uiRef = React.useRef<UI | null>(null);

  const onChange = (doc: OpenDocument) => {
    setAppearance(doc.ActiveSheet.SelectedAppearance);
    setSheetState({
      isMerged: uiRef.current ? uiRef.current.isMerged : false,
      label: doc.ActiveSheet.SelectionLabel,
      originalValue: doc.ActiveSheet.SelectedValue || '',
      value: doc.ActiveSheet.SelectedValue || '',
    });
    if (fileModeRef.current === 'local') {
      localStorage.setItem('data', JSON.stringify(doc.save()));
    }
  };

  const onModeChanged = (mode: 'file' | 'local') => {
    if (fileModeRef.current === 'file' && mode === 'local' && localStorage.getItem('data')) {
      if (loadRef.current) {
        loadRef.current(localStorage.getItem('data') as string);
      }
    }
    fileModeRef.current = mode;
    setFileMode(mode);
  };

  const onAction = (action: AppAction) => action.actionName === 'save-ows'
    ? saveDocument(uiRef.current)
    : action.actionName === 'load-ows'
      ? loadDocument(uiRef.current)
      : uiRef.current && uiRef.current.execCmd(action.actionName, action.args);

  return React.createElement('div', {className: 'ows-app'},
    React.createElement(RibbonMenu, {appearance, fileMode, onAction, onModeChanged, state: sheetState}),
    React.createElement(FormulaBar, {
      label: sheetState.label,
      onAbort: () => setSheetState({...sheetState, value: sheetState.originalValue}),
      onCommit: () => commitFormula(uiRef.current, sheetState),
      onValueChange: (value) => setSheetState({...sheetState, value}),
      value: sheetState.value,
    }),
    React.createElement(SpreadsheetSurface, {
      onChange,
      onReady: (ui) => uiRef.current = ui,
      registerLoad: (load) => loadRef.current = load,
    }),
    React.createElement('footer', {className: 'ows-status-bar'}, 'Ready'),
  );
}

function commitFormula(ui: UI | null, state: SheetState) {
  if (ui && state.value !== state.originalValue) {
    ui.execCmd('change-value', null, null, state.value);
  }
}
