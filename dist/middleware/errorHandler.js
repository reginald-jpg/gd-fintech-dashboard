import { ZodError } from "zod";
export class HttpError extends Error {
    status;
    code;
    constructor(status, message, code) {
        super(message);
        this.status = status;
        this.code = code;
    }
}
export function notFoundHandler(_req, res) {
    res.status(404).json({ error: { message: "Not found" } });
}
export function errorHandler(err, _req, res, _next) {
    if (err instanceof ZodError) {
        return res.status(400).json({
            error: {
                message: "Validation error",
                details: err.issues
            }
        });
    }
    if (err instanceof HttpError) {
        return res.status(err.status).json({
            error: {
                message: err.message,
                code: err.code
            }
        });
    }
    console.error(err);
    return res.status(500).json({ error: { message: "Internal server error" } });
}
