import { BitBuffer } from './BitBuffer.js';
import { Mode } from './Mode.js';
/**
 * QRData
 *
 * @author Kazuhiko Arase
 */
export declare abstract class QRData {
    private mode;
    private data;
    constructor(mode: Mode, data: string);
    getMode(): Mode;
    getData(): string;
    abstract getLength(): number;
    abstract write(buffer: BitBuffer): void;
    getLengthInBits(typeNumber: number): number;
}
