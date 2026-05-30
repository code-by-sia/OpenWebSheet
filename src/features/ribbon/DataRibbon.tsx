import React from 'react';
import { Button } from '@/shared/ui/Button';
import { ControlGroup } from '@/shared/ui/ControlGroup';

function ImportExportGroup({label}: {label: string}) {
  return React.createElement(ControlGroup, {label, wide: true},
    React.createElement('div', {className: 'ows-button-row'},
      React.createElement(Button, {title: `${label} import`}, 'Import'),
      React.createElement(Button, {title: `${label} export`}, 'Export'),
    ),
  );
}

export function DataRibbon() {
  return React.createElement(
    'div',
    {className: 'ows-ribbon-panel'},
    React.createElement(ControlGroup, {label: 'File'},
      React.createElement('i', {className: 'fa fa-file-excel ows-large-icon', title: 'Spreadsheet file'}),
    ),
    React.createElement(ImportExportGroup, {label: 'Open Office'}),
    React.createElement(ImportExportGroup, {label: 'MS Excel'}),
    React.createElement(ControlGroup, {label: '3rd Parties', wide: true},
      React.createElement('span', {className: 'ows-muted'}, 'External data sources'),
    ),
  );
}
