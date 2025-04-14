import { OutputStream } from '../io/OutputStream.js';
/**
 * GIF Image (B/W)
 *
 * @author Kazuhiko Arase
 */
export declare class GIFImage {
    private width;
    private height;
    private data;
    constructor(width: number, height: number);
    setPixel(x: number, y: number, pixel: number): void;
    getPixel(x: number, y: number): number;
    write(out: OutputStream): void;
    private getLZWRaster;
    private writeWord;
    private writeBytes;
    toDataURL(): string;
}
