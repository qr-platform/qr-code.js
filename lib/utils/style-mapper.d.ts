import { RecursivePartial } from '../types/helper';
import { StyleOptions } from '../types/style-options';
import { Options } from './options';
/**
 * Maps simplified StyleOptions to the detailed QRCodeJs Options structure.
 * @param styles - The StyleOptions object to map.
 * @returns A RecursivePartial<Options> object reflecting the styles.
 */
export declare function mapStyleToOptions(styles: StyleOptions): RecursivePartial<Options>;
export declare function validateStyleOptions(styles: any): {
    isValid: boolean;
    errors: string[];
};
