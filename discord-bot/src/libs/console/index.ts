import { logError, logMessage, logWarn } from "./console-logger";

console.log = logMessage;
console.error = logError;
console.warn = logWarn;
