import { OutputStream } from './OutputStream.js';
/**
 * ByteArrayOutputStream
 *
 * @author Kazuhiko Arase
 */
export declare class ByteArrayOutputStream extends OutputStream {
    private bytes;
    constructor();
    writeByte(b: number): void;
    toByteArray(): number[];
}
