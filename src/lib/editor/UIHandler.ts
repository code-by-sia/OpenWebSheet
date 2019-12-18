///<reference path="../core/Sheet.ts"/>
///<reference path="./CellEditor.ts"/>

import { Sheet } from '../core/Sheet';
import { UIHandlerController } from './UIHandlerControler';

// import {CellEditor} from "./CellEditor"
/**
 * Created by SiamandM on 6/17/2016.
 */

export interface IUIHandler {
  click(): void;

  dblClick(): void;

  mouseDown(x: number, y: number): void;

  mouseMove(x: number, y: number): void;

  mouseUp(x: number, y: number): void;

  mouseWheel(dx: number, dy: number): void;

  keyDown(evt: any): void;

  keyPress(evt: any): void;

  keyUp(evt: any): void;
}

export class UIHandler implements IUIHandler {
  constructor(protected controller: UIHandlerController) {

  }

  public click() {
  }

  public dblClick() {
  }

  public mouseDown(x: number, y: number) {
  }

  public mouseMove(x: number, y: number) {
  }

  public mouseUp(x: number, y: number) {
  }

  public mouseWheel(dx: number, dy: number) {
  }

  public keyDown(evt: KeyboardEvent) {
  }


  public keyPress(evt: any) {
  }

  public keyUp(evt: any) {
  }

  get locked() {
    return this.controller.locked;
  }

  public lock() {
    this.controller.lock(this);
  }

  public unlock() {
    this.controller.unlock();
  }

}
