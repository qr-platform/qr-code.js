import { int } from '../../customTypings';
import BitArray from './BitArray';
export default class BitMatrix {
    private width;
    private height?;
    private rowSize?;
    private bits?;
    constructor(width: number, height?: number | undefined, rowSize?: number | undefined, bits?: Int32Array | undefined);
    /**
     * Interprets a 2D array of booleans as a BitMatrix, where "true" means an "on" bit.
     */
    static parseFromBooleanArray(image: boolean[][]): BitMatrix;
    /**
     * Parses a string representation of the bit matrix.
     */
    static parseFromString(stringRepresentation: string, setString: string, unsetString: string): BitMatrix;
    /**
     * Gets the bit at position (x, y).
     */
    get(x: number, y: number): boolean;
    /**
     * Sets the bit at position (x, y) to true.
     */
    set(x: number, y: number): void;
    /**
     * Unsets the bit at position (x, y) (sets it to false).
     */
    unset(x: number, y: number): void;
    /**
     * Flips the bit at position (x, y).
     */
    flip(x: number, y: number): void;
    /**
     * XORs this matrix with another matrix.
     */
    xor(mask: BitMatrix): void;
    /**
     * Clears all bits (sets to false).
     */
    clear(): void;
    /**
     * Sets a square region of the matrix to true.
     */
    setRegion(left: number, top: number, width: number, height: number): void;
    /**
     * Retrieves a row as a BitArray.
     */
    getRow(y: number, row?: BitArray): BitArray;
    /**
     * Sets a row from a BitArray.
     */
    setRow(y: number, row: BitArray): void;
    /**
     * Rotates the matrix 180 degrees.
     */
    rotate180(): void;
    /**
     * Returns the smallest rectangle that encloses all set bits.
     */
    getEnclosingRectangle(): Int32Array;
    /**
     * Returns the coordinate of the top-left set bit.
     */
    getTopLeftOnBit(): Int32Array;
    /**
     * Returns the coordinate of the bottom-right set bit.
     */
    getBottomRightOnBit(): Int32Array;
    /**
     * Returns the width of the matrix.
     */
    getWidth(): number;
    /**
     * Returns the height of the matrix.
     */
    getHeight(): number;
    /**
     * Returns the row size of the matrix.
     */
    getRowSize(): number;
    /**
     * Checks equality with another BitMatrix.
     */
    equals(o: Object): boolean;
    /**
     * Computes the hash code.
     */
    hashCode(): int;
    /**
     * Returns a string representation of the matrix.
     */
    toString(setString?: string, unsetString?: string, lineSeparator?: string): string;
    private buildToString;
    /**
     * Returns a clone of this BitMatrix.
     */
    clone(): BitMatrix;
}
