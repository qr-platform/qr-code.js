import { ErrorCorrectLevel } from './ErrorCorrectLevel.js';
import { Mode } from './Mode.js';
import { Polynomial } from './Polynomial.js';
import { QRCodeMinimal } from './QRCodeMinimal.js';
/**
 * QRUtil
 *
 * @author Kazuhiko Arase
 */
export declare class QRUtil {
    constructor();
    static getPatternPosition(typeNumber: number): number[];
    private static PATTERN_POSITION_TABLE;
    private static MAX_LENGTH;
    static getMaxLength(typeNumber: number, mode: Mode, errorCorrectLevel: ErrorCorrectLevel): number;
    static getErrorCorrectPolynomial(errorCorrectLength: number): Polynomial;
    static getMaskFunc(maskPattern: number): (i: number, j: number) => boolean;
    static getLostPoint(qrCode: QRCodeMinimal): number;
    static getBCHTypeInfo(data: number): number;
    static getBCHTypeNumber(data: number): number;
    private static G15;
    private static G18;
    private static G15_MASK;
    private static getBCHDigit;
}
