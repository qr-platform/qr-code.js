/**
 * Fetches an image directly from its URL and converts it to a Data URL.
 * Handles potential CORS issues and other fetch errors.
 *
 * @param imageUrl The URL of the image to fetch.
 * @param crossOrigin The crossOrigin attribute value ('anonymous', 'use-credentials').
 * @returns A Promise resolving to the Data URL string, or null if fetching fails.
 */
export declare function fetchImageDataUrlDirectly(imageUrl: string, crossOrigin?: string): Promise<string | null>;
/**
 * Fetches an image via a proxy service, which returns the image as a Data URL.
 *
 * @param imageUrl The original URL of the image to fetch via proxy.
 * @returns A Promise resolving to the Data URL string from the proxy, or null if fetching fails.
 */
export declare function fetchImageDataUrlViaProxy(imageUrl: string): Promise<string | null>;
