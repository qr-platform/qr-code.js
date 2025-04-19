import { QRCodeMinimal } from './QRCodeMinimal.js';
export declare class QRCode extends QRCodeMinimal {
    private _createHalfASCII;
    createASCII(cellSize?: number, margin?: number): string;
    renderTo2dContext(context: CanvasRenderingContext2D, cellSize?: number): void;
    toDataURL(cellSize?: number, margin?: number): string;
    createTableTag(cellSize?: number, margin?: number): string;
    createSvgTag(opts?: {
        cellSize?: number;
        margin?: number;
        scalable?: boolean;
        alt?: string | {
            text?: string | null;
            id?: string | null;
        };
        title?: string | {
            text?: string | null;
            id?: string | null;
        };
    }): string;
    createImgTag(cellSize?: number, margin?: number, alt?: string): string;
}
