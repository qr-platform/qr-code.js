import { ScanValidatorResponse } from './scan-validators/abstract-scan-validator';
/**
 * QR Code validator for Node.js environment
 */
export declare const qrValidator: {
    /**
     * Validate QR code using zbar with SVG as input
     * @param svgSource SVG string containing QR code
     * @param width Width to use for validation
     * @param height Height to use for validation
     * @param debug Enable detailed debugging
     * @returns Validation result
     */
    validateZbar: (svgSource: string | undefined, debug?: boolean) => Promise<ScanValidatorResponse>;
};
