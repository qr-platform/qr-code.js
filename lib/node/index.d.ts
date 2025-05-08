import { QRCodeJs as _QRCodeJs } from './core/qr-code-js';
import { MethodOverrideOptions, RecursivePartial } from './types/helper';
import { StyleOptions } from './types/style-options';
import { TextOptions } from './types/text-options';
import { type Options as _QRCodeJsOptions, type BorderOptions } from './utils/options';
import { ScanValidatorResponse } from './utils/scan-validators/abstract-scan-validator';
import { type DecodedLicenseToken } from './utils/token-validator';
export { ErrorCorrectionLevel, Mode, TypeNumber } from './lib/qrcode/QRCodeMinimal';
export { type ExtensionFunction } from './core/qr-code-js';
export { FileExtension } from './tools/browser-utils';
export { type RecursivePartial } from './types/helper';
export { type CanvasOptions } from './utils/canvas-options';
export { GradientType, type Gradient } from './utils/gradient';
export { STORAGE_KEY } from './license/LicenseManager';
export { type BorderOptions, // Keep exporting the type
CornerDotType, CornerSquareType, DotType, ImageMode, ShapeType } from './utils/options.js';
export type Options = RecursivePartial<_QRCodeJsOptions>;
export type { Options as QRCodeJsOptions };
type QRCodeJsConstructor = new (options: Options, internal?: boolean) => QRCodeJs;
export declare class QRCodeJs extends _QRCodeJs {
    constructor(options: RecursivePartial<_QRCodeJsOptions>, _?: boolean);
    protected _hls(): boolean;
    static initializeIfNeeded(): Promise<boolean>;
    static get hls(): boolean;
    static getLicenseDetails(): DecodedLicenseToken | null;
    static configureLicenseFetcher(fetcher: (licenseKey: string) => Promise<string>): void;
    /**
     * Activate the license using a pre-fetched JWT token via LicenseManager.
     * @param token The JWT token string, or null to clear the license.
     * @returns A Promise resolving to the validation result.
     */
    static token(token: string | null): Promise<{
        isValid: boolean;
        token: string | null;
        license: DecodedLicenseToken | null;
    }>;
    /**
     * Sets the default URL used by the built-in license fetcher.
     * Call this *before* activating with a key if you are not providing a custom fetcher.
     * @param url The new default URL for fetching license tokens.
     */
    static setLicenseUrl(url: string): typeof QRCodeJs;
    /**
     * Activate the license using a license key via LicenseManager.
     * @param licenseKey The license key string.
     * @returns A Promise resolving to the validation result.
     */
    static license(licenseKey: string): Promise<{
        isValid: boolean;
        token: string | null;
        license: DecodedLicenseToken | null;
    }>;
    validateScanning(_validatorId?: string, // Default validator
    debug?: boolean): Promise<ScanValidatorResponse>;
    /**
     * Creates a QRCodeBuilder instance initialized with a specific template by its name.
     * Allows for fluent configuration chaining.
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
}
export declare class _ extends QRCodeJs {
    protected _hls(): boolean;
    constructor(options: Options);
}
declare class QRCodeBuilder {
    private _qrCodeConstructor;
    protected _templateSource: string | Options | null;
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
    protected _initialOptions: Options | null;
    /**
     * Creates a new QRCodeBuilder instance.
     * @param qrCodeConstructor - The constructor function (QRCodeJs or _) to use for the final instance.
     * @param templateNameOrOptions - Optional name of a predefined template or a partial options object to start with.
     */
    constructor(qrCodeConstructor: QRCodeJsConstructor, templateNameOrOptions?: string | Options);
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
    options(options: Options): QRCodeJs;
    /**
     * Builds the QRCodeJs instance with the accumulated configuration.
     * @returns The created QRCodeJs instance.
     */
    build(): QRCodeJs;
}
