import pinoHttpImport from "pino-http";
const pinoHttp = pinoHttpImport;
export const requestLogger = pinoHttp({
    level: process.env.LOG_LEVEL ?? (process.env.NODE_ENV === "production" ? "info" : "debug"),
    redact: {
        paths: ["req.headers.authorization", "req.headers.cookie"],
        remove: true
    }
});
