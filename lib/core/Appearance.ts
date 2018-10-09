export enum TextAlign {
    Left,
    Right,
    Center
}

export enum BorderStyle {
    SolidThin,
    SolidThick,
    SolidDouble,
    DottedThin,
    DottedThick,
    DashedThin,
    DashedThick,
    DotDashedThin,
    DotDashedThick
}

export class Border {
    public constructor(public color = null){

    }

    public style:BorderStyle = BorderStyle.SolidThin;
}

export class Appearance {
    public textAlign:TextAlign = TextAlign.Left;
    public fontName:any;
    public fontSize:any;
    public textStyle:any;
    public text:any;
    public background:any;
    public horisontalBorder:Border;
    public verticalBorder:Border;
}