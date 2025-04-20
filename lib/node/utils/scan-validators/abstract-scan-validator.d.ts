import { BrowserQRCodeReader } from '~/lib/zxing-js/src';
import QRCodeReader from '~/lib/zxing-js/src/core/qrcode/QRCodeReader';
import QRValidatorZbar from '../../plugins/QRValidatorZbar';
export interface ScanValidatorResponse {
    /**
     * Whether QR code was successfully validated
     */
    isValid: boolean;
    /**
     * Decoded data from the QR code
     */
    decodedText?: string | null;
    /**
     * Whether the successful decode was from an inverted image
     */
    isInverted?: boolean;
    /**
     * Additional message about the validation result
     */
    message?: string;
    /**
     * Number of attempts made during validation
     */
    attempts?: number;
    /**
     * Error code if validation failed
     */
    errorCode?: string;
    /**
     * Validator used for the validation
     */
    validator?: string;
}
declare class AbstractScanValidator {
    debug: boolean;
    validatorName: string;
    log(message: any): void;
}
export default AbstractScanValidator;
export interface ScanValidator {
    validator: QRValidatorZbar | QRCodeReader | BrowserQRCodeReader;
    validate(...args: any): Promise<ScanValidatorResponse>;
}
export interface DecodeAttempt {
    name: string;
    execute(): Promise<ScanValidatorResponse>;
}
