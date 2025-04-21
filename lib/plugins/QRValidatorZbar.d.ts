export default QRValidatorZbar;
declare class QRValidatorZbar {
    constructor(options?: {});
    canvas: HTMLCanvasElement;
    context: CanvasRenderingContext2D | null;
    maxRetries: any;
    retryInterval: any;
    /**
     * Validate and decode a QR code from an image
     * @param {HTMLImageElement|File|Blob|String} input - Input image (can be an image element, file, blob or data URL)
     * @returns {Promise<Object>} - Validation results with decoded data if successful
     */
    validate(input: HTMLImageElement | File | Blob | string, width: any, height: any): Promise<Object>;
    /**
     * Load image from various sources
     * @param {HTMLImageElement|File|Blob|String} input - Input image
     * @returns {Promise<HTMLImageElement>} - Loaded image
     */
    loadImage(input: HTMLImageElement | File | Blob | string): Promise<HTMLImageElement>;
    /**
     * Sleep function to wait between retry attempts
     * @param {number} ms - Milliseconds to wait
     * @returns {Promise<void>}
     */
    sleep(ms: number): Promise<void>;
    /**
     * Decode QR code with automatic retry
     * @param {ImageData} imageData - Raw image data
     * @returns {Promise<Object>} - Validation result after retries
     */
    decodeQRWithRetry(imageData: ImageData): Promise<Object>;
    /**
     * Validate and decode a QR code directly from ImageData
     * @param {object} imageData - Object with { data: Uint8ClampedArray, width: number, height: number }
     * @returns {Promise<Object>} - Validation results
     */
    validateImageData(imageData: object): Promise<Object>;
    /**
     * Decode QR code from image data using zbar-wasm
     * @param {ImageData} imageData - Raw image data
     * @returns {Promise<Object>} - Validation result
     */
    decodeQR(imageData: ImageData): Promise<Object>;
}
