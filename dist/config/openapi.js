export const openapiDocument = {
    openapi: "3.0.3",
    info: {
        title: "Fintech API",
        version: "1.0.0"
    },
    servers: [{ url: "/" }],
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
        }
    }
};
