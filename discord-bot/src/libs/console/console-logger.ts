import chalk from "chalk";

const originalLog = console.log;
const originalError = console.error;
const originalWarn = console.warn;

function getFormattedTime(localTime: Date): string {
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  }).format(localTime);
}

function getCallerInfo(): string {
  const stack = new Error().stack || "";
  const stackArray = stack.split("\n");

  const callerInfo = stackArray[3] || "";
  const callerMatch = callerInfo.match(/at (\S+)/);
  return callerMatch ? callerMatch[1] : "unknown";
}

const initialText = (localTime: Date) =>
  chalk.green(`[BOT] ${process.pid}   - ${getFormattedTime(localTime)}     `);

export function logError(...args: unknown[]) {
  const errorText = chalk.red("ERROR ");
  const errorMessage = chalk.green(args.map((arg) => String(arg)).join(" "));
  const callerInfo = chalk.yellow(`[${getCallerInfo()}] `);

  const localTime = new Date();

  originalError(initialText(localTime) + errorText + callerInfo + errorMessage);
}

export function logMessage(...args: unknown[]) {
  const logText = chalk.blue("LOG ");
  const logMessage = chalk.green(args.map((arg) => String(arg)).join(" "));
  const callerInfo = chalk.yellow(`[${getCallerInfo()}] `);

  const localTime = new Date();

  originalLog(initialText(localTime) + logText + callerInfo + logMessage);
}

export function logWarn(...args: unknown[]) {
  const warnText = chalk.red("WARN ");
  const warnMessage = chalk.green(args.map((arg) => String(arg)).join(" "));
  const callerInfo = chalk.yellow(`[${getCallerInfo()}] `);

  const localTime = new Date();

  originalWarn(initialText(localTime) + warnText + callerInfo + warnMessage);
}
