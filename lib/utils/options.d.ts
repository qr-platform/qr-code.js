import { Position } from '~/plugins/QRBorderHelpers';
import { ErrorCorrectionLevel, Mode, TypeNumber } from '~/lib/qrcode/QRCodeMinimal';
import { QRBorderPluginStyleOptions } from '../plugins/QRBorderPlugin';
import { browserImageTools } from '../tools/browser-image-tools';
import { Gradient } from './gradient';
export interface DecorationOption {
    disabled?: boolean;
    offset?: number;
    curveAdjustment?: number;
    curveDisabled?: boolean;
    curveRadius?: string;
    enableText?: boolean;
    type?: 'text' | 'image';
    value?: string;
    style?: QRBorderPluginStyleOptions;
}
export interface BorderOptions {
    hasBorder: boolean;
    radius?: string;
    inner?: {
        radius?: string;
        scale?: number;
        horizontalOffset?: number;
        verticalOffset?: number;
    };
    innerScale?: number;
    innerHorizontalOffset?: number;
    innerVerticalOffset?: number;
    thickness?: number;
    noBorderThickness?: number;
    color?: string;
    background?: string;
    decorations?: {
        [key in Position]?: DecorationOption;
    };
    borderOuter?: {
        color?: string;
        thickness?: number;
    };
    borderInner?: {
        color?: string;
        thickness?: number;
    };
}
export declare enum DotType {
    dot = "dot",
    randomDot = "random-dot",
    rounded = "rounded",
    extraRounded = "extra-rounded",
    verticalLine = "vertical-line",
    horizontalLine = "horizontal-line",
    classy = "classy",
    classyRounded = "classy-rounded",
    square = "square",
    smallSquare = "small-square",
    tinySquare = "tiny-square",
    star = "star",
    plus = "plus",
    diamond = "diamond"
}
export declare enum CornerDotType {
    dot = "dot",
    square = "square",
    heart = "heart",
    rounded = "rounded",
    classy = "classy",
    outpoint = "outpoint",
    inpoint = "inpoint"
}
export declare enum CornerSquareType {
    dot = "dot",
    square = "square",
    rounded = "rounded",
    classy = "classy",
    outpoint = "outpoint",
    inpoint = "inpoint"
}
export declare enum ShapeType {
    square = "square",
    circle = "circle"
}
export declare enum ImageMode {
    /**
     * Place image in the center of the code
     */
    center = "center",
    /**
     * Place image over the center of the code
     */
    overlay = "overlay",
    /**
     * Use image as background, draw dots over it
     */
    background = "background"
}
type ShapeTypeStrings = `${ShapeType}`;
type DotTypeStrings = `${DotType}`;
type CornerSquareTypeStrings = `${CornerSquareType}`;
type CornerDotTypeStrings = `${CornerDotType}`;
type ImageModeStrings = `${ImageMode}`;
export interface Options {
    /** Use a custom DOM domplementation */
    document: Document;
    instanceId: number;
    /** Use a custom image fetching & serializaton implementation */
    imageTools?: typeof browserImageTools;
    /** @ignore */
    width?: number;
    /** @ignore */
    height?: number;
    isResponsive?: boolean;
    margin?: number;
    verticalOffset?: number;
    horizontalOffset?: number;
    /** The data will be encoded in the QR code */
    data: string;
    /** The image will be copied to the center of the QR code */
    image?: string | Buffer | Blob;
    /**
     * QR code shape
     *
     * @default ShapeType.square
     */
    shape: ShapeType | ShapeTypeStrings;
    /** Options will be passed to `~` lib */
    scale?: number;
    offset?: number;
    qrOptions: {
        typeNumber: TypeNumber;
        mode?: Mode;
        /** @default ErrorCorrectionLevel.Q */
        errorCorrectionLevel: ErrorCorrectionLevel;
    };
    imageOptions: {
        /**
         * Image mode
         *
         * @default ImageMode.center
         */
        mode?: ImageMode | ImageModeStrings;
        /**
         * Background color of QR code image (logo, image, etc.)
         */
        backgroundColor?: string;
        /**
         * Padding around the image (in blocks)
         *
         * @default 0
         */
        padding?: number;
        /**
         * Coefficient of the image size
         *
         * @default 0.4
         */
        imageSize: number;
        /**
         * Margin of the image (in blocks)
         *
         * @default 0
         */
        margin: number;
        /** Radius of the image */
        radius?: string | number;
        /**
         * [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLImageElement/crossOrigin)
         */
        crossOrigin?: string;
    };
    dotsOptions: {
        /**
         * QR dot size (in pixels)
         *
         * @default 10
         */
        size: number;
        /**
         * Color of QR dots
         *
         * @default "#000"
         */
        color: string;
        /** Gradient of QR dots */
        gradient?: Gradient;
        /**
         * Style of QR dots
         *
         * @default DotType.square
         */
        type: DotType | DotTypeStrings;
    };
    /** Corners Square options, omitted values match dots */
    cornersSquareOptions?: {
        /** Color of Corners Square */
        color?: string;
        /** Gradient of Corners Square */
        gradient?: Gradient;
        /** Style of Corners Square */
        type?: CornerSquareType | CornerSquareTypeStrings;
    };
    /** Corners Dot options, omitted values match squares */
    cornersDotOptions?: {
        /** Color of Corners Dot */
        color?: string;
        /** Gradient of Corners Dot */
        gradient?: Gradient;
        /** Style of Corners Dot */
        type?: CornerDotType | CornerDotTypeStrings;
    };
    /** QR background styling options, false to disable background */
    backgroundOptions?: {
        /** Background roundnes, from 0 (square) to 1 (circle) */
        round?: number;
        /** Background color */
        color?: string;
        /** Background Gradient */
        gradient?: Gradient;
    } | false;
    stringToBytesFuncs?: {
        [encoding: string]: (s: string) => number[];
    };
    borderOptions?: BorderOptions;
}
export declare function sanitizeOptions(options: Options): Options;
export {};
