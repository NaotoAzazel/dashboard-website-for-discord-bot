export function logError(message: string, error: unknown) {
  const stack = new Error().stack || "";
  const stackArray = stack.split("\n");
  const callerInfo = stackArray[2] || "";

  const isDevelopmentMode = process.env.NODE_ENV === "development";

  console.error(
    isDevelopmentMode
      ? `[Error] ${callerInfo.trim()} - ${message}`
      : `[Error] ${message}`,
    error,
  );
}
