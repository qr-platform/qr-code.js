import { type Options } from '~/utils/options';
import { RecursivePartial } from '~/types/helper';
export interface QRTemplateDefinition {
    id: string;
    name: string;
    options: RecursivePartial<Options>;
}
export declare const baseQRTemplateOptions: RecursivePartial<Options>;
export declare const qrTemplates: QRTemplateDefinition[];
export declare function findTemplateByName(name: string): QRTemplateDefinition | undefined;
export declare function findTemplateById(id: string): QRTemplateDefinition | undefined;
export declare const baseQRTemplate: QRTemplateDefinition | undefined;
