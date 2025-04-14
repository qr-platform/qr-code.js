import { DrawArgs } from '../types/helper.js';
import { CornerSquareType } from '../utils/options.js';
export declare class QRCornerSquare {
    private readonly type;
    private readonly document;
    private _element?;
    private _fill?;
    get element(): SVGElement | undefined;
    get fill(): SVGElement | undefined;
    constructor(type: `${CornerSquareType}`, document: Document);
    draw(args: DrawArgs): void;
    private rotateFigure;
    private basicDot;
    private basicSquare;
    private basicExtraRounded;
    private basicClassy;
    private basicInpoint;
    private drawDot;
    private drawSquare;
    private drawExtraRounded;
    private drawClassy;
    private drawInpoint;
    private drawOutpoint;
}
