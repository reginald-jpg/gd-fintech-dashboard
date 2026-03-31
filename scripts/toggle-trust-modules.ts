/**
 * NEW FILE — Toggle Trust Layer modules per tenant (requires DB migration + Prisma).
 * Usage: `npx tsx scripts/toggle-trust-modules.ts sandbox LIQUIDITY_REALTIME on`
 */
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const [, , slug, moduleKey, state] = process.argv;
  if (!slug || !moduleKey || !state) {
    console.error("Usage: npx tsx scripts/toggle-trust-modules.ts <tenantSlug> <MODULE_KEY> <on|off>");
    process.exit(1);
  }
  const tenant = await prisma.tenant.findUnique({ where: { slug } });
  if (!tenant) {
    console.error(`Tenant not found: ${slug}`);
    process.exit(1);
  }
  const enabled = state === "on";
  await prisma.tenantTrustModule.upsert({
    where: { tenantId_moduleKey: { tenantId: tenant.id, moduleKey } },
    create: { tenantId: tenant.id, moduleKey, enabled },
    update: { enabled }
  });
  console.log(`Module ${moduleKey} for ${slug} => ${enabled ? "enabled" : "disabled"}`);
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
