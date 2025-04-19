import { BitBuffer } from './BitBuffer.js';
import { QRData } from './QRData.js';
/**
 * QRNumber
 *
 * @author Kazuhiko Arase
 */
export declare class QRNumber extends QRData {
    constructor(data: string);
    write(buffer: BitBuffer): void;
    getLength(): number;
    private static strToNum;
    private static chatToNum;
}
