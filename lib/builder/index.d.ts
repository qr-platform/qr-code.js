import { QRCodeJs } from '../index';
import { QRCodeBuilderCore } from './qr-code-builder';
/**
 * Builder class specifically for the browser environment.
 * Extends the core builder and provides the browser QRCodeJs constructor.
 */
export declare class QRCodeBuilder extends QRCodeBuilderCore<QRCodeJs> {
    /**
     * Creates a new QRCodeBuilder instance for the browser.
     * @param templateName - Optional name of a predefined template to start with.
     */
    constructor(templateName?: string);
}
