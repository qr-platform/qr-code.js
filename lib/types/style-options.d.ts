import { Gradient } from '../utils/gradient';
import { CornerDotType, CornerSquareType, DotType, ImageMode } from '../utils/options';
/**
 * Simplified options for styling QR codes.
 * These options are mapped to the more detailed QRCodeJs Options structure.
 */
export interface StyleOptions {
    primaryColor?: string;
    secondaryColor?: string;
    thirdColor?: string;
    backgroundColor?: string;
    dotsGradient?: Gradient;
    cornersDotGradient?: Gradient;
    cornersGradient?: Gradient;
    backgroundGradient?: Gradient;
    dotShape?: DotType;
    cornerSquareShape?: CornerSquareType;
    cornerDotShape?: CornerDotType;
    logo?: string | Buffer | Blob;
    logoSize?: number;
    logoMode?: ImageMode;
    logoMargin?: number;
    logoFillColor?: string;
    logoFillGradient?: Gradient;
    borderColor?: string;
    borderThickness?: number;
    borderRadius?: string | number;
    borderTextTop?: string;
    borderTextRight?: string;
    borderTextBottom?: string;
    borderTextLeft?: string;
    borderFontFace?: string;
    borderFontSize?: number;
    borderFontColor?: string;
    borderLetterSpacing?: number;
    borderFontWeight?: string;
}
