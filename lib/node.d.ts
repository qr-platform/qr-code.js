import { QRCodeBuilder } from './builder/node';
import { QRCodeJs as _QRCodeJs } from './core/qr-code-js';
import { type ValidationResult } from './license/LicenseManagerNode';
import type * as _browserUtils from './tools/browser-utils';
import { RecursivePartial } from './types/helper';
import { Options } from './utils/options';
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
    constructor(options: RecursivePartial<Options>);
    validateScanning(): Promise<ScanValidatorResponse>;
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
    constructor(options: RecursivePartial<Options>);
}
