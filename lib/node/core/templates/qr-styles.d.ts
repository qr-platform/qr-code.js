import { StyleOptions } from '../../types/style-options';
export interface QRStyleDefinition {
    id: string;
    name: string;
    style: StyleOptions;
}
export declare const qrStyleDefinitions: QRStyleDefinition[];
export declare function findStyleByName(name: string): QRStyleDefinition | undefined;
export declare function findStyleById(id: string): QRStyleDefinition | undefined;
