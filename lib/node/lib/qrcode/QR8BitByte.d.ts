import { BitBuffer } from './BitBuffer.js';
import { QRData } from './QRData.js';
/**
 * QR8BitByte
 *
 * @author Kazuhiko Arase
 */
export declare class QR8BitByte extends QRData {
    private stringToBytes;
    constructor(data: string, stringToBytes: (s: string) => number[]);
    write(buffer: BitBuffer): void;
    getLength(): number;
}
