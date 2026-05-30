import React from 'react';
import { AppAction, SheetState } from '@/app/types';
import { Button } from '@/shared/ui/Button';
import { ControlGroup } from '@/shared/ui/ControlGroup';

interface CellControlsProps {
  onAction: (action: AppAction) => void;
  state: SheetState;
}

export function CellControls(props: CellControlsProps) {
  const action = (actionName: string, args?: any) => props.onAction({actionName, args});

  return React.createElement(
    ControlGroup,
    {label: 'Cell'},
    React.createElement(Button, {
      active: props.state.isMerged,
      icon: 'fa fa-th',
      onClick: () => action(props.state.isMerged ? 'unmerge' : 'merge'),
    }, props.state.isMerged ? 'Split' : 'Merge'),
  );
}
