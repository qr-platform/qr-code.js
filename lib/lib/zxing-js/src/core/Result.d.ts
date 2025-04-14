import BarcodeFormat from './BarcodeFormat';
import ResultMetadataType from './ResultMetadataType';
import ResultPoint from './ResultPoint';
/**
 * <p>Encapsulates the result of decoding a barcode within an image.</p>
 *
 * @author Sean Owen
 */
export default class Result {
    text: string | null;
    rawBytes: Uint8Array;
    private numBits;
    private resultPoints;
    format: BarcodeFormat;
    private timestamp;
    private resultMetadata;
    constructor(text: string | null | undefined, rawBytes: Uint8Array, numBits: number | undefined, resultPoints: ResultPoint[], format: BarcodeFormat, timestamp?: number);
    /**
     * @return raw text encoded by the barcode
     */
    getText(): string | null;
    /**
     * @return raw bytes encoded by the barcode, if applicable, otherwise {@code null}
     */
    getRawBytes(): Uint8Array;
    /**
     * @return how many bits of {@link #getRawBytes()} are valid; typically 8 times its length
     * @since 3.3.0
     */
    getNumBits(): number;
    /**
     * @return points related to the barcode in the image. These are typically points
     *         identifying finder patterns or the corners of the barcode. The exact meaning is
     *         specific to the type of barcode that was decoded.
     */
    getResultPoints(): ResultPoint[];
    /**
     * @return The format of the barcode that was decoded
     */
    getBarcodeFormat(): BarcodeFormat;
    /**
     * @return Mapping keys to values. May be
     *   This contains optional metadata about what was detected about the barcode,
     *   like orientation.
     */
    getResultMetadata(): Map<ResultMetadataType, object>;
    putMetadata(type: ResultMetadataType, value: object): void;
    putAllMetadata(metadata: Map<ResultMetadataType, object>): void;
    addResultPoints(newPoints: ResultPoint[]): void;
    getTimestamp(): number;
    toString(): string | null;
}
