import { BrowserQRCodeReader } from '~/lib/zxing-js/src';
import AbstractScanValidator, { ScanValidator, ScanValidatorResponse } from './abstract-scan-validator';
declare class ZXingScanValidator extends AbstractScanValidator implements ScanValidator {
    validator: BrowserQRCodeReader;
    constructor(debug?: boolean);
    validate(svgSource: string | undefined, getSvgInverted: () => Promise<string | undefined>, debug?: boolean): Promise<ScanValidatorResponse>;
}
export default ZXingScanValidator;
