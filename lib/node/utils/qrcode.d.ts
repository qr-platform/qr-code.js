import { Mode } from '~/lib/qrcode/QRCodeMinimal';
export declare const ErrorCorrectionPercents: {
    L: number;
    M: number;
    Q: number;
    H: number;
};
export declare function getMode(data: string): Mode;
