import { RecursivePartial } from '../types/helper';
import { StyleOptions } from '../types/style-options';
import { Options } from './options';
export declare function mapStyleToOptions(styles: StyleOptions): RecursivePartial<Options>;
export declare function validateStyleOptions(styles: any): {
    isValid: boolean;
    errors: string[];
};
