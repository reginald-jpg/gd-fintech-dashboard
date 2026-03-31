// src/config.ts
export let MOCK_MODE = process.env.MOCK_MODE === "true";

// Allow runtime toggling
export function toggleMockMode() {
  MOCK_MODE = !MOCK_MODE;
  return MOCK_MODE;
}
