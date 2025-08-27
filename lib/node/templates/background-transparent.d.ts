export { ErrorCorrectionLevel, Mode, TypeNumber } from '~/lib/qrcode/QRCodeMinimal.js';
export { QRCodeJs, type ExtensionFunction } from '../core/qr-code-js.js';
export { type RecursivePartial } from '../types/helper.js';
export { type CanvasOptions } from '../utils/canvas-options.js';
export { GradientType, type Gradient } from '../utils/gradient';
export { CornerDotType, CornerSquareType, DotType, ImageMode, ShapeType, type Options } from '../utils/options.js';
export { ErrorCorrectionPercents } from '../utils/qrcode.js';
export declare const codes: ({
    backgroundOptions: {
        color: string;
        round: number;
    };
    data: string;
    scale: number;
    margin: number;
    width: number;
    height: number;
    shape: string;
    dotsOptions: {
        color: string;
    };
    cornersSquareOptions: {
        color: string;
    };
    cornersDotOptions: {
        color: string;
    };
    borderOptions: {
        hasBorder: boolean;
    };
} | {
    backgroundOptions: {
        color: string;
        round?: undefined;
    };
    borderOptions: {
        hasBorder: boolean;
        thickness: number;
        color: string;
        radius: string;
        decorations: {
            top: {
                offset: number;
                value: string;
                enableText: boolean;
                style: {
                    fontColor: string;
                    fontSize?: undefined;
                };
            };
            bottom: {
                offset: number;
                value: string;
                enableText: boolean;
                style: {
                    fontColor: string;
                    fontSize?: undefined;
                };
            };
        };
        borderOuter?: undefined;
        borderInner?: undefined;
    };
    data: string;
    scale: number;
    margin: number;
    width: number;
    height: number;
    shape: string;
    dotsOptions: {
        color: string;
    };
    cornersSquareOptions: {
        color: string;
    };
    cornersDotOptions: {
        color: string;
    };
} | {
    backgroundOptions: {
        color: string;
        round?: undefined;
    };
    borderOptions: {
        hasBorder: boolean;
        thickness: number;
        color: string;
        radius: string;
        decorations: {
            top: {
                value: string;
                offset: number;
                enableText: boolean;
                style: {
                    fontColor: string;
                    fontSize?: undefined;
                };
            };
            bottom: {
                offset: number;
                value: string;
                enableText: boolean;
                style: {
                    fontColor: string;
                    fontSize?: undefined;
                };
            };
        };
        borderOuter: {
            thickness: number;
            color: string;
        };
        borderInner: {
            thickness: number;
            color: string;
        };
    };
    data: string;
    scale: number;
    margin: number;
    width: number;
    height: number;
    shape: string;
    dotsOptions: {
        color: string;
    };
    cornersSquareOptions: {
        color: string;
    };
    cornersDotOptions: {
        color: string;
    };
} | {
    backgroundOptions: {
        color: string;
        round?: undefined;
    };
    borderOptions: {
        hasBorder: boolean;
        thickness: number;
        color: string;
        radius: string;
        borderOuter: {
            thickness: number;
            color: string;
        };
        borderInner: {
            thickness: number;
            color: string;
        };
        decorations?: undefined;
    };
    dotsOptions: {
        type: string;
        color: string;
        gradient?: undefined;
    };
    data: string;
    scale: number;
    margin: number;
    width: number;
    height: number;
    shape: string;
    cornersSquareOptions: {
        color: string;
    };
    cornersDotOptions: {
        color: string;
    };
} | {
    backgroundOptions: {
        color: string;
        round?: undefined;
    };
    borderOptions: {
        hasBorder: boolean;
        thickness: number;
        color: string;
        radius: string;
        borderOuter: {
            thickness: number;
            color: string;
        };
        borderInner: {
            thickness: number;
            color: string;
        };
        decorations?: undefined;
    };
    data: string;
    scale: number;
    margin: number;
    width: number;
    height: number;
    shape: string;
    dotsOptions: {
        color: string;
    };
    cornersSquareOptions: {
        color: string;
    };
    cornersDotOptions: {
        color: string;
    };
} | {
    backgroundOptions: {
        color: string;
        round?: undefined;
    };
    dotsOptions: {
        type: string;
        gradient: {
            type: string;
            rotation: number;
            colorStops: {
                offset: number;
                color: string;
            }[];
        };
        color?: undefined;
    };
    cornersSquareOptions: {
        type: string;
        gradient: {
            type: string;
            colorStops: {
                offset: number;
                color: string;
            }[];
        };
        color?: undefined;
    };
    data: string;
    scale: number;
    margin: number;
    width: number;
    height: number;
    shape: string;
    cornersDotOptions: {
        color: string;
    };
    borderOptions: {
        hasBorder: boolean;
    };
} | {
    backgroundOptions: {
        color: string;
        round: number;
    };
    dotsOptions: {
        type: string;
        color: string;
        gradient?: undefined;
    };
    cornersSquareOptions: {
        type: string;
        color: string;
        gradient?: undefined;
    };
    cornersDotOptions: {
        type: string;
        color: string;
    };
    data: string;
    scale: number;
    margin: number;
    width: number;
    height: number;
    shape: string;
    borderOptions: {
        hasBorder: boolean;
    };
} | {
    backgroundOptions: {
        color: string;
        round?: undefined;
    };
    shape: string;
    margin: number;
    borderOptions: {
        hasBorder: boolean;
        thickness: number;
        color: string;
        radius: string;
        decorations: {
            top: {
                value: string;
                enableText: boolean;
                style: {
                    fontColor: string;
                    fontSize?: undefined;
                };
                offset?: undefined;
            };
            bottom?: undefined;
        };
        borderOuter?: undefined;
        borderInner?: undefined;
    };
    data: string;
    scale: number;
    width: number;
    height: number;
    dotsOptions: {
        color: string;
    };
    cornersSquareOptions: {
        color: string;
    };
    cornersDotOptions: {
        color: string;
    };
} | {
    backgroundOptions: {
        color: string;
        round?: undefined;
    };
    margin: number;
    shape: string;
    borderOptions: {
        hasBorder: boolean;
        thickness: number;
        color: string;
        radius: string;
        borderOuter: {
            thickness: number;
            color: string;
        };
        borderInner: {
            thickness: number;
            color: string;
        };
        decorations: {
            top: {
                value: string;
                enableText: boolean;
                style: {
                    fontColor: string;
                    fontSize: number;
                };
                offset?: undefined;
            };
            bottom: {
                value: string;
                enableText: boolean;
                style: {
                    fontColor: string;
                    fontSize: number;
                };
                offset?: undefined;
            };
        };
    };
    data: string;
    scale: number;
    width: number;
    height: number;
    dotsOptions: {
        color: string;
    };
    cornersSquareOptions: {
        color: string;
    };
    cornersDotOptions: {
        color: string;
    };
} | {
    backgroundOptions: {
        color: string;
        round?: undefined;
    };
    borderOptions: {
        hasBorder: boolean;
        thickness: number;
        color: string;
        radius: string;
        decorations?: undefined;
        borderOuter?: undefined;
        borderInner?: undefined;
    };
    margin: number;
    dotsOptions: {
        type: string;
        gradient: {
            type: string;
            colorStops: {
                offset: number;
                color: string;
            }[];
            rotation?: undefined;
        };
        color?: undefined;
    };
    cornersSquareOptions: {
        type: string;
        color: string;
        gradient?: undefined;
    };
    data: string;
    scale: number;
    width: number;
    height: number;
    shape: string;
    cornersDotOptions: {
        color: string;
    };
} | {
    backgroundOptions: {
        color: string;
        round?: undefined;
    };
    margin: number;
    borderOptions: {
        hasBorder: boolean;
        thickness: number;
        color: string;
        radius: string;
        decorations?: undefined;
        borderOuter?: undefined;
        borderInner?: undefined;
    };
    data: string;
    scale: number;
    width: number;
    height: number;
    shape: string;
    dotsOptions: {
        color: string;
    };
    cornersSquareOptions: {
        color: string;
    };
    cornersDotOptions: {
        color: string;
    };
})[];
