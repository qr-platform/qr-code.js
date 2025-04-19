import BinaryBitmap from '../core/BinaryBitmap';
import Result from '../core/Result';
import { BrowserCodeReader } from './BrowserCodeReader';
/**
 * QR Code reader to use from browser with improved error handling.
 * This implementation properly handles promise rejections when QR codes can't be decoded.
 */
export declare class BrowserQRCodeReader extends BrowserCodeReader {
    private qrReader;
    private inProgressDecodes;
    constructor(timeBetweenScansMillis?: number);
    /**
     * Safely reset the reader without causing message channel issues
     */
    private safeReset;
    /**
     * Overrides the decodeBitmap method to ensure proper error handling and reader reset.
     * This makes BrowserQRCodeReader behave consistently with BrowserMultiFormatReader.
     */
    decodeBitmap(binaryBitmap: BinaryBitmap): Result;
    /**
     * Overrides decodeFromImageUrl to ensure proper resource handling
     */
    decodeFromImageUrl(url: string): Promise<Result>;
    /**
     * Override the reset method to safely clean up resources
     */
    reset(): void;
}
