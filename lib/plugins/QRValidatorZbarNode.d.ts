/**
 * QRValidatorZbar Validation Library for Node.js
 *
 * This server-side class uses zbar-wasm to decode QR codes and other barcodes,
 * with Jimp (and Resvg for SVG conversion) for image processing.
 */
interface QRValidatorOptions {
    /** Maximum number of retry attempts */
    maxRetries?: number;
    /** Time to wait between retries in milliseconds */
    retryInterval?: number;
    /** Enable debug logging */
    debug?: boolean;
}
interface QRValidationResult {
    /** Whether the validation was successful */
    isValid: boolean;
    /** Decoded data from the QR code (if successful) */
    data?: string;
    /** Format of the detected barcode */
    format?: string;
    /** Number of retry attempts made */
    attempts?: number;
    /** Whether the successful decode came from an inverted image */
    isInverted?: boolean;
    /** Error message if validation failed */
    error?: string;
    /** Error code if validation failed */
    errorCode?: string;
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
    validate(input: string, isInverted?: boolean): Promise<QRValidationResult>;
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
     * Save a debug image using Jimp. The raw image data is used to reconstruct an image.
     */
    private saveDebugImage;
    /**
     * Decode the QR code from image data using zbar-wasm.
     */
    private decodeQR;
}
export default QRValidatorZbarNode;
