import { CanvasOptions } from '~/utils/canvas-options';
import { RecursivePartial } from '../types/helper';
import { StyleOptions } from '../types/style-options';
import { Options } from '../utils/options';
export declare enum FileExtension {
    svg = "svg",
    png = "png",
    jpeg = "jpeg",
    webp = "webp"
}
export type ExtensionFunction = (svg: SVGElement, options: RecursivePartial<Options>) => void;
export declare class QRCodeJs {
    /** Library version injected at build time */
    static version: string;
    private static _selectedTemplate;
    private static _selectedStyle;
    private options;
    private container?;
    private qr?;
    private extension?;
    private svgDrawingPromise?;
    private qrSVG?;
    get size(): {
        width: number;
        height: number;
    } | undefined;
    constructor(options: RecursivePartial<Options>);
    static setTemplate(templateNameOrOptions: string | RecursivePartial<Options>): typeof QRCodeJs;
    /**
     * Sets the static style to be used as a base for new instances.
     * Accepts either a predefined style name or a StyleOptions object.
     * @param styleNameOrOptions - The name of the style or the StyleOptions object.
     * @returns The QRCodeJs class for chaining.
     */
    static setStyle(styleNameOrOptions: string | StyleOptions): typeof QRCodeJs;
    update(options?: RecursivePartial<Options>): Promise<void>;
    append(
    /** This container will be used for appending of the QR code */
    container?: HTMLElement): QRCodeJs | undefined;
    applyExtension(extension: ExtensionFunction): Promise<void>;
    deleteExtension(): Promise<void>;
    serialize(inverted?: boolean): Promise<string | undefined>;
    private _setupSvgAsync;
    protected _drawToCanvasForValidation(options?: RecursivePartial<CanvasOptions>): Promise<HTMLCanvasElement>;
    protected drawToCanvas(options?: RecursivePartial<CanvasOptions>): Promise<{
        canvas: HTMLCanvasElement;
        canvasDrawingPromise: Promise<void> | undefined;
    } | undefined>;
    private downloadURI;
    download(downloadOptions?: {
        name?: string;
        extension: `${FileExtension}`;
    }, canvasOptions?: RecursivePartial<CanvasOptions>): Promise<void>;
    protected createOptimizedQRCanvas(options?: RecursivePartial<CanvasOptions>): Promise<HTMLCanvasElement>;
    /**
     * Apply thresholding to enhance QR code contrast
     */
    private applyQRThreshold;
    protected _hls(): boolean;
    private _logValidationWarnings;
}
