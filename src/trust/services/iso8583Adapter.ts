/**
 * NEW FILE — ISO 8583 → internal verification schema (ATM/POS). Production: native parser + BIN/risk DB.
 */
import { z } from "zod";

/** Subset of fields sufficient for non-custodial liquidity / velocity checks. */
export const Iso8583VerifySchema = z.object({
  mti: z.string().regex(/^\d{4}$/),
  panMasked: z.string().min(4),
  amountMinor: z.number().int().nonnegative(),
  currencyCode: z.string().length(3),
  stan: z.string().min(1),
  retrievalRef: z.string().optional(),
  terminalId: z.string().optional(),
  merchantId: z.string().optional()
});

export type Iso8583VerifyInput = z.infer<typeof Iso8583VerifySchema>;

export interface NormalizedAuthRequest {
  network: "ISO8583";
  amount: number;
  currency: string;
  instrumentRef: string;
  stan: string;
  merchantRef?: string;
  terminalRef?: string;
}

export function normalizeIso8583(input: Iso8583VerifyInput): NormalizedAuthRequest {
  return {
    network: "ISO8583",
    amount: input.amountMinor / 100,
    currency: input.currencyCode,
    instrumentRef: input.panMasked,
    stan: input.stan,
    merchantRef: input.merchantId,
    terminalRef: input.terminalId
  };
}
