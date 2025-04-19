import { QRCodeJs as _QRCodeJs } from './core/qr-code-js';
import { RecursivePartial } from './types/helper';
import { StyleOptions } from './types/style-options';
import { Options, type Options as QRCodeJsOptions } from './utils/options';
import { ScanValidatorResponse } from './utils/scan-validators/abstract-scan-validator';
import { type DecodedLicenseToken } from './utils/token-validator';
export { ErrorCorrectionLevel, Mode, TypeNumber } from './lib/qrcode/QRCodeMinimal';
export { type ExtensionFunction } from './core/qr-code-js';
export { FileExtension } from './tools/browser-utils';
export { type RecursivePartial } from './types/helper';
export { type CanvasOptions } from './utils/canvas-options';
export { GradientType, type Gradient } from './utils/gradient';
export { STORAGE_KEY } from './license/LicenseManager';
export { type BorderOptions, CornerDotType, CornerSquareType, DotType, ImageMode, ShapeType, type Options as QRCodeJsOptions } from './utils/options.js';
export declare class QRCodeJs extends _QRCodeJs {
    constructor(options: RecursivePartial<QRCodeJsOptions>, _?: boolean);
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
     * Creates a QRCodeBuilder instance initialized with a specific template.
     * Allows for fluent configuration chaining. We need it here to avoid circular dependency
     * @param templateName - The name of the template to start with.
     * @param templateNameOrOptions - The name of the template or a partial options object to start with.
     * @returns A new QRCodeBuilder instance.
     */
    static useTemplate(templateNameOrOptions: string | RecursivePartial<Options>): QRCodeBuilder;
    /**
     * Creates a QRCodeBuilder instance initialized with a specific style.
     * Allows for fluent configuration chaining.
     * @param styleNameOrOptions - The name of the predefined style or a StyleOptions object.
     * @returns A new QRCodeBuilder instance.
     */
    static useStyle(styleNameOrOptions: string | StyleOptions): QRCodeBuilder;
}
export declare class _ extends QRCodeJs {
    protected _hls(): boolean;
    constructor(options: QRCodeJsOptions);
}
declare class QRCodeBuilder {
    protected config: RecursivePartial<Options>;
    /**
     * Creates a new QRCodeBuilder instance.
     * @param templateNameOrOptions - Optional name of a predefined template or a partial options object to start with.
     */
    constructor(templateNameOrOptions?: string | RecursivePartial<Options>);
    /**
     * Applies a template to the builder's configuration. Template options
     * will be overridden by subsequently chained .style() or .options() calls.
     * @param templateNameOrOptions - The name of the template or a partial options object to apply.
     * @returns The builder instance for chaining.
     */
    useTemplate(templateNameOrOptions: string | RecursivePartial<Options>): this;
    /**
     * Applies style options to the builder's configuration.
     * @param styleNameOrOptions - Name of a predefined style or Style options object to apply.
     * @returns The builder instance for chaining.
     */
    useStyle(styleNameOrOptions: string | StyleOptions): this;
    /**
     * Merges the provided options into the builder's configuration.
     * @param options - A partial options object to merge.
     * @returns The builder instance for chaining.
     */
    options(options: RecursivePartial<Options>): QRCodeJs;
    /**
     * Builds the QRCodeJs instance with the accumulated configuration.
     * @returns The created QRCodeJs instance.
     */
    build(): QRCodeJs;
}
