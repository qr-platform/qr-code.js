import LuminanceSource from './LuminanceSource';
/**
 * NodeLuminanceSource replicates the behavior of HTMLCanvasElementLuminanceSource
 * but uses Sharp to obtain image data from a Buffer.
 */
export declare class NodeLuminanceSource extends LuminanceSource {
    private buffer;
    private _width;
    private _height;
    private constructor();
    /**
     * Asynchronously creates a NodeLuminanceSource from an image buffer.
     * @param imageBuffer - The image data (e.g. from fs.readFile) as a Buffer.
     * @param doAutoInvert - If true, computes an inverted grayscale buffer.
     */
    static create(imageBuffer: Buffer, doAutoInvert?: boolean): Promise<NodeLuminanceSource>;
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
    rotateCounterClockwise(): LuminanceSource;
    rotateCounterClockwise45(): LuminanceSource;
    /**
     * Rotates the image by the specified angle (in degrees) using Sharp.
     * This method creates a temporary RGBA image from the grayscale data,
     * rotates it, then re-converts to grayscale.
     */
    private rotate;
    invert(): LuminanceSource;
}
