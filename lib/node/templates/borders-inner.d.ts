import * as _browserUtils from '../tools/browser-utils.js';
export { ErrorCorrectionLevel, Mode, TypeNumber } from '~/lib/qrcode/QRCodeMinimal.js';
export { QRCodeJs, type ExtensionFunction } from '../core/qr-code-js.js';
export { FileExtension } from '../tools/browser-utils.js';
export { type RecursivePartial } from '../types/helper.js';
export { type CanvasOptions } from '../utils/canvas-options.js';
export { GradientType, type Gradient } from '../utils/gradient';
export { CornerDotType, CornerSquareType, DotType, ImageMode, ShapeType, type Options } from '../utils/options.js';
export { ErrorCorrectionPercents } from '../utils/qrcode.js';
export declare const codes: {
    borderOptions: {
        decorations: {
            top: {
                disabled: boolean;
                enableText: boolean;
                offset: number;
                curveAdjustment: number;
                curveDisabled: boolean;
                type: "text" | "image";
                value: string;
                style: {
                    fontFace: string;
                    fontSize: number;
                    fontColor: string;
                    letterSpacing: number;
                    fontWeight: string;
                };
            };
            bottom: {
                disabled: boolean;
                enableText: boolean;
                offset: number;
                curveAdjustment: number;
                curveDisabled: boolean;
                type: "text" | "image";
                value: string;
                style: {
                    fontFace: string;
                    fontSize: number;
                    fontColor: string;
                    letterSpacing: number;
                    fontWeight: string;
                };
            };
            left: {
                disabled: boolean;
                enableText: boolean;
                offset: number;
                curveAdjustment: number;
                curveDisabled: boolean;
                type: "text" | "image";
                value: string;
                style: {
                    fontFace: string;
                    fontSize: number;
                    fontColor: string;
                    letterSpacing: number;
                    fontWeight: string;
                };
            };
            right: {
                disabled: boolean;
                enableText: boolean;
                offset: number;
                curveAdjustment: number;
                curveDisabled: boolean;
                type: "text" | "image";
                value: string;
                style: {
                    fontFace: string;
                    fontSize: number;
                    fontColor: string;
                    letterSpacing: number;
                    fontWeight: string;
                };
            };
        };
        hasBorder: boolean;
        radius: string;
        thickness: number;
        color: string;
        borderOuter: {
            color: string;
            thickness: number;
        };
        borderInner: {
            color: string;
            thickness: number;
        };
    };
    name: string;
    description: string;
    data: string;
    image: string;
    scale: number;
    margin: number;
    isResopnsive: boolean;
    verticalOffset: number;
    shape: string;
    qrOptions: {};
    imageOptions: {
        imageSize: number;
        margin: number;
        roundedValue: number;
    };
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
    backgroundOptions: {
        color: string;
        gradient: {
            type: string;
            colorStops: {
                offset: number;
                color: string;
            }[];
        };
    };
}[];
export declare const browserUtils: typeof _browserUtils | undefined;
