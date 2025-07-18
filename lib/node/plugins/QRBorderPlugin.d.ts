import { Gradient } from '../utils/gradient';
import { BorderOptions } from '../utils/options.js';
import { Position } from './QRBorderHelpers.js';
export interface QRBorderPluginStyleOptions {
    fontFace?: string;
    fontSize?: number;
    fontColor?: string;
    textTransform?: string;
    letterSpacing?: number;
    fontWeight?: string;
}
interface QRPluginSettings {
    width?: number | string;
    height?: number | string;
    document: Document;
    instanceId: number;
    backgroundOptions?: {
        /** Background roundnes, from 0 (square) to 1 (circle) */
        round?: number;
        /** Background color */
        color?: string;
        /** Background Gradient */
        gradient?: Gradient;
    } | false;
}
type QRBorderPluginFn = (options: BorderOptions) => (svgElement: SVGElement, settings: QRPluginSettings, svgSize: number, drawBackgroundForBorder: (padding: number, baseRadius: number) => SVGElement | undefined, bordersMain: {
    [key in Position]: number;
}, bordersOuter: {
    [key in Position]: number;
}, bordersInner: {
    [key in Position]: number;
}, noBorderThickness: number) => void;
export declare const isBorderSideEnabled: (options: BorderOptions, position: Position) => boolean;
declare const QRBorderPlugin: QRBorderPluginFn;
export { QRBorderPlugin };
