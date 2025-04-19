import { TestCase } from '..';
export declare const baseOptions: {
    name: string;
    description: string;
    data: string;
    scale: number;
    margin: number;
    shape: string;
    qrOptions: {
        errorCorrectionLevel: string;
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
    };
};
export declare const darkContrastColors: (alpha: number | string) => string[];
export declare const lightContrastColors: (alpha: number | string) => string[];
export declare const buildOptions: (elementColor: string, backgroundColor: string) => {
    dotsOptions: {
        color: string;
        type: string;
    };
    cornersSquareOptions: {
        color: string;
        type: string;
    };
    cornersDotOptions: {
        color: string;
        type: string;
    };
    backgroundOptions: {
        color: string;
    };
    name: string;
    description: string;
    data: string;
    scale: number;
    margin: number;
    shape: string;
    qrOptions: {
        errorCorrectionLevel: string;
    };
};
export declare const alphas: number[];
declare const cases: TestCase[];
export default cases;
