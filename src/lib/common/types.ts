export type Color = string | 'white' | 'black' | null;
export type CellValue = string | number | null ;
export interface Observer {
  publish(command:string):void;
}
