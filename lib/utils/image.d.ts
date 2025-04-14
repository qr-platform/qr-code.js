interface ImageSizeOptions {
    originalHeight: number;
    originalWidth: number;
    maxHiddenDots: number;
    maxHiddenAxisDots?: number;
    dotSize: number;
    margin: number;
}
interface ImageSizeResult {
    height: number;
    width: number;
    hideYDots: number;
    hideXDots: number;
}
export declare function calculateImageSize({ originalHeight, originalWidth, maxHiddenDots, maxHiddenAxisDots, dotSize, margin }: ImageSizeOptions): ImageSizeResult;
export {};
