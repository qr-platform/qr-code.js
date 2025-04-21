import { ScanValidatorResponse } from './scan-validators/abstract-scan-validator';
interface ImageDataLike {
    data: Uint8ClampedArray;
    width: number;
    height: number;
}
/**
 * QR Code validator for Node.js environment
 */
export declare const qrValidatorZbar: {
    /**
     * Validate QR code using zbar with SVG as input
     * @param svgSource SVG string containing QR code
     * @param width Width to use for validation
     * @param height Height to use for validation
     * @param debug Enable detailed debugging
     * @returns Validation result
     */
    validateZbar: (svgSource: string | undefined, debug?: boolean) => Promise<ScanValidatorResponse>;
    /**
     * Validate QR code using zbar with ImageData as input (Node.js)
     * @param imageData Object with { data: Uint8ClampedArray, width: number, height: number }
     * @param debug Enable detailed debugging (passed to underlying validator)
     * @returns Validation result
     */
    validateZbarImageData: (imageData: ImageDataLike, debug?: boolean) => Promise<ScanValidatorResponse>;
};
export {};
