import { QRCodeJs } from '../node';
import { QRCodeBuilderCore } from './qr-code-builder';
/**
 * Builder class specifically for the Node.js environment.
 * Extends the core builder and provides the node QRCodeJs constructor.
 */
export declare class QRCodeBuilder extends QRCodeBuilderCore<QRCodeJs> {
    /**
     * Creates a new QRCodeBuilder instance for Node.js.
     * @param templateName - Optional name of a predefined template to start with.
     */
    constructor(templateName?: string);
}
