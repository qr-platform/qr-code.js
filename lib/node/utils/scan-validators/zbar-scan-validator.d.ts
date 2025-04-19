import QRValidatorZbar from '../../plugins/QRValidatorZbar';
import AbstractScanValidator, { ScanValidator, ScanValidatorResponse } from './abstract-scan-validator';
declare class ZBarScanValidator extends AbstractScanValidator implements ScanValidator {
    validator: QRValidatorZbar;
    constructor(debug?: boolean);
    validate(svgSource: string | undefined, getSvgInverted: () => Promise<string | undefined>, width: number, height: number, debug?: boolean): Promise<ScanValidatorResponse>;
}
export default ZBarScanValidator;
