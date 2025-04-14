/**
 * Polynomial
 *
 * @author Kazuhiko Arase
 */
export declare class Polynomial {
    private num;
    constructor(num: number[], shift?: number);
    getAt(index: number): number;
    getLength(): number;
    toString(): string;
    toLogString(): string;
    multiply(e: Polynomial): Polynomial;
    mod(e: Polynomial): Polynomial;
}
