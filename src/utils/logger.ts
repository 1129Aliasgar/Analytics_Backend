import { injectable } from "inversify";

@injectable()
export class Logger {
  info(message: string, meta: object = {}) {
    console.log(`[INFO] ${message}`, meta);
  }

  error(message: string, meta: object = {}) {
    console.error(`[ERROR] ${message}`, meta);
  }

  warn(message: string, meta: object = {}) {
    console.warn(`[WARN] ${message}`, meta);
  }
}

export default Logger;
