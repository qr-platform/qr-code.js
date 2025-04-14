/**
 * Represents the decoded payload of a valid license token.
 */
export interface DecodedLicenseToken {
    sub: string;
    client: string;
    email?: string;
    domains?: string[];
    iat: number;
    exp: number;
}
/**
 * Validates a JWT access token using the public key.
 *
 * @param token The JWT token string to validate.
 * @returns The decoded token payload if the token is valid and not expired.
 * @throws {Error} If the token is invalid, expired, or verification fails for any other reason.
 */
export declare function validateToken(token: string): Promise<DecodedLicenseToken>;
