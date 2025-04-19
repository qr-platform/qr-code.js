import BinaryBitmap from '../core/BinaryBitmap';
import DecodeHintType from '../core/DecodeHintType';
import Reader from '../core/Reader';
import Result from '../core/Result';
import { HTMLVisualMediaElement } from './HTMLVisualMediaElement';
/**
 *
 * Base class for browser code reader.
 */
export declare class BrowserCodeReader {
    protected readonly reader: Reader;
    protected timeBetweenScansMillis: number;
    protected _hints?: Map<DecodeHintType, any> | undefined;
    /**
     * If navigator is present.
     */
    get hasNavigator(): boolean;
    /**
     * If mediaDevices under navigator is supported.
     */
    get isMediaDevicesSuported(): boolean;
    /**
     * If enumerateDevices under navigator is supported.
     */
    get canEnumerateDevices(): boolean;
    /**
     * Delay time between decode attempts made by the scanner.
     */
    protected _timeBetweenDecodingAttempts: number;
    /** Time between two decoding tries in milli seconds. */
    get timeBetweenDecodingAttempts(): number;
    /**
     * Change the time span the decoder waits between two decoding tries.
     *
     * @param {number} millis Time between two decoding tries in milli seconds.
     */
    set timeBetweenDecodingAttempts(millis: number);
    /**
     * The HTML canvas element, used to draw the video or image's frame for decoding.
     */
    protected captureCanvas: HTMLCanvasElement;
    /**
     * The HTML canvas element context.
     */
    protected captureCanvasContext: CanvasRenderingContext2D;
    /**
     * The HTML image element, used as a fallback for the video element when decoding.
     */
    protected imageElement: HTMLImageElement;
    /**
     * Should contain the current registered listener for image loading,
     * used to unregister that listener when needed.
     */
    protected imageLoadedListener: EventListener;
    /**
     * Sets the hints.
     */
    set hints(hints: Map<DecodeHintType, any>);
    /**
     * Sets the hints.
     */
    get hints(): Map<DecodeHintType, any>;
    /**
     * Creates an instance of BrowserCodeReader.
     * @param {Reader} reader The reader instance to decode the barcode
     * @param {number} [timeBetweenScansMillis=500] the time delay between subsequent successful decode tries
     *
     * @memberOf BrowserCodeReader
     */
    constructor(reader: Reader, timeBetweenScansMillis?: number, _hints?: Map<DecodeHintType, any> | undefined);
    /**
     * Searches and validates a media element.
     */
    getMediaElement(mediaElementId: string, type: string): HTMLVisualMediaElement;
    /**
     * Decodes the barcode from an image.
     *
     * @param {(string|HTMLImageElement)} [source] The image element that can be either an element id or the element itself. Can be undefined in which case the decoding will be done from the imageUrl parameter.
     * @param {string} [url]
     * @returns {Promise<Result>} The decoding result.
     *
     * @memberOf BrowserCodeReader
     */
    decodeFromImage(source?: string | HTMLImageElement, url?: string): Promise<Result>;
    /**
     * Decodes something from an image HTML element.
     */
    decodeFromImageElement(source: string | HTMLImageElement): Promise<Result>;
    /**
     * Decodes an image from a URL.
     */
    decodeFromImageUrl(url?: string): Promise<Result>;
    private _decodeOnLoadImage;
    isImageLoaded(img: HTMLImageElement): boolean;
    prepareImageElement(imageSource?: HTMLImageElement | string): HTMLImageElement;
    /**
     * Tries to decode from the image input until it finds some value.
     */
    decodeOnce(element: HTMLVisualMediaElement, retryIfNotFound?: boolean, retryIfChecksumOrFormatError?: boolean): Promise<Result>;
    /**
     * Gets the BinaryBitmap for ya! (and decodes it)
     */
    decode(element: HTMLVisualMediaElement): Result;
    /**
     * Creates a binaryBitmap based in some image source.
     *
     * @param mediaElement HTML element containing drawable image source.
     */
    createBinaryBitmap(mediaElement: HTMLVisualMediaElement): BinaryBitmap;
    /**
     *
     */
    protected getCaptureCanvasContext(mediaElement?: HTMLVisualMediaElement): CanvasRenderingContext2D;
    /**
     *
     */
    protected getCaptureCanvas(mediaElement?: HTMLVisualMediaElement): HTMLCanvasElement;
    /**
     * Ovewriting this allows you to manipulate the snapshot image in anyway you want before decode.
     */
    drawImageOnCanvas(srcElement: HTMLImageElement, dimensions?: {
        sx: number;
        sy: number;
        sWidth: number;
        sHeight: number;
        dx: number;
        dy: number;
        dWidth: number;
        dHeight: number;
    }, canvasElementContext?: CanvasRenderingContext2D): void;
    /**
     * Call the encapsulated readers decode
     */
    decodeBitmap(binaryBitmap: BinaryBitmap): Result;
    /**
     * 🖌 Prepares the canvas for capture and scan frames.
     */
    createCaptureCanvas(mediaElement?: HTMLVisualMediaElement): HTMLCanvasElement;
    /**
     * Resets the code reader to the initial state.
     *
     * @memberOf BrowserCodeReader
     */
    reset(): void;
    private _destroyImageElement;
    /**
     * Destroys the capture canvas and context.
     */
    private _destroyCaptureCanvas;
}
