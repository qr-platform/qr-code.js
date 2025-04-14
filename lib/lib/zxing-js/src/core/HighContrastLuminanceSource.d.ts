import LuminanceSource from './LuminanceSource';
/**
 * A wrapper implementation of LuminanceSource which converts the source image
 * into a high contrast (binary) image using a fixed threshold. Pixels with a value
 * below the threshold become black (0) and those equal to or above become white (255).
 */
export default class HighContrastLuminanceSource extends LuminanceSource {
    private delegate;
    private threshold;
    constructor(delegate: LuminanceSource, threshold?: number);
    getRow(y: number, row?: Uint8ClampedArray): Uint8ClampedArray;
    getMatrix(): Uint8ClampedArray;
    isCropSupported(): boolean;
    crop(left: number, top: number, width: number, height: number): LuminanceSource;
    isRotateSupported(): boolean;
    rotateCounterClockwise(): LuminanceSource;
    rotateCounterClockwise45(): LuminanceSource;
    /**
     * Inverts the high contrast image. This wraps the current instance with InvertedLuminanceSource,
     * which effectively swaps black and white.
     */
    invert(): LuminanceSource;
    /**
     * Since this source is already high contrast, calling highContrast() returns itself.
     */
    highContrast(): LuminanceSource;
}
