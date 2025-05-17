# QRCode.js License Management
<a id="start"></a>

## Introduction
<a id="introduction"></a>

QRCode.js uses a license key system to enable premium features. Activation involves validating a JSON Web Token (JWT) which contains details about your license grant. This validation happens client-side (in the browser) or server-side (in Node.js) against a public key embedded in the library.

### Premium Features

A valid license is required to use the following premium features:

- **Advanced Borders:** 
  - Inner borders, outer borders, and text integrated into borders (e.g., `borderOptions.inner`, `borderOptions.outer`, `borderOptions.text`)
  - Custom border text without "QR-Platform" branding
  - Ability to disable or customize specific border sides
- **Scan Validation:** Using the built-in scan validation features (`qrInstance.validateScanning()`)

### Free Usage

QRCode.js can be used for free without a license key or premium features. In its free mode, it allows you to create full-featured, styled QR codes without premium border features or built-in scan validation. No other restrictions are applied, meaning you can still customize colors, sizes, shapes, and other styling options available in the base library.

### Border Limitations in Free Version

When using the basic border features in the free version, the library will automatically add "QR-Platform" branding text in the bottom border. This branded text cannot be removed or modified without a valid license. With a premium license, you gain full control over border text and can use borders without any branding.

## Core Concepts

### Free vs. Premium Features

- **Free Features**: Basic QR code generation, styling options (colors, shapes, dot types), image embedding
- **Premium Features**: 
  - Advanced border customization (without branding)
  - Scan validation tools
  - Full control over border text

### Activation Timing

- **Purpose**: Determines when license activation should occur
- **Important**: License activation must be completed *before* you create any `QRCodeJs` instances
- **Reason**: The constructor checks the license status at the time of creation
- **Rule**: Activate first, then instantiate

### Initialization

- **Purpose**: Sets up the license manager
- **Behavior**: Initializes automatically when you call `.license()` (or otherwise attempt activation) or check the status
- **Manual Method**: `QRCodeJs.initializeIfNeeded()` (rarely needed because `.license()` runs it automatically)
- **Example**:
  ```typescript
  async function initializeOnLoad() {
    const isActive = await QRCodeJs.initializeIfNeeded();
    console.log('License active after init:', isActive);
  }
  ```

### Persistence

#### Browser Environment
- **Storage**: `localStorage` under the key `QRCodeJsLicense`
- **Persistence**: License persists across page loads and sessions until token expiration
- **Content Stored**: Both JWT and license key (if used for activation)

#### Node.js Environment
- **Storage**: In-memory only (no persistent storage)
- **Persistence**: Requires reactivation when the application restarts
- **Alternative**: Manage token storage externally

#### Token Retrieval and Reuse
- **Purpose**: Obtain token for external storage
- **Method**: `QRCodeJs.license('YOUR-API-KEY')`
- **Return**: Promise resolving to `ValidationResult` with token string
- **Example**:
  ```typescript
  // Get and store the token
  const result = await QRCodeJs.license('YOUR-API-KEY');
  if (result.isValid) {
    await storeTokenInDatabase(result.token);
  }

  // Later, when you need to use the token
  const storedToken = await retrieveTokenFromDatabase();
  await QRCodeJs.token(storedToken); // Reactivate with stored token
  ```

## Activation Methods

### Using a License Key (`QRCodeJs.license()`)

- **Purpose**: Activate license using a license key
- **Type**: `function(licenseKey: string): Promise<ValidationResult>`
- **Process**:
  1. Calls `QRCodeJs.license('YOUR-LICENSE-KEY')`
  2. Library sends key to backend endpoint (default: `POST /api/license/get-token`)
  3. Backend validates key and returns signed JWT
  4. Library validates JWT signature and expiration date
  5. If valid, token and key are stored
- **Return Value**: Promise resolving to `ValidationResult` object
- **Example** (async/await):
  ```typescript
  await QRCodeJs.license('YOUR-LICENSE-KEY');
  const qrInstance = new QRCodeJs({
    data: 'https://example.com',
    borderOptions: { inner: true }
  });
  ```
- **Example** (promise chaining):
  ```typescript
  QRCodeJs.license('YOUR-LICENSE-KEY')
    .then(result => {
      if (result.isValid) {
        console.log('License activated!');
        const qrInstance = new QRCodeJs({
          data: 'https://example.com',
          borderOptions: { outer: true }
        });
        document.getElementById('qr-container').appendChild(qrInstance.element);
      } else {
        console.error('License activation failed.');
      }
    })
    .catch(error => {
      console.error('Error during license activation:', error);
    });
  ```

### Using a Pre-fetched Token (`QRCodeJs.token()`)

- **Purpose**: Activate license using a pre-fetched JWT token
- **Type**: `function(jwtToken: string | null): Promise<ValidationResult>`
- **Process**:
  1. Calls `QRCodeJs.token('YOUR-JWT-STRING')`
  2. Library validates JWT signature and expiration date
  3. If valid, token is stored
- **Clearing License**: `QRCodeJs.token(null)` clears stored token and deactivates license
- **Example** (async/await):
  ```typescript
  await QRCodeJs.token(token);
  const qrInstance = new QRCodeJs({
    data: 'https://example.com',
    borderOptions: { outer: true }
  });
  ```
- **Example** (promise chaining):
  ```typescript
  const token = 'YOUR-JWT-STRING';
  if (token) {
    QRCodeJs.token(token)
      .then(result => {
        if (result.isValid) {
          console.log('License activated with token!', result.license.plan);
          const qrInstance = new QRCodeJs({
            data: 'https://example.com',
            borderOptions: { inner: true }
          });
        } else {
          console.error('Provided token is invalid or expired.');
        }
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }
  ```

## Domain Validation (Browser Only)

- **Purpose**: Ensures license is used on authorized domains
- **Scope**: Browser environments only (not applicable to Node.js)
- **`localhost` Exception**: Always permitted regardless of domains list
- **Validation Process**:
  - Token contains `domains` array (e.g., `["example.com", "example.org"]`)
  - Current browser hostname must match one of the entries
  - If no match (and not localhost), activation fails with `reason: 'DOMAIN_MISMATCH'`
- **Example**:
  ```typescript
  // Token with domain restriction
  {
    "domains": ["example.com", "myapp.org"],
    // ... other token properties
  }
  
  // On wrong domain
  const result = await QRCodeJs.token(restrictedToken);
  console.log(result.isValid); // false
  console.log(result.reason); // 'DOMAIN_MISMATCH'
  ```

## Configuration

### Setting License URL

- **Purpose**: Configure the endpoint for license key validation
- **Type**: `function(url: string): typeof QRCodeJs`
- **Default**: `/api/license/get-token`
- **Important**: Must be called before `QRCodeJs.license()`
- **Returns**: `QRCodeJs` class for chaining
- **Example**:
  ```typescript
  QRCodeJs.setLicenseUrl('https://my-api.com/licenses/get-token');
  await QRCodeJs.license('YOUR-LICENSE-KEY');
  ```
- **Example** (chaining):
  ```typescript
  await QRCodeJs.setLicenseUrl('/my-api/license/get-token').license('YOUR-LICENSE-KEY');
  ```

### Custom License Fetcher

- **Purpose**: Implement custom token fetching logic
- **Type**: `function(fetcherFn: (licenseKey: string) => Promise<string>): void`
- **Use Cases**: Custom headers, authentication, or request format
- **Example**:
  ```typescript
  QRCodeJs.configureLicenseFetcher(async (key) => {
    const response = await fetch('/my/custom/endpoint', {
      method: 'POST',
      headers: { 'Authorization': 'Bearer ' + getAuthToken() },
      body: JSON.stringify({ licKey: key })
    });
    if (!response.ok) throw new Error('Fetch failed');
    const data = await response.json();
    return data.token;
  });
  ```

## Checking License Status

### Getting License Details

- **Purpose**: Retrieve current license information
- **Type**: `function(): DecodedLicenseToken | null`
- **Returns**: Decoded token object if license is active, otherwise `null`
- **Example**:
  ```typescript
  const licenseDetails = QRCodeJs.getLicenseDetails();
  if (licenseDetails) {
    console.log('License active. Plan:', licenseDetails.plan);
    console.log('Domains:', licenseDetails.domains);
    console.log('Expires:', new Date(licenseDetails.exp * 1000));
  } else {
    console.log('License not active or expired.');
  }
  ```

### Initializing License Manager

- **Purpose**: Ensure license manager loads from storage if available
- **Type**: `function(): Promise<boolean>`
- **Returns**: Promise resolving to boolean indicating license active status
- **Example**:
  ```typescript
  async function checkStoredLicenseOnLoad() {
    const isActive = await QRCodeJs.initializeIfNeeded();
    console.log('License active after init:', isActive);
    const details = QRCodeJs.getLicenseDetails();
    if (details) console.log('Plan:', details.plan);
  }
  ```

## Error Handling

- **Network Errors**: Result in a rejected Promise
- **Validation Errors**: Resolve with `ValidationResult` where `isValid: false`
- **Example**:
  ```typescript
  try {
    const result = await QRCodeJs.license('INVALID-KEY');
    if (!result.isValid) {
      console.error('Activation failed. Reason:', result.reason);
    }
  } catch (error) {
    console.error('Network error:', error);
  }
  ```

## Node.js Usage

### Key Differences from Browser

- **Import**: Use the Node.js entry point
  ```typescript
  import { QRCodeJs } from '@qr-platform/qr-code.js/node';
  ```
- **No Persistence**: License state exists in memory only
- **URL Requirement**: Absolute URL must be set via `setLicenseUrl()`

### Node.js Examples

#### Using `license()` with `async/await`

```typescript
async function activateLicenseNode() {
  try {
    QRCodeJs.setLicenseUrl('https://your-license-api.com/get-token');
    const result = await QRCodeJs.license('YOUR-NODE-LICENSE-KEY');
    if (result.isValid) {
      console.log('Node: License activated!', result.license.plan);
      const qrInstance = new QRCodeJs({
        data: 'https://example.com',
        borderOptions: { inner: true }
      });
    } else {
      console.error('Node: License activation failed.');
    }
  } catch (error) {
    console.error('Node: Error:', error);
  }
}
```

#### Using `token()` with `async/await`

```typescript
async function activateWithTokenNode(token) {
  try {
    const result = await QRCodeJs.token(token);
    if (result.isValid) {
      console.log('Node: License activated!', result.license.plan);
      const qrInstance = new QRCodeJs({
        data: 'https://example.com',
        borderOptions: { outer: true }
      });
    } else {
      console.error('Node: Token invalid or expired.');
    }
  } catch (error) {
    console.error('Node: Error:', error);
  }
}
```

## Backend Implementation Guide

### Endpoint

- **Default Path**: `/api/license/get-token`
- **Method**: `POST`
- **Content-Type**: `application/json`

### Request Format

```json
{
  "licenseKey": "THE_USER_PROVIDED_KEY"
}
```

### Processing Steps

1. Extract and validate `licenseKey`
2. Generate a JWT with this payload:
    ```json
    {
      "sub": "license-12345",
      "client": "acme-corp",
      "plan": "enterprise",
      "email": "admin@acme.com",
      "domains": ["acme.com", "acme.org"],
      "iat": 1712668800,
      "exp": 1744204800
    }
    ```
3. Sign with your private key

### Response Format

- **Success**: Plain text JWT (`Content-Type: text/plain`)
- **Failure**: Error status (e.g., 400) with optional JSON:
    ```json
    { "error": "Invalid license key" }
    ```

### Security Best Practices

- Secure your private key
- Use HTTPS for all license endpoints
- Implement rate limiting
- Validate license keys against your database

## API Reference

### Static Methods

#### `license()`

- **Purpose**: Activate license using a key
- **Type**: `function(licenseKey: string): Promise<ValidationResult>`
- **Returns**: Promise resolving to validation result

#### `token()`

- **Purpose**: Activate license using pre-fetched JWT
- **Type**: `function(jwtToken: string | null): Promise<ValidationResult>`
- **Returns**: Promise resolving to validation result

#### `setLicenseUrl()`

- **Purpose**: Configure the license endpoint URL
- **Type**: `function(url: string): typeof QRCodeJs`
- **Returns**: QRCodeJs class for chaining

#### `configureLicenseFetcher()`

- **Purpose**: Set custom license fetching function
- **Type**: `function(fetcherFn: (licenseKey: string) => Promise<string>): void`

#### `getLicenseDetails()`

- **Purpose**: Get current license information
- **Type**: `function(): DecodedLicenseToken | null`
- **Returns**: Decoded token or null

#### `initializeIfNeeded()`

- **Purpose**: Initialize the license manager if needed (normally handled automatically by `.license()`)
- **Type**: `function(): Promise<boolean>`
- **Returns**: Promise resolving to license status

### Interfaces

#### `ValidationResult`

```typescript
interface ValidationResult {
  isValid: boolean;
  token: string | null;
  license: DecodedLicenseToken | null;
  reason?: LicenseReasonCode;
}
```

#### `DecodedLicenseToken`

```typescript
interface DecodedLicenseToken {
  sub: string;
  client: string;
  plan: string;
  email?: string;
  domains?: string[];
  iat: number;
  exp: number;
}
```

## Troubleshooting and FAQ

### Activation Issues

- **Check network requests**: Examine browser developer tools for API call failures
- **Verify JWT validity**: Use [JWT.io](https://jwt.io/) to inspect token structure
- **Check storage**: Examine `localStorage` (browser) or memory state (Node.js)
- **Check console**: Look for warnings like domain mismatch or expired token
- **Licensed Features Not Working**: Ensure activation precedes instantiation. Check `getLicenseDetails()` for `plan` and `exp`.

### Common Questions

#### Can I use QRCode.js for free without a license?

Yes, QRCode.js can be used for free without a license key. This allows you to create full-featured, styled QR codes without premium features like advanced borders or built-in scan validation. There are no other restrictions in free mode.

#### What happens if I use border features in the free version?

When using border features without a license, the library will automatically add "QR-Platform" branding text in the bottom border of your QR code. This branding cannot be removed or customized in the free version. A premium license removes this restriction, allowing you to create custom border text or remove text entirely.

#### Can I modify or remove the QR-Platform branding in the free version?

No, the QR-Platform branding in the bottom border is automatically added when using border features in the free version and cannot be modified or removed. This is a limitation of the free version. Purchasing a license allows you to remove the branding and fully customize your border text.

#### Do I need to activate the license on every page load?

- **Browser**: No, license persists in `localStorage` until expiration
- **Node.js**: Yes, unless token is managed externally

#### What happens if the license expires?

`getLicenseDetails()` returns `null`; you'll need to renew with `license()` or `token()`.

#### Can I use this offline?

`token()` works offline with a valid JWT; `license()` requires internet connection.

#### How can I check which premium features are enabled?

Check `getLicenseDetails().plan` to determine which features should be available.

#### Why are premium features not working?

Ensure activation was completed before QRCode instances were created. Check for errors in the console or network requests. If using a token, ensure it is valid and not expired. If you are still having issues, please contact us for support.

---

### See Also
- [QRCode.js Documentation](./documentation.md#start)
- [Quick References Guide](./quick-references-guide.md#start)
- [API Reference Guide](./api-reference-guide.md#start)
- [TypeScript Types and Definitions](./typescript-types-definitions.md#start)
- [License Management](./license-management.md#start)
- [Basic Examples](./examples.md#start)
- [Advanced Examples](./advanced-examples.md#start)
