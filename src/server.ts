/**
 * REFACTORED FILE — Single HTTP entrypoint: use createApp() so Trust Layer + legacy /api/* share one process.
 */
import "dotenv/config";
import { createApp } from "./app.js";

const PORT = Number(process.env.PORT ?? 8080);
const app = createApp();

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`GD Fintech API listening on :${PORT}`);
  // eslint-disable-next-line no-console
  console.log(`Trust sandbox mode: ${process.env.TRUST_SANDBOX_MODE !== "false" ? "ON" : "OFF"}`);
});
