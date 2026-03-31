export const openapiDocument = {
  openapi: "3.0.3",
  info: {
    title: "Fintech API",
    version: "1.0.0"
  },
  servers: [{ url: "http://localhost:8080" }],
  paths: {
    "/health": {
      get: {
        summary: "Health check",
        responses: {
          "200": {
            description: "OK"
          }
        }
      }
    },
    "/api/v1/users": {
      get: {
        summary: "List users",
        responses: {
          "200": {
            description: "Users"
          }
        }
      },
      post: {
        summary: "Create user",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  email: { type: "string", format: "email" },
                  password: { type: "string", minLength: 6 }
                },
                required: ["email", "password"]
              }
            }
          }
        },
        responses: {
          "201": { description: "Created" },
          "400": { description: "Validation error" }
        }
      }
    },
    "/api/v1/sectors": {
      get: {
        summary: "List fintech sectors",
        responses: {
          "200": {
            description: "Sectors list"
          }
        }
      }
    },
    "/api/v1/sectors/{id}/details": {
      get: {
        summary: "Get sector details",
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: { type: "string" }
          }
        ],
        responses: {
          "200": { description: "Sector details" },
          "404": { description: "Not found" }
        }
      }
    },
    "/api/v1/sectors/{id}/simulate": {
      post: {
        summary: "Simulate sector functionality",
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: { type: "string" }
          }
        ],
        responses: {
          "200": { description: "Simulation result" },
          "404": { description: "Not found" }
        }
      }
    },
    "/api/v1/passport/issue": {
      post: {
        summary: "Issue liquidity passport",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  userId: { type: "string" },
                  metadata: { type: "object" }
                },
                required: ["userId"]
              },
              example: {
                userId: "demo-user-123",
                metadata: { tier: "VIP", funds: 150000 }
              }
            }
          }
        },
        responses: {
          "201": {
            description: "Issued",
            content: {
              "application/json": {
                example: {
                  passport: {
                    passportId: "VIP-20250324-001",
                    holder: "Demo User",
                    liquidityScore: 92,
                    verifiedFunds: 150000,
                    riskLevel: "Low",
                    status: "Active",
                    issuedAt: "2025-03-24T10:00:00.000Z",
                    expiresAt: "2025-09-20T10:00:00.000Z",
                    auditTrail: [
                      { event: "Passport Issued", timestamp: "2025-03-24T10:00:00.000Z" }
                    ]
                  }
                }
              }
            }
          },
          "400": { description: "Validation error" }
        }
      }
    },
    "/api/v1/passport/verify": {
      post: {
        summary: "Verify passport",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: { id: { type: "string" } },
                required: ["id"]
              },
              example: { id: "VIP-20250324-001" }
            }
          }
        },
        responses: {
          "200": {
            description: "Verification result",
            content: {
              "application/json": {
                example: {
                  verification: {
                    passportId: "VIP-20250324-001",
                    verified: true,
                    liquidityScore: 92,
                    verifiedFunds: 150000,
                    riskLevel: "Low",
                    lastVerified: "2025-03-24T10:00:00.000Z",
                    verificationDetails: {
                      identityCheck: "Passed",
                      fundVerification: "Passed",
                      riskAssessment: "Low Risk"
                    }
                  }
                }
              }
            }
          }
        }
      }
    },
    "/api/v1/passport/revoke": {
      post: {
        summary: "Revoke passport",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: { id: { type: "string" } },
                required: ["id"]
              },
              example: { id: "VIP-20250324-001" }
            }
          }
        },
        responses: {
          "200": {
            description: "Revoked",
            content: {
              "application/json": {
                example: {
                  revocation: {
                    passportId: "VIP-20250324-001",
                    revokedAt: "2025-03-24T10:00:00.000Z",
                    reason: "Demo Revocation",
                    auditTrail: [
                      { event: "Passport Revoked", timestamp: "2025-03-24T10:00:00.000Z", reason: "Demo Revocation" }
                    ]
                  }
                }
              }
            }
          },
          "404": { description: "Not found" }
        }
      }
    },
    "/api/v1/passport/monitor/{passportId}": {
      get: {
        summary: "Monitor passport",
        parameters: [
          {
            name: "passportId",
            in: "path",
            required: true,
            schema: { type: "string" },
            example: "VIP-20250324-001"
          }
        ],
        responses: {
          "200": {
            description: "Monitoring data",
            content: {
              "application/json": {
                example: {
                  monitoring: {
                    passportId: "VIP-20250324-001",
                    status: "Active",
                    liquidityScore: 92,
                    lastActivity: "2025-03-24T10:00:00.000Z",
                    alerts: [],
                    metrics: {
                      transactionVolume: 250000,
                      riskScore: 15,
                      complianceStatus: "Compliant"
                    }
                  }
                }
              }
            }
          },
          "404": { description: "Not found" }
        }
      }
    },
    "/api/v1/passport/{id}": {
      get: {
        summary: "Get passport by ID",
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: { type: "string" }
          }
        ],
        responses: {
          "200": { description: "Passport" },
          "404": { description: "Not found" }
        }
      }
    },
    "/api/v1/passports": {
      get: {
        summary: "List all passports",
        responses: {
          "200": { description: "Passports list" }
        }
      }
    },
    "/api/v1/verifyLiquidity": {
      post: {
        summary: "Trust Layer — real-time liquidity verification (non-custodial)",
        parameters: [
          { name: "x-tenant-id", in: "header", required: true, schema: { type: "string" } },
          { name: "x-trust-region", in: "header", schema: { type: "string", enum: ["US", "EU", "APAC", "LATAM", "HIGH_RISK"] } }
        ],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                required: ["accountRef", "requestedAmount", "currency"],
                properties: {
                  accountRef: { type: "string" },
                  requestedAmount: { type: "number" },
                  currency: { type: "string" },
                  counterpartyRef: { type: "string" }
                }
              }
            }
          }
        },
        responses: { "200": { description: "Verification outcome" } }
      }
    },
    "/api/v1/proofOfFunds": {
      post: {
        summary: "Trust Layer — proof-of-funds certificate",
        responses: { "200": { description: "Certificate + attestation" } }
      }
    },
    "/api/v1/liquidityScore": {
      get: {
        summary: "Trust Layer — liquidity / trust score",
        parameters: [{ name: "accountRef", in: "query", required: true, schema: { type: "string" } }],
        responses: { "200": { description: "Score" } }
      }
    },
    "/api/v1/checkoutVerify": {
      post: { summary: "Trust Layer — merchant checkout verification", responses: { "200": { description: "OK" } } }
    },
    "/api/v1/auditLog": {
      get: {
        summary: "Trust Layer — tenant audit log (memory in sandbox)",
        responses: { "200": { description: "Entries" } }
      }
    },
    "/api/v1/rwa/verify": {
      post: { summary: "Trust Layer — RWA integrity", responses: { "200": { description: "OK" } } }
    },
    "/api/v1/atm/verify": {
      post: { summary: "Trust Layer — ISO 8583 ATM/POS normalize + policy", responses: { "200": { description: "OK" } } }
    },
    "/api/v1/interbank/verify": {
      post: { summary: "Trust Layer — ISO 20022 instruction verify", responses: { "200": { description: "OK" } } }
    },
    "/api/v1/insurance/claimVerify": {
      post: { summary: "Trust Layer — insurance claim verification", responses: { "200": { description: "OK" } } }
    },
    "/api/v1/lottery/payoutVerify": {
      post: { summary: "Trust Layer — lottery payout verification", responses: { "200": { description: "OK" } } }
    },
    "/api/v1/flows/e2e-liquidity": {
      post: {
        summary: "Trust Layer — demo E2E flow (liquidity + PoF + optional insurance/lottery)",
        responses: { "200": { description: "Step trace" } }
      }
    }
  }
} as const;

