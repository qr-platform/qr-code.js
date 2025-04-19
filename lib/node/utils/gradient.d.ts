export declare enum GradientType {
    radial = "radial",
    linear = "linear"
}
export interface Gradient {
    /**
     * Type of gradient spread
     *
     * @default GradientType.linear
     */
    type: GradientType;
    /**
     * Rotation of gradient (in radians, Math.PI === 180 degrees)
     *
     * @default 0
     */
    rotation?: number;
    /** Gradient colors. */
    colorStops: Array<{
        /** Position of color in gradient range */
        offset: number;
        /** Color of stop in gradient range */
        color: string;
    }>;
}
export declare function sanitizeGradient(gradient: Gradient): Gradient;
