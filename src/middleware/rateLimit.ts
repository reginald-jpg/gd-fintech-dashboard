import rateLimit from "express-rate-limit";

export const apiRateLimit = rateLimit({
  windowMs: Number(process.env.RATE_LIMIT_WINDOW_MS ?? 60_000),
  limit: Number(process.env.RATE_LIMIT_MAX ?? 120),
  standardHeaders: "draft-7",
  legacyHeaders: false
});

