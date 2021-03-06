/** Log level - Each level enables itself and all level(s) above except none */
export enum LogLevel {
  critical = 0,
  error,
  warn,
  info,
  debug,
  none
}

/**
 * Log level name - order is important
 */
export const LogNames = ['CRITICAL', 'ERROR', 'WARN', 'INFO', 'DEBUG'];

/**
 * Log level colors - order is important
 */
export const LogColors = ['red', 'OrangeRed ', 'orange', 'teal', 'SlateGrey'];

/**
 * An base class that handles logging service
 */
export abstract class BaseLogger {
  protected isColorLog = true;

  constructor(protected appLogLevel: LogLevel = LogLevel.none) {}

  /**
   * Handles mission critical logs
   * @param message logging message
   * @param extras extra messages
   */
  critical(message, ...extras: any[]) {
    this.log(LogLevel.critical, message, extras);
  }

  /**
   * Handles system error logs
   * @param message logging message
   * @param extras extra messages
   */
  error(message, ...extras: any[]) {
    this.log(LogLevel.error, message, extras);
  }

  /**
   * Handles warning logs
   * @param message logging message
   * @param extras extra messages
   */
  warn(message, ...extras: any[]) {
    this.log(LogLevel.warn, message, extras);
  }

  /**
   * Handles info logs
   * @param message logging message
   * @param extras extra messages
   */
  info(message, ...extras: any[]) {
    this.log(LogLevel.info, message, extras);
  }

  /**
   * Handles debugging logs
   * @param message logging message
   * @param extras extra messages
   */
  debug(message, ...extras: any[]) {
    this.log(LogLevel.debug, message, extras);
  }

  /**
   * Returns current time in ISO format (2018-03-04T22:46:09.346Z)
   */
  private get time() {
    return new Date().toISOString();
  }

  /**
   * Handles the platform logging
   * @param level logging level
   * @param message logging message
   * @param extras extra message
   */
  private log(level: LogLevel, message: any, extras: any[] = []) {
    const logOff = !message || [level, this.appLogLevel].includes(LogLevel.none);
    if (!logOff) {
      if (this.isColorLog) {
        const color = LogColors[level];
        console.log(`%c${this.time} [${LogNames[level]}]`, `color:${color}`, message, ...extras);
      } else {
        console.log(`%c${this.time} [${LogNames[level]}]`, message, ...extras);
      }
    }
  }
}
