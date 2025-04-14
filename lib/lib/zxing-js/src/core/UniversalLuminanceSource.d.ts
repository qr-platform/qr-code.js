import LuminanceSource from './LuminanceSource';
/**
 * NodeLuminanceSource replicates the behavior of a LuminanceSource
 * but does NOT use sharp. Instead, you provide raw RGBA data and
 * we convert it to grayscale internally.
 */
export declare class UniversalLuminanceSource extends LuminanceSource {
    private buffer;
    private _width;
    private _height;
    /**
     * Private constructor; use the static createFromRawRGBA() method below.
     */
    constructor(width: number, height: number, buffer: Uint8ClampedArray);
    /**
     * Create a NodeLuminanceSource from raw RGBA data.
     * @param rgbaData - A Uint8ClampedArray of RGBA bytes (length = width * height * 4).
     * @param width - Image width in pixels.
     * @param height - Image height in pixels.
     * @param doAutoInvert - If true, invert each computed luminance.
     */
    static createFromRawRGBA(rgbaData: Uint8ClampedArray, width: number, height: number, doAutoInvert?: boolean): UniversalLuminanceSource;
    /**
     * Converts raw RGBA data to a grayscale buffer (single channel).
     * If doAutoInvert is true, each computed luminance is inverted.
     */
    private static toGrayscaleBuffer;
    getWidth(): number;
    getHeight(): number;
    getRow(y: number, row?: Uint8ClampedArray): Uint8ClampedArray;
    getMatrix(): Uint8ClampedArray;
    isCropSupported(): boolean;
    /**
     * Crops a region from the grayscale buffer.
     */
    crop(left: number, top: number, width: number, height: number): LuminanceSource;
    isRotateSupported(): boolean;
    rotateCounterClockwise(): LuminanceSource;
    rotateCounterClockwise45(): LuminanceSource;
    invert(): LuminanceSource;
    /**
     * Rotates the grayscale buffer by the specified angle in degrees.
     * Supports multiples of 90 only. Throws otherwise.
     */
    private rotate;
}
