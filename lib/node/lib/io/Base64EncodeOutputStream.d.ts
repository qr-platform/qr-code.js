import { OutputStream } from './OutputStream.js';
/**
 * Base64EncodeOutputStream
 *
 * @author Kazuhiko Arase
 */
export declare class Base64EncodeOutputStream extends OutputStream {
    private ostream;
    private buffer;
    private buflen;
    private length;
    constructor(ostream: OutputStream);
    writeByte(n: number): void;
    flush(): void;
    private writeEncoded;
    private static encode;
}
