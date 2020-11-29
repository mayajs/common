/**
 * Type for function request callback
 */
export type Callback = (...args: any[]) => void;

/**
 * Type of request method
 */
export type RequestMethod = "get" | "post" | "delete" | "options" | "put" | "patch";
