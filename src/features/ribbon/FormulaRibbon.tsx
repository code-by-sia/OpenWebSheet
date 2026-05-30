import React from 'react';
import { AppAction } from '@/app/types';
import { ControlGroup } from '@/shared/ui/ControlGroup';
import { FormulaFunctionGroup } from './formulas/FormulaFunctionGroup';

interface FormulaRibbonProps {
  onAction: (action: AppAction) => void;
}

const statistics = [
  {icon: 'fa fa-plus', label: 'SUM', template: '=SUM('},
  {icon: 'fa fa-arrow-down', label: 'MIN', template: '=MIN('},
  {icon: 'fa fa-arrow-up', label: 'MAX', template: '=MAX('},
];

const mathematical = [
  {icon: 'fa fa-square-root-alt', label: 'SQRT', template: '=SQRT('},
  {icon: 'fa fa-plus-circle', label: 'ABS', template: '=ABS('},
  {icon: 'fa fa-chart-line', label: 'LOG', template: '=LOG('},
  {icon: 'fa fa-superscript', label: 'EXP', template: '=EXP('},
];

const trigonometry = [
  {icon: 'fa fa-wave-square', label: 'SIN', template: '=SIN('},
  {icon: 'fa fa-wave-square', label: 'COS', template: '=COS('},
  {icon: 'fa fa-wave-square', label: 'TAN', template: '=TAN('},
];

const constants = [
  {icon: 'fa fa-circle-notch', label: 'PI', template: '=PI'},
  {icon: 'fa fa-italic', label: 'E', template: '=E'},
];

export function FormulaRibbon(props: FormulaRibbonProps) {
  return React.createElement(
    'div',
    {className: 'ows-ribbon-panel'},
    React.createElement(FormulaFunctionGroup, {functions: statistics, label: 'Statistics', onAction: props.onAction}),
    React.createElement(FormulaFunctionGroup, {functions: mathematical, label: 'Mathematical', onAction: props.onAction}),
    React.createElement(FormulaFunctionGroup, {functions: trigonometry, label: 'Trigonometry', onAction: props.onAction}),
    React.createElement(FormulaFunctionGroup, {functions: constants, label: 'Constants', onAction: props.onAction}),
    React.createElement(ControlGroup, {label: 'User Defined Functions', wide: true},
      React.createElement('span', {className: 'ows-muted'}, 'Custom functions are planned'),
    ),
  );
}
