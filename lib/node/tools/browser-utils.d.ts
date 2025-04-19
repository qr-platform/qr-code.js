import { QRCodeJs } from '../core/qr-code-js.js';
import { RecursivePartial } from '../types/helper.js';
import { CanvasOptions } from '../utils/canvas-options.js';
export declare enum FileExtension {
    svg = "svg",
    png = "png",
    jpeg = "jpeg",
    webp = "webp"
}
export declare function drawToCanvas(qrCode: QRCodeJs, options?: RecursivePartial<CanvasOptions>): {
    canvas: HTMLCanvasElement;
    canvasDrawingPromise: Promise<void> | undefined;
} | undefined;
export declare function download(qrCode: QRCodeJs, downloadOptions?: {
    name?: string;
    extension: `${FileExtension}`;
}, options?: RecursivePartial<CanvasOptions>): Promise<void>;
export declare function downloadURI(uri: string, name: string): void;
