export type UnknownObject = {
    [key: string]: any;
} | undefined;
export declare function rv(s: string, toUpperCase?: boolean): string;
export declare function mergeDeep(target: UnknownObject, ...sources: UnknownObject[]): UnknownObject;
