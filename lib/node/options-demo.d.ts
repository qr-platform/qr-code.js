import { ShapeType } from './utils/options';
export declare const options2: {
    shape: ShapeType;
    verticalOffset: number;
    isResponive: string;
    margin: number;
    scale: number;
    data: string;
    image: string;
    dotsOptions: {
        type: string;
        color: string;
        size: number;
    };
    backgroundOptions: {
        color: string;
    };
    cornersDotOptions: {
        type: string;
        color: string;
    };
    cornersSquareOptions: {
        type: string;
        color: string;
    };
    imageOptions: {
        crossOrigin: string;
        imageSize: number;
        margin: number;
    };
    borderOptions: {
        hasBorder: boolean;
        radius: string;
        thickness: number;
        inner: {
            radius: string;
            scale: number;
            horizontalOffset: number;
            verticalOffset: number;
        };
        color: string;
        decorations: {
            top: {
                disabled: boolean;
                enableText: boolean;
                offset: number;
                curveAdjustment: number;
                curveDisabled: boolean;
                curveRadius: string;
                type: string;
                value: string;
                style: {
                    fontFace: string;
                    fontSize: number;
                    fontColor: string;
                    letterSpacing: number;
                    fontWeight: string;
                };
            };
            bottom: {
                disabled: boolean;
                enableText: boolean;
                offset: number;
                curveAdjustment: number;
                curveRadius: string;
                curveDisabled: boolean;
                type: string;
                value: string;
                style: {
                    fontFace: string;
                    fontSize: number;
                    fontColor: string;
                    letterSpacing: number;
                    fontWeight: string;
                };
            };
            left: {
                disabled: boolean;
                enableText: boolean;
                offset: number;
                curveAdjustment: number;
                curveRadius: string;
                curveDisabled: boolean;
                type: string;
                value: string;
                style: {
                    fontFace: string;
                    fontSize: number;
                    fontColor: string;
                    letterSpacing: number;
                    fontWeight: string;
                };
            };
            right: {
                disabled: boolean;
                enableText: boolean;
                offset: number;
                curveAdjustment: number;
                curveDisabled: boolean;
                curveRadius: string;
                type: string;
                value: string;
                style: {
                    fontFace: string;
                    fontSize: number;
                    fontColor: string;
                    letterSpacing: number;
                    fontWeight: string;
                };
            };
        };
        borderOuter: {
            color: string;
            thickness: number;
        };
        borderInner: {
            color: string;
            thickness: number;
        };
    };
};
export declare const options: {
    name: string;
    description: string;
    data: string;
    image: string;
    margin: number;
    verticalOffset: number;
    scale: number;
    shape: string;
    qrOptions: {};
    imageOptions: {
        imageSize: number;
        margin: number;
        roundedValue: number;
    };
    dotsOptions: {
        type: string;
        color: string;
    };
    cornersSquareOptions: {
        type: string;
        color: string;
    };
    cornersDotOptions: {
        type: string;
        color: string;
    };
    backgroundOptions: {
        color: string;
        gradient: {
            type: string;
            colorStops: {
                offset: number;
                color: string;
            }[];
        };
    };
    borderOptions: {
        hasBorder: boolean;
        radius: string;
        innerRadius: string;
        thickness: number;
        color: string;
        isTopBorderOnly: boolean;
        isBottomBorderOnly: boolean;
        isTopBottomBorderOnly: boolean;
        decorations: {
            top: {
                enableText: boolean;
                verticalOffset: number;
                curveAdjustment: number;
                disableCurve: boolean;
                type: string;
                value: string;
                style: {
                    fontFace: string;
                    fontSize: number;
                    fontColor: string;
                    letterSpacing: number;
                    fontWeight: string;
                };
            };
            bottom: {
                enableText: boolean;
                verticalOffset: number;
                curveAdjustment: number;
                disableCurve: boolean;
                type: string;
                value: string;
                style: {
                    fontFace: string;
                    fontSize: number;
                    fontColor: string;
                    letterSpacing: number;
                    fontWeight: string;
                };
            };
            left: {
                enableText: boolean;
                verticalOffset: number;
                curveAdjustment: number;
                disableCurve: boolean;
                type: string;
                value: string;
                style: {
                    fontFace: string;
                    fontSize: number;
                    fontColor: string;
                    letterSpacing: number;
                    fontWeight: string;
                };
            };
            right: {
                enableText: boolean;
                verticalOffset: number;
                curveAdjustment: number;
                disableCurve: boolean;
                type: string;
                value: string;
                style: {
                    fontFace: string;
                    fontSize: number;
                    fontColor: string;
                    letterSpacing: number;
                    fontWeight: string;
                };
            };
        };
        borderOuter: {
            color: string;
            thickness: number;
        };
        borderInner: {
            color: string;
            thickness: number;
        };
    };
};
