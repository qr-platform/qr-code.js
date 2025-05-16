export interface CanvasOptions {
    width: number;
    height: number;
    margin: number;
    antialias: boolean;
    antialiasLevel: 'low' | 'medium' | 'high';
    antialiasFactor: number;
}
export declare const defaultCanvasOptions: CanvasOptions;
export declare function sanitizeCanvasOptions(options: CanvasOptions): CanvasOptions;
