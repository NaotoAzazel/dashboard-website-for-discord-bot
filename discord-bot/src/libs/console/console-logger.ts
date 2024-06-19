import chalk from "chalk";

const originalLog = console.log;
const originalError = console.error;
const originalWarn = console.warn;

function getFormattedTime(): string {
  const localTime = new Date();
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

const initialText = chalk.green(
  `[BOT] ${process.pid}   - ${getFormattedTime()}     `,
);

export function logError(...args: unknown[]) {
  const errorText = chalk.red("ERROR ");
  const errorMessage = chalk.green(args.map((arg) => String(arg)).join(" "));
  const callerInfo = chalk.yellow(`[${getCallerInfo()}] `);

  originalError(initialText + errorText + callerInfo + errorMessage);
}

export function logMessage(...args: unknown[]) {
  const logText = chalk.blue("LOG ");
  const logMessage = chalk.green(args.map((arg) => String(arg)).join(" "));
  const callerInfo = chalk.yellow(`[${getCallerInfo()}] `);

  originalLog(initialText + logText + callerInfo + logMessage);
}

export function logWarn(...args: unknown[]) {
  const warnText = chalk.red("WARN ");
  const warnMessage = chalk.green(args.map((arg) => String(arg)).join(" "));
  const callerInfo = chalk.yellow(`[${getCallerInfo()}] `);

  originalWarn(initialText + warnText + callerInfo + warnMessage);
}
