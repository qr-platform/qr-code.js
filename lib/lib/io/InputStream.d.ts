/**
 * InputStream
 *
 * @author Kazuhiko Arase
 */
export declare abstract class InputStream {
    constructor();
    abstract readByte(): number;
    close(): void;
}
