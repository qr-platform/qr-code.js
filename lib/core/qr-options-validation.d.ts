import { RecursivePartial } from '../types/helper';
import { Options } from '../utils/options';
export interface ValidationWarning {
    path: string;
    message: string;
    value: any;
}
interface ValidationResult {
    warnings: ValidationWarning[];
    validatedOptions: RecursivePartial<Options>;
}
export declare function validateQROptions(options: RecursivePartial<Options>): ValidationResult;
export {};
