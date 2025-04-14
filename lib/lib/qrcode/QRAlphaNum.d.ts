import { BitBuffer } from './BitBuffer.js';
import { QRData } from './QRData.js';
/**
 * QRAlphaNum
 *
 * @author Kazuhiko Arase
 */
export declare class QRAlphaNum extends QRData {
    constructor(data: string);
    write(buffer: BitBuffer): void;
    getLength(): number;
    private static getCode;
}
