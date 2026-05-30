import { Appearance } from '@/lib/core/Appearance';

export interface SheetState {
  isMerged: boolean;
  label: string;
  value: string;
  originalValue: string;
}

export interface AppAction {
  actionName: string;
  args?: any;
}

export interface RibbonProps {
  appearance: Appearance;
  state: SheetState;
  fileMode: 'file' | 'local';
  onAction: (action: AppAction) => void;
  onModeChanged: (mode: 'file' | 'local') => void;
}
