///<reference path="../core/Sheet.ts"/>
///<reference path="../../js/jquery.d.ts"/>
///<reference path="./CellEditor.ts"/>

import { Sheet } from "../core/Sheet";
import { UIHandlerController } from "./UIHandlerControler";
//import {CellEditor} from "./CellEditor"
/**
 * Created by SiamandM on 6/17/2016.
 */

export interface IUIHandler {
    click() 
    dblClick()
    mouseDown(x, y) 
    mouseMove(x, y) 
    mouseUp(x, y) 
    mouseWheel(dx, dy) 
    keyDown(evt) 
    keyPress(evt)
    keyUp(evt) 
}

export class UIHandler implements IUIHandler {
    constructor (protected controller:UIHandlerController){

    }

    click() { }
    dblClick() { }
    mouseDown(x: any, y: any) { }
    mouseMove(x: any, y: any) { }
    mouseUp(x: any, y: any) { }
    mouseWheel(dx: any, dy: any) { }
    keyDown(evt: any) { }
    keyPress(evt: any) { }
    keyUp(evt: any) { }
    
}
 