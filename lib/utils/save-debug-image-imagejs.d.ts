/**
 * Save an RGBA or grayscale buffer as a PNG using image-js.
 * @param buffer - Buffer or Uint8Array of pixel data (RGBA or grayscale)
 * @param width - Image width
 * @param height - Image height
 * @param filename - Output PNG filename
 * @param isGray - If true, buffer is grayscale; otherwise, RGBA
 */
export declare function saveDebugImageImageJs(buffer: Buffer | Uint8Array, width: number, height: number, filename: string, isGray?: boolean): Promise<void>;
