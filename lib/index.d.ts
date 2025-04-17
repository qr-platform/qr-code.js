import { QRCodeBuilder } from './builder';
import { QRCodeJs as _QRCodeJs } from './core/qr-code-js';
import { type Options as QRCodeJsOptions } from './utils/options';
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
    constructor(options: QRCodeJsOptions);
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
     * Allows for fluent configuration chaining.
     * @param templateName - The name of the template to start with.
     * @returns A new QRCodeBuilder instance.
     */
    static useTemplate(templateName: string): QRCodeBuilder;
}
export declare class _ extends QRCodeJs {
    protected _hls(): boolean;
    constructor(options: QRCodeJsOptions);
}
