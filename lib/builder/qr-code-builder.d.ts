import { QRCodeJs as QRCodeJsBase } from '../core/qr-code-js';
import { RecursivePartial } from '../types/helper';
import { Options } from '../utils/options';
type QRCodeJsConstructor<T extends QRCodeJsBase = QRCodeJsBase> = new (options: Options) => T;
/**
 * Core Builder class for fluently configuring QRCodeJs instances.
 * This class is generic and requires the specific QRCodeJs constructor to be passed.
 */
export declare class QRCodeBuilderCore<T extends QRCodeJsBase> {
    protected config: RecursivePartial<Options>;
    protected qrCodeJsConstructor: QRCodeJsConstructor<T>;
    /**
     * Creates a new QRCodeBuilderCore instance.
     * @param qrCodeJsConstructor - The constructor of the specific QRCodeJs class to use.
     * @param templateName - Optional name of a predefined template to start with.
     */
    constructor(qrCodeJsConstructor: QRCodeJsConstructor<T>, templateName?: string);
    /**
     * Merges the provided options into the builder's configuration and creates the QRCodeJs instance.
     * @param options - A partial options object to merge.
     * @returns The created QRCodeJs instance.
     */
    options(options: RecursivePartial<Options>): T;
}
export {};
