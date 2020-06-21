const chalk = require("chalk")

export const LOG_LEVELS = {
  DEFAULT: "white",
  WARN: "yellow",
  ERROR: "red",
  SUCCESS: "green",
  NOTICE: "gray",
}

export function log(input: string, level = this.LOG_LEVELS.DEFAULT): void {
  console.log(chalk[level](input))
}
