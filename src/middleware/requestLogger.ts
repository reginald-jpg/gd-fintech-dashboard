import pinoHttpImport, { type HttpLogger, type Options } from "pino-http";

type PinoHttpFactory = (opts?: Options) => HttpLogger;
const pinoHttp = pinoHttpImport as unknown as PinoHttpFactory;

export const requestLogger = pinoHttp({
  level: process.env.LOG_LEVEL ?? (process.env.NODE_ENV === "production" ? "info" : "debug"),
  redact: {
    paths: ["req.headers.authorization", "req.headers.cookie"],
    remove: true
  }
});

