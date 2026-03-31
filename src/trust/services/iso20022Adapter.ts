/**
 * NEW FILE — ISO 20022 → internal verification schema (interbank). Production: XSD-validated MX messages.
 */
import { z } from "zod";

export const Iso20022VerifySchema = z.object({
  messageType: z.enum(["pacs.008", "pain.001", "camt.053"]),
  instructionId: z.string().min(1),
  debtorAgentBic: z.string().optional(),
  creditorAgentBic: z.string().optional(),
  amount: z.number().positive(),
  currency: z.string().length(3),
  endToEndId: z.string().optional()
});

export type Iso20022VerifyInput = z.infer<typeof Iso20022VerifySchema>;

export interface NormalizedInterbankInstruction {
  network: "ISO20022";
  messageType: string;
  instructionId: string;
  amount: number;
  currency: string;
  corridorKey: string;
}

export function normalizeIso20022(input: Iso20022VerifyInput): NormalizedInterbankInstruction {
  const corridorKey = [input.debtorAgentBic ?? "UNK", input.creditorAgentBic ?? "UNK"].join(">");
  return {
    network: "ISO20022",
    messageType: input.messageType,
    instructionId: input.instructionId,
    amount: input.amount,
    currency: input.currency,
    corridorKey
  };
}
