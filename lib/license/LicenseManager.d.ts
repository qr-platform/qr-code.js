import { type DecodedLicenseToken } from '../utils/token-validator';
export declare const STORAGE_KEY = "QRCodeJsLicense";
export type LicenseReasonCode = // Export the type
'DOMAIN_MISMATCH' | 'TOKEN_EXPIRED' | 'TOKEN_INVALID' | 'FETCH_FAILED' | 'KEY_INVALID';
export interface ValidationResult {
    isValid: boolean;
    token: string | null;
    license: DecodedLicenseToken | null;
    reason?: LicenseReasonCode;
}
export declare class LicenseManager {
    private static _instance;
    private static _customLicenseApiUrl;
    private static _currentHostname;
    private _hls;
    private _decodedToken;
    private _licenseKey;
    private _isInitialized;
    private _initPromise;
    private _licenseFetcher;
    private constructor();
    /**
     * Gets the singleton instance of LicenseManager.
     */
    static get instance(): LicenseManager;
    /**
     * Sets the default URL used by the built-in license fetcher.
     * Call this *before* activating with a key if you are not providing a custom fetcher.
     * @param url The new default URL for fetching license tokens.
     */
    static setDefaultLicenseApiUrl(url: string): void;
    get hls(): boolean;
    get isInitialized(): boolean;
    getLicenseDetails(): DecodedLicenseToken | null;
    get licenseKey(): string | null;
    /**
     * Configures the function used to fetch a license token from a key.
     * @param fetcher A function that accepts a license key string and returns a Promise<string> (the token).
     */
    configureLicenseFetcher(fetcher: (licenseKey: string) => Promise<string>): void;
    initialize(): Promise<boolean>;
    private _performInitialization;
    /**
     * Resets the initialization state, forcing re-initialization on the next call to initialize().
     */
    resetInitialization(): void;
    /**
     * Resets the current license state (hls, decodedToken, licenseKey).
     */
    resetLicenseState(): void;
    /**
     * Activates the license using a pre-fetched JWT token.
     * Pass `null` to explicitly clear the current license state.
     * @param token The JWT token string, or null to clear the license.
     * @returns {Promise<ValidationResult>} The result of the validation.
     */
    activateWithToken(token: string | null): Promise<ValidationResult>;
    /**
     * Activates the license using a license key, fetching a token if necessary.
     * @param licenseKey The license key string.
     * @returns {Promise<ValidationResult>} The result of the validation.
     */
    activateWithKey(licenseKey: string): Promise<ValidationResult>;
    private _checkDomain;
    private _logValidationWarning;
    private _getStoredLicenseData;
    private _setStoredLicenseData;
    private _validateAndStoreToken;
}
