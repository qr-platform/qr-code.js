/**
 * createStringToBytes
 *
 * @author Kazuhiko Arase
 * @param unicodeData base64 string of byte array.
 * [16bit Unicode],[16bit Bytes], ...
 * @param numChars
 */
export declare function createStringToBytes(unicodeData: string, numChars: number): (s: string) => number[];
