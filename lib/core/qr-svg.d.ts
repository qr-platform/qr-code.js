import { Position } from '~/plugins/QRBorderHelpers';
import { QRCodeMinimal } from '~/lib/qrcode/QRCodeMinimal';
import { Gradient } from '../utils/gradient';
import { BorderOptions, Options } from '../utils/options';
type QRSVGOptions = Pick<Options, 'width' | 'height' | 'isResponsive' | 'margin' | 'document' | 'imageTools' | 'image' | 'imageOptions' | 'dotsOptions' | 'cornersDotOptions' | 'cornersSquareOptions' | 'backgroundOptions' | 'borderOptions' | 'shape' | 'scale' | 'verticalOffset' | 'horizontalOffset' | 'offset'> & {
    width: number;
    height: number;
    hls: boolean;
    errorCorrectionPercent: number;
    bordersMain: {
        [key in Position]: number;
    };
    bordersOuter: {
        [key in Position]: number;
    };
    bordersInner: {
        [key in Position]: number;
    };
};
export declare class QRSVG {
    static instanceCount: number;
    private static readonly FALLBACK_IMAGE_DATA_URL;
    private _element;
    private defs;
    private backgroundMask?;
    private backgroundMaskGroup?;
    private dotsMask?;
    private dotsMaskGroup?;
    private lightDotsMask?;
    private lightDotsMaskGroup?;
    private qr?;
    private document;
    private imageTools;
    private finalWidth;
    private finalHeight;
    private _hls;
    private _innerQrGroup;
    private _maskedQrGroup;
    _instanceId: number;
    private options;
    constructor(options: QRSVGOptions);
    get element(): SVGElement;
    private get qrGroup();
    get width(): number;
    get height(): number;
    get svgSize(): {
        width: number;
        height: number;
    };
    getElement(): SVGElement;
    private roundValue;
    drawQR(qr: QRCodeMinimal): Promise<void>;
    drawBackground(): void;
    drawBackgroundForBorder(padding: number, baseRadius: number): SVGElement | undefined;
    drawDots(filter?: (i: number, j: number) => boolean): void;
    drawCorners(): void;
    drawImage({ width, height, count, dotSize, radius }: {
        width: number;
        height: number;
        count: number;
        dotSize: number;
        radius?: string | number;
    }): Promise<void>;
    createColor({ options, borderOptions, color, additionalRotation, x, y, height, width, name, returnSVGGroup }: {
        options?: Gradient;
        borderOptions?: BorderOptions;
        color?: string;
        additionalRotation: number;
        x: number;
        y: number;
        height: number;
        width: number;
        name: string;
        returnSVGGroup?: boolean;
    }): void | SVGElement;
    private createMask;
}
export {};
