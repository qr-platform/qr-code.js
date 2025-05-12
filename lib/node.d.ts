import { QRCodeJs as _QRCodeJs } from './core/qr-code-js';
import { type ValidationResult } from './license/LicenseManagerNode';
import type * as _browserUtils from './tools/browser-utils';
import { MethodOverrideOptions, RecursivePartial } from './types/helper';
import { SettingsOptions } from './types/settings-options';
import { StyleOptions } from './types/style-options';
import { TextOptions } from './types/text-options';
import { Options, type BorderOptions } from './utils/options';
import { ImageDataLike } from './utils/scan-validator-worker';
import { ScanValidatorResponse } from './utils/scan-validators/abstract-scan-validator';
import { type DecodedLicenseToken } from './utils/token-validator';
export { ErrorCorrectionLevel, Mode, TypeNumber } from '~/lib/qrcode/QRCodeMinimal';
export { type ExtensionFunction } from './core/qr-code-js';
export { FileExtension } from './tools/browser-utils';
export { type RecursivePartial } from './types/helper';
export { type CanvasOptions } from './utils/canvas-options';
export { GradientType, type Gradient } from './utils/gradient';
export { CornerDotType, CornerSquareType, DotType, ImageMode, ShapeType, type Options, type BorderOptions } from './utils/options';
export { ErrorCorrectionPercents } from './utils/qrcode';
export declare const browserUtils: typeof _browserUtils | undefined;
type QRCodeJsConstructor = new (options: RecursivePartial<Options>, internal?: boolean) => QRCodeJs;
export declare class QRCodeJs extends _QRCodeJs {
    static initializeIfNeeded(): Promise<boolean>;
    static get hls(): boolean;
    protected _hls(): boolean;
    static getLicenseDetails(): DecodedLicenseToken | null;
    static configureLicenseFetcher(fetcher: (licenseKey: string) => Promise<string>): void;
    static token(token: string | null): Promise<ValidationResult>;
    static license(licenseKey: string): Promise<ValidationResult>;
    /**
     * Sets the absolute URL used by the built-in license fetcher.
     * MUST be called before using .license('key') if not providing a custom fetcher.
     * @param url The absolute URL for fetching license tokens (e.g., https://api.example.com/get-token).
     */
    static setLicenseUrl(url: string): typeof QRCodeJs;
    static _xmldomSync: any;
    static _initPromise: Promise<void> | null;
    static initXmldom(): Promise<void>;
    constructor(options: RecursivePartial<Options>, _?: boolean);
    static validateImageData(imageData: ImageDataLike): Promise<ScanValidatorResponse>;
    validateScanning(): Promise<ScanValidatorResponse>;
    static validateSvg(svgSource: string): Promise<ScanValidatorResponse>;
    /**
     * Creates a QRCodeBuilder instance initialized with a specific template.
     * Allows for fluent configuration chaining. We need it here to avoid circular dependency
     * @param templateName - The user-friendly name of the template to start with.
     * @returns A new QRCodeBuilder instance.
     */
    static useTemplate(templateName: string): QRCodeBuilder;
    /**
     * Creates a QRCodeBuilder instance initialized with a specific template by its ID.
     * Allows for fluent configuration chaining.
     * @param templateId - The ID (original key) of the template to start with.
     * @returns A new QRCodeBuilder instance.
     */
    static useTemplateId(templateId: string): QRCodeBuilder;
    /**
     * Creates a QRCodeBuilder instance initialized with a specific style.
     * Allows for fluent configuration chaining.
     * @param styleNameOrOptions - The name of the predefined style or a StyleOptions object.
     * @returns A new QRCodeBuilder instance.
     */
    static useStyle(styleNameOrOptions: string | StyleOptions): QRCodeBuilder;
    /**
     * Creates a QRCodeBuilder instance initialized with a specific style by its ID.
     * Allows for fluent configuration chaining.
     * @param styleId - The ID of the predefined style.
     * @returns A new QRCodeBuilder instance.
     */
    static useStyleId(styleId: string): QRCodeBuilder;
    /**
     * Creates a QRCodeBuilder instance initialized with specific border options.
     * Allows for fluent configuration chaining.
     * @param borderNameOrOptions - The name of the predefined border or a BorderOptions object.
     * @returns A new QRCodeBuilder instance.
     */
    static useBorder(borderNameOrOptions: string | BorderOptions): QRCodeBuilder;
    /**
     * Creates a QRCodeBuilder instance initialized with a specific border by its ID.
     * Allows for fluent configuration chaining.
     * @param borderId - The ID of the predefined border.
     * @returns A new QRCodeBuilder instance.
     */
    static useBorderId(borderId: string): QRCodeBuilder;
    /**
     * Creates a QRCodeBuilder instance initialized with a specific image.
     * Allows for fluent configuration chaining.
     * @param imageUrl - The URL or data URL of the image to use.
     * @returns A new QRCodeBuilder instance.
     */
    static useImage(imageUrl: string, overrideOpts?: MethodOverrideOptions): QRCodeBuilder;
    static useData(data: string, overrideOpts?: MethodOverrideOptions): QRCodeBuilder;
    /**
     * Creates a QRCodeBuilder instance initialized with specific text options.
     * Allows for fluent configuration chaining.
     * @param textNameOrOptions - The name of the predefined text template or a TextOptions object.
     * @returns A new QRCodeBuilder instance.
     */
    static useText(textNameOrOptions: string | TextOptions, overrideOpts?: MethodOverrideOptions): QRCodeBuilder;
    /**
     * Creates a QRCodeBuilder instance initialized with a specific text template by its ID.
     * Allows for fluent configuration chaining.
     * @param textId - The ID of the predefined text template.
     * @returns A new QRCodeBuilder instance.
     */
    static useTextId(textId: string, overrideOpts?: MethodOverrideOptions): QRCodeBuilder;
    static useOptions(options: RecursivePartial<Options>, overrideOpts?: MethodOverrideOptions): QRCodeBuilder;
    static useSettings(settings: SettingsOptions): QRCodeBuilder;
}
export declare class QRCodeBuilder {
    private _qrCodeConstructor;
    protected _templateSource: string | RecursivePartial<Options> | null;
    protected _borderSource: string | BorderOptions | null;
    protected _styleSource: string | StyleOptions | null;
    protected _imageSource: string | null;
    protected _imageOverride: boolean;
    protected _textSource: string | TextOptions | null;
    protected _textOverride: boolean;
    protected _isTemplateById: boolean;
    protected _isBorderById: boolean;
    protected _isStyleById: boolean;
    protected _isTextById: boolean;
    protected _optionsSource: RecursivePartial<Options> | null;
    protected _optionsOverride: boolean;
    protected _dataSource: string | null;
    protected _dataOverride: boolean;
    protected _idSource: string | null;
    protected _nameSource: string | null;
    protected _descriptionSource: string | null;
    protected _metadataSource: Record<string, any> | null;
    protected _initialOptions: RecursivePartial<Options> | null;
    /**
     * Creates a new QRCodeBuilder instance.
     * @param qrCodeConstructor - The constructor function (QRCodeJs or _) to use for the final instance.
     * @param templateNameOrOptions - Optional name of a predefined template or a partial options object to start with.
     */
    constructor(qrCodeConstructor: QRCodeJsConstructor, templateNameOrOptions?: string | RecursivePartial<Options>);
    /**
     * Sets the template to use by its name. Overwrites any previously set template.
     * @param templateName - The user-friendly name of the template to apply.
     * @returns The builder instance for chaining.
     */
    useTemplate(templateName: string): this;
    /**
     * Sets the template to use by its ID. Overwrites any previously set template.
     * @param templateId - The ID (original key) of the template to apply.
     * @returns The builder instance for chaining.
     */
    useTemplateId(templateId: string): this;
    /**
     * Sets the style to use by its name or a style options object. Overwrites any previously set style.
     * @param styleNameOrOptions - Name of a predefined style or a StyleOptions object to apply.
     * @returns The builder instance for chaining.
     */
    useStyle(styleNameOrOptions: string | StyleOptions): this;
    /**
     * Sets the style to use by its ID. Overwrites any previously set style.
     * @param styleId - ID of the predefined style to apply.
     * @returns The builder instance for chaining.
     */
    useStyleId(styleId: string): this;
    /**
     * Sets the border to use by its name or a border options object. Overwrites any previously set border.
     * @param borderNameOrOptions - Name of a predefined border or a BorderOptions object to apply.
     * @returns The builder instance for chaining.
     */
    useBorder(borderNameOrOptions: string | BorderOptions): this;
    /**
     * Sets the border to use by its ID. Overwrites any previously set border.
     * @param borderId - ID of the predefined border to apply.
     * @returns The builder instance for chaining.
     */
    useBorderId(borderId: string): this;
    /**
     * Sets the image to use. Overwrites any previously set image from other sources like templates.
     * @param imageUrl - The URL or data URL of the image to apply.
     * @returns The builder instance for chaining.
     */
    useImage(imageUrl: string, overrideOpts?: MethodOverrideOptions): this;
    /**
     * Sets the data to use by its name or a text options object. Overwrites any previously set data.
     * @param data - The data to be encoded in the QR code.
     * @returns The builder instance for chaining.
     */
    useData(data: string, overrideOpts?: MethodOverrideOptions): this;
    /**
     * Sets the text to use by its name or a text options object. Overwrites any previously set text.
     * @param textNameOrOptions - Name of a predefined text template or a TextOptions object to apply.
     * @returns The builder instance for chaining.
     */
    useText(textNameOrOptions: string | TextOptions, overrideOpts?: MethodOverrideOptions): this;
    /**
     * Sets the text to use by its ID. Overwrites any previously set text.
     * @param textId - ID of the predefined text template to apply.
     * @returns The builder instance for chaining.
     */
    useTextId(textId: string, overrideOpts?: MethodOverrideOptions): this;
    useOptions(options: RecursivePartial<Options>, overrideOpts?: MethodOverrideOptions): this;
    useId(id: string): this;
    useName(name: string): this;
    useDescription(description: string): this;
    useMetadata(metadata: Record<string, any>): this;
    useSettings(settings: SettingsOptions): this;
    /**
     * Resolves the template, border, style, and image sources and merges them in the correct order.
     * Order: Base Template -> Selected Template -> Selected Border -> Selected Text -> Selected Style -> Selected Image -> Final Options
     * @param finalOptions - The final options object passed to .options() or .build().
     * @returns The fully resolved and merged Options object.
     */
    private _resolveAndMergeConfig;
    /**
     * Merges the provided options into the builder's configuration and creates the QRCodeJs instance.
     * @param options - A partial options object to merge as the final step.
     * @returns The created QRCodeJs instance.
     */
    options(options: RecursivePartial<Options>): QRCodeJs;
    /**
     * Builds the QRCodeJs instance with the accumulated configuration.
     * @returns The created QRCodeJs instance.
     */
    build(): QRCodeJs;
}
export declare class _ extends QRCodeJs {
    protected _hls(): boolean;
    static get hls(): boolean;
    constructor(options: RecursivePartial<Options>);
}
