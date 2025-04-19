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
    /**
     * Create a new QR code validator instance
     * @param options Configuration options
     */
    constructor(options?: QRValidatorOptions);
    /**
     * Debug logging
     * @param message Message to log
     */
    private log;
    /**
     * Validate and decode a QR code from an SVG string or buffer
     * @param input Input image (can be an SVG string, buffer, or file path)
     * @param width Optional width for resizing
     * @param height Optional height for resizing
     * @returns Validation results with decoded data if successful
     */
    validate(input: string | Buffer, isInverted?: boolean, width?: number | null, height?: number | null): Promise<QRValidationResult>;
    /**
     * Sleep function to wait between retry attempts
     * @param ms Milliseconds to wait
     * @returns Promise that resolves after the specified time
     */
    private sleep;
    /**
     * Process image using Sharp and get raw pixel data
     * @param input Input image
     * @param width Optional width for resizing
     * @param height Optional height for resizing
     * @returns Processed image data compatible with zbar-wasm
     */
    private processImage;
    /**
     * Validate with automatic retry
     * @param input Input image
     * @param getInvertedSvg Function to get inverted SVG for retry
     * @param width Optional width for resizing
     * @param height Optional height for resizing
     * @returns Validation result after retries
     */
    private validateWithRetry;
    /**
     * Save a debug image from raw image data
     * @param imageData Raw image data
     * @param prefix Prefix for the filename
     */
    private saveDebugImage;
    /**
     * Decode QR code from image data using zbar-wasm
     * @param imageData Raw image data in format compatible with zbar-wasm
     * @returns Validation result
     */
    private decodeQR;
}
export default QRValidatorZbarNode;
