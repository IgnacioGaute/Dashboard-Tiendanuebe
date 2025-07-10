/**
 * List of routes that are publicly accessible.
 * These routes can be accessed by all users without authentication.
 * @type {string[]}
 */
export const publicRoutes = [
  '/products',
  '/orders',
  '/api/webhooks/product',
  '/api/webhooks/order',
  '/api/webhooks/category',

];

/**
 * List of routes related to authentication.
 * These routes handle user login, registration, and password management.
 * @type {string[]}
 */

/**
 * Prefix for API routes that require authentication.
 * All authenticated API routes should start with this prefix.
 * @type {string}
 */

/**
 * List of public API routes that do not require authentication.
 * @type {string[]}
 */
export const publicApiRoutes = [];

/**
 * The default path to redirect users after they successfully log in.
 * @type {string}
 */
export const DEFAULT_LOGIN_REDIRECT = '/products';
