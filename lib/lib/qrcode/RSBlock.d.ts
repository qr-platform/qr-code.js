import { ErrorCorrectLevel } from './ErrorCorrectLevel.js';
/**
 * RSBlock
 *
 * @author Kazuhiko Arase
 */
export declare class RSBlock {
    private totalCount;
    private dataCount;
    private static RS_BLOCK_TABLE;
    constructor(totalCount: number, dataCount: number);
    getDataCount(): number;
    getTotalCount(): number;
    static getRSBlocks(typeNumber: number, errorCorrectLevel: ErrorCorrectLevel): RSBlock[];
    private static getRsBlockTable;
}
