import { DrawArgs } from '../types/helper.js';
import { CornerDotType } from '../utils/options.js';
export declare class QRCornerDot {
    private readonly type;
    private readonly document;
    private _element?;
    get element(): SVGElement | undefined;
    constructor(type: `${CornerDotType}`, document: Document);
    draw(args: DrawArgs): void;
    private rotateFigure;
    private basicDot;
    private basicSquare;
    private basicHeart;
    private basicRounded;
    private basicClassy;
    private basicInpoint;
    private drawDot;
    private drawSquare;
    private drawHeart;
    private drawRounded;
    private drawClassy;
    private drawInpoint;
    private drawOutpoint;
}
