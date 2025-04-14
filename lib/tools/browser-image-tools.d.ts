export declare const browserImageTools: {
    toDataURL: (url: string | Buffer | Blob) => Promise<string>;
    getSize: (src: string | Blob | Buffer, crossOrigin?: string) => Promise<{
        width: number;
        height: number;
    }>;
};
