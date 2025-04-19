export declare class BitBuffer {
    private buffer;
    private length;
    constructor();
    getBuffer(): number[];
    getLengthInBits(): number;
    toString(): string;
    private getBit;
    put(num: number, length: number): void;
    putBit(bit: boolean): void;
}
