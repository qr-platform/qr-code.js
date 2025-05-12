import { CanvasOptions } from '~/utils/canvas-options';
import { MethodOverrideOptions, RecursivePartial } from '../types/helper';
import { SettingsOptions } from '../types/settings-options';
import { StyleOptions } from '../types/style-options';
import { QRTextTemplateDefinition, TextOptions } from '../types/text-options';
import { BorderOptions, Options } from '../utils/options';
import { findStyleById, findStyleByName, QRStyleDefinition } from './templates/qr-styles';
import { findBorderById, findBorderByName } from './templates/qr-template-borders';
import { findTextByName, findTextById as findTextTemplateById } from './templates/qr-template-text';
import { findTemplateById, findTemplateByName, type QRTemplateDefinition } from './templates/qr-templates';
export type { QRTemplateDefinition, QRStyleDefinition, QRTextTemplateDefinition, StyleOptions };
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
    private static _selectedBorder;
    private static _selectedStyle;
    private static _selectedImage;
    private static _selectedImageOverride;
    private static _selectedText;
    private static _selectedTextOverride;
    private static _selectedData;
    private static _selectedDataOverride;
    private static _selectedOptions;
    private static _selectedOptionsOverride;
    private static _selectedInfo;
    private static _selectedMetadata;
    id?: string;
    name?: string;
    description?: string;
    metadata?: Record<string, any>;
    private options;
    private container?;
    private qr?;
    private extension?;
    private svgDrawingPromise?;
    private qrSVG?;
    private _svgId;
    get size(): {
        width: number;
        height: number;
    } | undefined;
    constructor(options: RecursivePartial<Options> | undefined, _?: boolean);
    /**
     * Sets the static template to be used as a base for new instances,
     * accepting either a template name or a template options object.
     * @param templateNameOrOptions - The user-friendly name of the template or a partial options object.
     * @returns The QRCodeJs class for chaining.
     */
    static setTemplate(templateNameOrOptions: string | RecursivePartial<Options> | null): typeof QRCodeJs;
    /**
     * Sets the static template to be used as a base for new instances by its ID.
     * @param templateId - The ID of the template (original key).
     * @returns The QRCodeJs class for chaining.
     */
    static setTemplateId(templateId: string | null): typeof QRCodeJs;
    static getTemplates(): {
        findTextTemplateById: typeof findTextTemplateById;
        findTextByName: typeof findTextByName;
        findTemplateByName: typeof findTemplateByName;
        findTemplateById: typeof findTemplateById;
        findBorderById: typeof findBorderById;
        findBorderByName: typeof findBorderByName;
        findStyleById: typeof findStyleById;
        findStyleByName: typeof findStyleByName;
        baseTemplates: QRTemplateDefinition[];
        borderTemplates: QRTemplateDefinition[];
        styleTemplates: QRStyleDefinition[];
        textTemplates: QRTextTemplateDefinition[];
    };
    /**
     * Sets the static style to be used as a base for new instances.
     * Accepts either a predefined style name or a StyleOptions object.
     * @param styleNameOrOptions - The name of the style or the StyleOptions object.
     * @param styleNameOrOptions - The name of the style or the StyleOptions object.
     * @returns The QRCodeJs class for chaining.
     */
    static setStyle(styleNameOrOptions: string | StyleOptions | null): typeof QRCodeJs;
    /**
     * Sets the static border template to be used as a base for new instances,
     * accepting either a border template name or a BorderOptions object.
     * @param borderNameOrOptions - The user-friendly name of the border template or a BorderOptions object.
     * @returns The QRCodeJs class for chaining.
     */
    static setBorder(borderNameOrOptions: string | RecursivePartial<BorderOptions> | null): typeof QRCodeJs;
    /**
     * Sets the static border template to be used as a base for new instances by its ID.
     * @param borderId - The ID of the border template.
     * @returns The QRCodeJs class for chaining.
     */
    static setBorderId(borderId: string | null): typeof QRCodeJs;
    /**
     * Sets the static style to be used as a base for new instances by its ID.
     * @param styleId - The ID of the style.
     * @returns The QRCodeJs class for chaining.
     */
    static setStyleId(styleId: string | null): typeof QRCodeJs;
    /**
     * Sets the static image URL to be used as a base for new instances.
     * @param imageUrl - The URL of the image or null to clear.
     * @returns The QRCodeJs class for chaining.
     */
    static setImage(imageUrl: string | null, overrideOpts?: MethodOverrideOptions): typeof QRCodeJs;
    /**
     * Sets the static Data to be used by new instances.
     * @param data - The data to be encoded in the QR code.
     * @returns The QRCodeJs class for chaining.
     */
    static setData(data: string | null, overrideOpts?: MethodOverrideOptions): typeof QRCodeJs;
    static setOptions(options: RecursivePartial<Options> | null, overrideOpts?: MethodOverrideOptions): typeof QRCodeJs;
    /**
     * Sets the static text template or options to be used for new instances.
     * @param textNameOrOptions - The name of the text template, a TextOptions object, or null to clear.
     * @returns The QRCodeJs class for chaining.
     */
    static setText(textNameOrOptions: string | TextOptions | null, overrideOpts?: MethodOverrideOptions): typeof QRCodeJs;
    /**
     * Sets the static text template to be used for new instances by its ID.
     * @param textId - The ID of the text template or null to clear.
     * @returns The QRCodeJs class for chaining.
     */
    static setTextId(textId: string | null, overrideOpts?: MethodOverrideOptions): typeof QRCodeJs;
    static setSettings(settings: SettingsOptions | null): typeof QRCodeJs;
    getOptions(): Options;
    getId(): string | undefined;
    getName(): string | undefined;
    getDescription(): string | undefined;
    getMetadata(): Record<string, any> | undefined;
    getSettings(): SettingsOptions & {
        options: Options;
    };
    setId(id?: string): this;
    setName(name?: string): this;
    setDescription(description?: string): this;
    setMetadata(metadata?: Record<string, any>): this;
    update(options?: RecursivePartial<Options>): Promise<void>;
    append(container?: HTMLElement): this;
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
