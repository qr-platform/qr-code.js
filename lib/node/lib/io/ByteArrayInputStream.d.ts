import { InputStream } from './InputStream.js';
/**
 * ByteArrayInputStream
 *
 * @author Kazuhiko Arase
 */
export declare class ByteArrayInputStream extends InputStream {
    private bytes;
    private pos;
    constructor(bytes: number[]);
    readByte(): number;
}
