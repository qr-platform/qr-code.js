import LuminanceSource from './LuminanceSource';
/**
 * NodeLuminanceSource replicates the behavior of HTMLCanvasElementLuminanceSource
 * but uses Sharp to obtain image data from a Buffer.
 */
export declare class NodeLuminanceSource extends LuminanceSource {
    private buffer;
    private constructor();
    /**
     * Asynchronously creates a NodeLuminanceSource from an image buffer.
     * Can handle standard image formats (PNG/JPEG via Jimp) or raw RGBA buffers.
     * @param bufferInput - The image data as a Buffer (PNG, JPEG, or raw RGBA).
     * @param isPngOrJpeg - Flag indicating if the buffer is a standard format (true) or raw RGBA (false).
     * @param width - Required width if bufferInput is raw RGBA.
     * @param height - Required height if bufferInput is raw RGBA.
     * @param doAutoInvert - If true, computes an inverted grayscale buffer (only relevant for grayscale conversion).
     */
    static create(bufferInput: Buffer, isPngOrJpeg: boolean, // Renamed from isPng for clarity
    width?: number, // Optional width
    height?: number, // Optional height
    doAutoInvert?: boolean): Promise<NodeLuminanceSource>;
    /**
     * Converts raw RGBA data to a grayscale buffer.
     * If doAutoInvert is true, each computed luminance is inverted.
     */
    private static toGrayscaleBuffer;
    getRow(y: number, row?: Uint8ClampedArray): Uint8ClampedArray;
    getMatrix(): Uint8ClampedArray;
    isCropSupported(): boolean;
    crop(left: number, top: number, width: number, height: number): LuminanceSource;
    isRotateSupported(): boolean;
    invert(): LuminanceSource;
}
