export interface CanvasOptions {
    width: number;
    height: number;
    margin: number;
}
export declare const defaultCanvasOptions: CanvasOptions;
export declare function sanitizeCanvasOptions(options: CanvasOptions): CanvasOptions;
