/**
 * QRMath
 *
 * @author Kazuhiko Arase
 */
export declare class QRMath {
    constructor();
    static initialize: void;
    private static EXP_TABLE;
    private static LOG_TABLE;
    static glog(n: number): number;
    static gexp(n: number): number;
}
