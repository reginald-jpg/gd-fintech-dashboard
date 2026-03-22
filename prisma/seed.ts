import { PrismaClient, UserRole, AccountType, TransactionType, TransactionStatus } from "@prisma/client";
import crypto from "node:crypto";

const prisma = new PrismaClient();

function sha256(input: string) {
  return crypto.createHash("sha256").update(input).digest("hex");
}

async function main() {
  const adminEmail = process.env.SEED_ADMIN_EMAIL ?? "admin@example.com";
  const adminPassword = process.env.SEED_ADMIN_PASSWORD ?? "admin123";
  const userEmail = process.env.SEED_TEST_EMAIL ?? "user@example.com";
  const userPassword = process.env.SEED_TEST_PASSWORD ?? "user123";

  const admin = await prisma.user.upsert({
    where: { email: adminEmail },
    update: {},
    create: {
      email: adminEmail,
      passwordHash: sha256(adminPassword),
      role: UserRole.ADMIN
    }
  });

  const user = await prisma.user.upsert({
    where: { email: userEmail },
    update: {},
    create: {
      email: userEmail,
      passwordHash: sha256(userPassword),
      role: UserRole.USER
    }
  });

  const adminAccount = await prisma.account.upsert({
    where: { id: `${admin.id}-checking` },
    update: {},
    create: {
      id: `${admin.id}-checking`,
      userId: admin.id,
      type: AccountType.CHECKING,
      currency: "USD",
      balance: 10000
    }
  });

  const userAccount = await prisma.account.upsert({
    where: { id: `${user.id}-checking` },
    update: {},
    create: {
      id: `${user.id}-checking`,
      userId: user.id,
      type: AccountType.CHECKING,
      currency: "USD",
      balance: 250
    }
  });

  await prisma.transaction.createMany({
    data: [
      {
        userId: admin.id,
        accountId: adminAccount.id,
        amount: 10000,
        currency: "USD",
        description: "Initial admin funding",
        type: TransactionType.CREDIT,
        status: TransactionStatus.POSTED
      },
      {
        userId: user.id,
        accountId: userAccount.id,
        amount: 250,
        currency: "USD",
        description: "Initial user funding",
        type: TransactionType.CREDIT,
        status: TransactionStatus.POSTED
      }
    ],
    skipDuplicates: true
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });

