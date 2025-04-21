import { LuminanceSource } from '~/lib/zxing-js/src';
import QRCodeReader from '~/lib/zxing-js/src/core/qrcode/QRCodeReader';
import AbstractScanValidator, { ScanValidator, ScanValidatorResponse } from './abstract-scan-validator';
interface ImageDataLike {
    data: Uint8ClampedArray;
    width: number;
    height: number;
}
declare class ZXingCanvasScanValidator extends AbstractScanValidator implements ScanValidator {
    validator: QRCodeReader;
    constructor(debug?: boolean);
    displayLuminanceSource(source: LuminanceSource, label: string): void;
    validate(canvas: HTMLCanvasElement, debug?: boolean): Promise<ScanValidatorResponse>;
    validateImageData(imageData: ImageDataLike, debug?: boolean): Promise<ScanValidatorResponse>;
}
export default ZXingCanvasScanValidator;
