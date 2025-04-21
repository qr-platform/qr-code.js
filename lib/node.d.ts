import { QRCodeJs as _QRCodeJs } from './core/qr-code-js';
import { type ValidationResult } from './license/LicenseManagerNode';
import type * as _browserUtils from './tools/browser-utils';
import { RecursivePartial } from './types/helper';
import { StyleOptions } from './types/style-options';
import { Options } from './utils/options';
import { ImageDataLike } from './utils/scan-validator-worker';
import { ScanValidatorResponse } from './utils/scan-validators/abstract-scan-validator';
import { type DecodedLicenseToken } from './utils/token-validator';
export { ErrorCorrectionLevel, Mode, TypeNumber } from '~/lib/qrcode/QRCodeMinimal';
export { type ExtensionFunction } from './core/qr-code-js';
export { FileExtension } from './tools/browser-utils';
export { type RecursivePartial } from './types/helper';
export { type CanvasOptions } from './utils/canvas-options';
export { GradientType, type Gradient } from './utils/gradient';
export { CornerDotType, CornerSquareType, DotType, ImageMode, ShapeType, type Options } from './utils/options';
export { ErrorCorrectionPercents } from './utils/qrcode';
export declare const browserUtils: typeof _browserUtils | undefined;
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
export declare class _ extends QRCodeJs {
    protected _hls(): boolean;
    static get hls(): boolean;
    constructor(options: RecursivePartial<Options>);
}
