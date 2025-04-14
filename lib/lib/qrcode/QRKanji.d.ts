import { BitBuffer } from './BitBuffer.js';
import { QRData } from './QRData.js';
/**
 * QRKanji(SJIS only)
 *
 * @author Kazuhiko Arase
 */
export declare class QRKanji extends QRData {
    private stringToBytes;
    constructor(data: string, stringToBytes: (s: string) => number[]);
    write(buffer: BitBuffer): void;
    getLength(): number;
}
