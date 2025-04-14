/**
 * OutputStream
 *
 * @author Kazuhiko Arase
 */
export declare abstract class OutputStream {
    constructor();
    abstract writeByte(b: number): void;
    writeBytes(bytes: number[]): void;
    flush(): void;
    close(): void;
}
