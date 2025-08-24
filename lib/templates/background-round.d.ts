export { ErrorCorrectionLevel, Mode, TypeNumber } from '~/lib/qrcode/QRCodeMinimal.js';
export { QRCodeJs, type ExtensionFunction } from '../core/qr-code-js.js';
export { type RecursivePartial } from '../types/helper.js';
export { type CanvasOptions } from '../utils/canvas-options.js';
export { GradientType, type Gradient } from '../utils/gradient';
export { CornerDotType, CornerSquareType, DotType, ImageMode, ShapeType, type Options } from '../utils/options.js';
export { ErrorCorrectionPercents } from '../utils/qrcode.js';
export declare const codes: {
    backgroundOptions: {
        round: number;
        color: string;
        gradient: {
            type: string;
            colorStops: {
                offset: number;
                color: string;
            }[];
        };
    };
    name: string;
    description: string;
    data: string;
    scale: number;
    margin: number;
    width: number;
    height: number;
    shape: string;
    dotsOptions: {
        type: string;
        color: string;
    };
    cornersSquareOptions: {
        type: string;
        color: string;
    };
    cornersDotOptions: {
        type: string;
        color: string;
    };
    borderOptions: {
        hasBorder: boolean;
    };
}[];
