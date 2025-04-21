/**
 * QRValidatorZbar Validation Library for Node.js
 *
 * This server-side class uses zbar-wasm to decode QR codes and other barcodes,
 * with Jimp (and Resvg for SVG conversion) for image processing.
 */
import { ScanValidatorResponse } from '~/utils/scan-validators/abstract-scan-validator';
interface QRValidatorOptions {
    /** Maximum number of retry attempts */
    maxRetries?: number;
    /** Time to wait between retries in milliseconds */
    retryInterval?: number;
    /** Enable debug logging */
    debug?: boolean;
}
interface ImageDataLike {
    /** Raw pixel data (RGBA) */
    data: Uint8ClampedArray;
    /** Image width */
    width: number;
    /** Image height */
    height: number;
}
declare class QRValidatorZbarNode {
    private maxRetries;
    private retryInterval;
    private debug;
    constructor(options?: QRValidatorOptions);
    private log;
    /**
     * Validate and decode a QR code from an SVG string (or file path)
     */
    validate(input: string, isInverted?: boolean): Promise<ScanValidatorResponse>;
    private sleep;
    /**
     * Process image using Sharp and get raw pixel data
     * @param input Input image
     * @param width Optional width for resizing
     * @param height Optional height for resizing
     * @returns Processed image data compatible with zbar-wasm
     */
    private processImageResvg;
    private validateWithRetry;
    /**
     * Validate and decode a QR code directly from ImageData
     */
    validateImageData(imageData: ImageDataLike): Promise<ScanValidatorResponse>;
    /**
     * Save a debug image using Jimp. The raw image data is used to reconstruct an image.
     */
    private saveDebugImage;
    /**
     * Decode the QR code from image data using zbar-wasm.
     */
    private decodeQR;
}
export default QRValidatorZbarNode;
