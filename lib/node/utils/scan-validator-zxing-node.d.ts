import { BinaryBitmap } from '~/lib/zxing-js/src';
import { NodeLuminanceSource } from '~/lib/zxing-js/src/node';
import { ScanValidatorResponse } from './scan-validators/abstract-scan-validator';
interface ImageDataLike {
    data: Uint8ClampedArray;
    width: number;
    height: number;
}
export interface PreprocessingOptions {
    lower?: number;
    upper?: number;
    gamma?: number;
    threshold?: number;
}
/**
 * Main QR Validator: attempts to decode the QR code from an SVG string.
 * It tries the normal decode first, then with inverted luminance.
 * (Alternative preprocessing attempt removed as it was identical to the first).
 */
export declare const qrValidatorZxing: {
    validateZxing: (svgString: string | undefined) => Promise<ScanValidatorResponse>;
    validateImageData: (imageData: ImageDataLike) => Promise<ScanValidatorResponse>;
};
export type { NodeLuminanceSource, BinaryBitmap, ScanValidatorResponse };
