export type Position = 'top' | 'bottom' | 'left' | 'right';
export type DecorationType = 'text' | 'image';
export declare const Positions: Record<Position, Position>;
export interface BorderOffsets {
    left?: number;
    right?: number;
    top?: number;
    bottom?: number;
}
export declare function computeBorderOffsets(thickness: number, noBorderThickness: number, enabledBorders: {
    top: boolean;
    right: boolean;
    bottom: boolean;
    left: boolean;
}): BorderOffsets;
export declare const buildTransform: (rotate: number, flip: boolean, width: number, height: number) => string;
export declare function computeTextPathOffset(position: Position, // 'top' | 'bottom' | 'left' | 'right'
thickness: number, // main border thickness
noBorderThickness: number, // fallback thickness if side is disabled
enabledBorders: {
    [key in Position]: boolean;
}): {
    x: number;
    y: number;
};
export declare const calculatePathDimensions: (size: number, thickness: number, outerBorderPadding: number, offset: number, borderOffsets?: BorderOffsets) => {
    startX: number;
    startY: number;
    pathWidth: number;
};
export declare const getRoundValue: (round: string | number) => number;
export declare const addProcentageToRadius: (radius: string | undefined, defaultRadius?: string | number) => string | number;
