export function logError(message: string, error: unknown) {
  const stack = new Error().stack || "";
  const stackArray = stack.split("\n");
  const callerInfo = stackArray[2] || "";

  console.error(`[Error] ${callerInfo.trim()} - ${message}`, error);
}
