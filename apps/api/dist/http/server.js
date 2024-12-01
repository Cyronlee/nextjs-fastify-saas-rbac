"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// src/http/server.ts
var import_cors = __toESM(require("@fastify/cors"));
var import_jwt = __toESM(require("@fastify/jwt"));
var import_swagger = __toESM(require("@fastify/swagger"));
var import_swagger_ui = __toESM(require("@fastify/swagger-ui"));

// ../../node_modules/.pnpm/@t3-oss+env-core@0.11.1_typescript@5.6.3_zod@3.23.8/node_modules/@t3-oss/env-core/dist/index.js
var import_zod = require("zod");
function createEnv(opts) {
  const runtimeEnv = opts.runtimeEnvStrict ?? opts.runtimeEnv ?? process.env;
  const emptyStringAsUndefined = opts.emptyStringAsUndefined ?? false;
  if (emptyStringAsUndefined) {
    for (const [key, value] of Object.entries(runtimeEnv)) {
      if (value === "") {
        delete runtimeEnv[key];
      }
    }
  }
  const skip = !!opts.skipValidation;
  if (skip) return runtimeEnv;
  const _client = typeof opts.client === "object" ? opts.client : {};
  const _server = typeof opts.server === "object" ? opts.server : {};
  const _shared = typeof opts.shared === "object" ? opts.shared : {};
  const client = (0, import_zod.object)(_client);
  const server = (0, import_zod.object)(_server);
  const shared = (0, import_zod.object)(_shared);
  const isServer = opts.isServer ?? (typeof window === "undefined" || "Deno" in window);
  const allClient = client.merge(shared);
  const allServer = server.merge(shared).merge(client);
  const parsed = isServer ? allServer.safeParse(runtimeEnv) : allClient.safeParse(runtimeEnv);
  const onValidationError = opts.onValidationError ?? ((error) => {
    console.error("\u274C Invalid environment variables:", error.flatten().fieldErrors);
    throw new Error("Invalid environment variables");
  });
  const onInvalidAccess = opts.onInvalidAccess ?? ((_variable) => {
    throw new Error("\u274C Attempted to access a server-side environment variable on the client");
  });
  if (parsed.success === false) {
    return onValidationError(parsed.error);
  }
  const isServerAccess = (prop) => {
    if (!opts.clientPrefix) return true;
    return !prop.startsWith(opts.clientPrefix) && !(prop in shared.shape);
  };
  const isValidServerAccess = (prop) => {
    return isServer || !isServerAccess(prop);
  };
  const ignoreProp = (prop) => {
    return prop === "__esModule" || prop === "$$typeof";
  };
  const extendedObj = (opts.extends ?? []).reduce((acc, curr) => {
    return Object.assign(acc, curr);
  }, {});
  const fullObj = Object.assign(parsed.data, extendedObj);
  const env2 = new Proxy(fullObj, {
    get(target, prop) {
      if (typeof prop !== "string") return void 0;
      if (ignoreProp(prop)) return void 0;
      if (!isValidServerAccess(prop)) return onInvalidAccess(prop);
      return Reflect.get(target, prop);
    }
  });
  return env2;
}

// ../../node_modules/.pnpm/@t3-oss+env-nextjs@0.11.1_typescript@5.6.3_zod@3.23.8/node_modules/@t3-oss/env-nextjs/dist/index.js
var CLIENT_PREFIX = "NEXT_PUBLIC_";
function createEnv2(opts) {
  const client = typeof opts.client === "object" ? opts.client : {};
  const server = typeof opts.server === "object" ? opts.server : {};
  const shared = opts.shared;
  const runtimeEnv = opts.runtimeEnv ? opts.runtimeEnv : {
    ...process.env,
    ...opts.experimental__runtimeEnv
  };
  return createEnv({
    ...opts,
    shared,
    client,
    server,
    clientPrefix: CLIENT_PREFIX,
    runtimeEnv
  });
}

// ../../packages/env/index.ts
var import_zod2 = require("zod");
var env = createEnv2({
  server: {
    DATABASE_URL: import_zod2.z.string(),
    PORT: import_zod2.z.coerce.number().default(3333),
    JWT_SECRET_KEY: import_zod2.z.string(),
    JWT_PUBLIC_KEY: import_zod2.z.string(),
    GITHUB_OAUTH_CLIENT_ID: import_zod2.z.string(),
    GITHUB_OAUTH_CLIENT_SECRET: import_zod2.z.string(),
    GITHUB_OAUTH_CLIENT_REDIRECT_URI: import_zod2.z.string().url(),
    GITHUB_OAUTH_CLIENT_SCOPE: import_zod2.z.string().default("user"),
    GOOGLE_OAUTH_CLIENT_ID: import_zod2.z.string(),
    GOOGLE_OAUTH_CLIENT_SECRET: import_zod2.z.string(),
    GOOGLE_OAUTH_CLIENT_REDIRECT_URI: import_zod2.z.string().url(),
    GOOGLE_OAUTH_CLIENT_RESPONSE_TYPE: import_zod2.z.string().default("code"),
    GOOGLE_OAUTH_CLIENT_SCOPE: import_zod2.z.string().default("https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile"),
    MAIL_SMTP_HOST: import_zod2.z.string().default("smtp.gmail.com"),
    MAIL_SMTP_PORT: import_zod2.z.coerce.number().default(465),
    MAIL_SMTP_EMAIL: import_zod2.z.string(),
    MAIL_SMTP_PASSWORD: import_zod2.z.string(),
    CLOUDFLARE_ACCOUNT_ID: import_zod2.z.string(),
    CLOUDFLARE_ENDPOINT: import_zod2.z.string(),
    CLOUDFLARE_BUCKET: import_zod2.z.string(),
    CLOUDFLARE_REGION: import_zod2.z.string().default("auto"),
    CLOUDFLARE_ACCESS_KEY: import_zod2.z.string(),
    CLOUDFLARE_SECRET_KEY: import_zod2.z.string()
  },
  client: {},
  shared: {
    NEXT_PUBLIC_URL: import_zod2.z.string().url(),
    NEXT_PUBLIC_API_URL: import_zod2.z.string().url(),
    NEXT_PUBLIC_CLOUDFLARE_URL: import_zod2.z.string()
  },
  runtimeEnv: {
    DATABASE_URL: process.env.DATABASE_URL,
    PORT: process.env.PORT,
    NEXT_PUBLIC_URL: process.env.NEXT_PUBLIC_URL,
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
    JWT_SECRET_KEY: process.env.JWT_SECRET_KEY,
    JWT_PUBLIC_KEY: process.env.JWT_PUBLIC_KEY,
    GITHUB_OAUTH_CLIENT_ID: process.env.GITHUB_OAUTH_CLIENT_ID,
    GITHUB_OAUTH_CLIENT_SECRET: process.env.GITHUB_OAUTH_CLIENT_SECRET,
    GITHUB_OAUTH_CLIENT_REDIRECT_URI: process.env.GITHUB_OAUTH_CLIENT_REDIRECT_URI,
    GITHUB_OAUTH_CLIENT_SCOPE: process.env.GITHUB_OAUTH_CLIENT_SCOPE,
    GOOGLE_OAUTH_CLIENT_ID: process.env.GOOGLE_OAUTH_CLIENT_ID,
    GOOGLE_OAUTH_CLIENT_SECRET: process.env.GOOGLE_OAUTH_CLIENT_SECRET,
    GOOGLE_OAUTH_CLIENT_REDIRECT_URI: process.env.GOOGLE_OAUTH_CLIENT_REDIRECT_URI,
    GOOGLE_OAUTH_CLIENT_RESPONSE_TYPE: process.env.GOOGLE_OAUTH_CLIENT_RESPONSE_TYPE,
    GOOGLE_OAUTH_CLIENT_SCOPE: process.env.GOOGLE_OAUTH_CLIENT_SCOPE,
    MAIL_SMTP_HOST: process.env.MAIL_SMTP_HOST,
    MAIL_SMTP_PORT: process.env.MAIL_SMTP_PORT,
    MAIL_SMTP_EMAIL: process.env.MAIL_SMTP_EMAIL,
    MAIL_SMTP_PASSWORD: process.env.MAIL_SMTP_PASSWORD,
    CLOUDFLARE_ACCOUNT_ID: process.env.CLOUDFLARE_ACCOUNT_ID,
    CLOUDFLARE_ENDPOINT: process.env.CLOUDFLARE_ENDPOINT,
    CLOUDFLARE_BUCKET: process.env.CLOUDFLARE_BUCKET,
    CLOUDFLARE_REGION: process.env.CLOUDFLARE_REGION,
    CLOUDFLARE_ACCESS_KEY: process.env.CLOUDFLARE_ACCESS_KEY,
    CLOUDFLARE_SECRET_KEY: process.env.CLOUDFLARE_SECRET_KEY,
    NEXT_PUBLIC_CLOUDFLARE_URL: process.env.NEXT_PUBLIC_CLOUDFLARE_URL
  },
  emptyStringAsUndefined: true
});

// src/http/server.ts
var import_fastify = require("fastify");
var import_fastify_type_provider_zod2 = require("fastify-type-provider-zod");

// src/http/error-handler.ts
var import_fastify_type_provider_zod = require("fastify-type-provider-zod");

// src/errors/messages.ts
var errors = {
  api: {
    VALIDATION_ERROR: "Validation error",
    SERVER_ERROR: "Internal server error"
  },
  services: {
    SEND_EMAIL: "An error occurred while trying to send the e-mail",
    GITHUB_ALREADY_CONNECTED: "You already have a GitHub account connected",
    GITHUB_ALREADY_CONNECTED_SOMEONE_ELSE: "This Github account is already connected with another account",
    GOOGLE_ALREADY_CONNECTED: "You already have a Google account connected",
    GOOGLE_ALREADY_CONNECTED_SOMEONE_ELSE: "This Google account is already connected with another account"
  },
  user: {
    ALREADY_EXISTS: "An user with same e-mail already exists",
    NOT_FOUND: "User not found",
    ACCOUNT_NOT_FOUND: "Account not found",
    EMAIL_VALIDATION_NOT_FOUND: "E-mail change validation not found",
    EMAIL_VALIDATION_EXPIRED: "E-mail change validation does not exists or already expired",
    EMAIL_VALIDATION_INVALID: "Invalid validation code"
  },
  auth: {
    NOT_PASSWORD_FOUND: "User does not have a password, use social sign-in",
    INVALID_CREDENTIALS: "Invalid credentials",
    INVALID_TOKEN: "Invalid authentication token",
    INVALID_EMAIL_TOKEN: "The token provied is not valid. Note: The code is valid for 5 minutes",
    INVALID_PASSWORD_TOKEN: "Unable to reset password. Ensure your recovery code is valid and try again. Note: The code is valid for 5 minutes",
    LAST_METHOD_AVAILABLE: "This service is the only access method available. Set a password or connect with another provider first",
    GITHUB_EMAIL_NOT_FOUND: "Your GitHub account does not have an e-mail to authenticate",
    PASSWORD_NUMBER: "Enter one number.",
    PASSWORD_UPPER: "Enter one upper case letter.",
    PASSWORD_LOWER: "Enter one lower case letter.",
    PASSWORD_SPECIAL: "Enter one special character.",
    PASSWORD_LENGTH: "Enter at least 6 characters."
  },
  organizations: {
    entity: {
      NOT_FOUND: "Organization not found",
      NOT_MEMBER: "The user is not a member of this organization",
      ALREADY_EXISTS: "There is another organization using the same name. Choose a different one",
      CANNOT_SHUTDOWN: "You are not allowed to shutdown this organization",
      CANNOT_TRANSFER: "You are not allowed to transfer ownership of this organization",
      CANNOT_UPDATE: "You are not allowed to update this organization",
      CANNOT_LEAVE: "You are the owner of this organization, to leave it you must transfer the ownership first"
    },
    billing: {
      CANNOT_LIST: "You are not allowed to get billing details from this organization"
    },
    domain: {
      ALREADY_EXISTS: "Another organization with same domain already exists",
      CHECK_DNS: "Error checking DNS information",
      TXT_NOT_FOUND: "A valid TXT record was not found in the DNS records",
      TXT_INVALID: "A valid TXT record was found, but does not match in the DNS records. Check your DNS values."
    },
    members: {
      CANNOT_ACCESS: "You are not a member of this organization",
      CANNOT_LIST: "You are not allowed to list organization members",
      CANNOT_DELETE: "You are not allowed to remove this organization member",
      CANNOT_UPDATE: "You are not allowed to update this organization member"
    },
    invites: {
      NOT_FOUND: "Invite not found or expired",
      NOT_ALLOWED: "This invite belongs to another user",
      AUTOJOIN_DOMAIN: "Users with {domain} domain will join your organization automatically on sign in",
      ALREADY_EXISTS: "Another invite with same e-mail already exists",
      ALREADY_MEMBER: "A member with this e-mail already belongs to your organization",
      CANNOT_SEND: "You are not allowed to create a new invite",
      CANNOT_LIST: "You are not allowed to get organization invites",
      CANNOT_REVOKE: "You are not allowed to revoke an invite"
    }
  },
  projects: {
    NOT_FOUND: "Project not found",
    ALREADY_EXISTS: "There is another project in this organization using the same project name. Choose a different one",
    CANNOT_LIST: "You are not allowed to list projects",
    CANNOT_GET: "You are not allowed to get a project",
    CANNOT_CREATE: "You are not allowed to create a new project",
    CANNOT_UPDATE: "You are not allowed to update this project",
    CANNOT_DELETE: "You are not allowed to remove this project"
  },
  files: {
    NOT_FOUND: "Select a file to update",
    MAX_SIZE: "Your avatar must have less than 2mb",
    PROCESSING: "An unexpected error occurred while processing your file",
    FORMAT: "The file selected is not a valid image",
    UPLOAD: "An unexpected error occurred during file upload",
    DELETE: "An unexpected error occurred during file removal"
  }
};

// src/http/routes/_errors/bad-request-error.ts
var BadRequestError = class extends Error {
};

// src/http/routes/_errors/unauthorized-error.ts
var UnauthorizedError = class extends Error {
  constructor(message) {
    super(message ?? "Unauthorized.");
  }
};

// src/http/error-handler.ts
var errorHandler = (error, _4, reply) => {
  if ((0, import_fastify_type_provider_zod.hasZodFastifySchemaValidationErrors)(error)) {
    return reply.status(400).send({
      message: errors.api.VALIDATION_ERROR,
      errors: error.validation
    });
  }
  if (error instanceof BadRequestError) {
    return reply.status(400).send({
      message: error.message
    });
  }
  if (error instanceof UnauthorizedError) {
    return reply.status(401).send({
      message: error.message
    });
  }
  console.error(error);
  return reply.status(500).send({
    message: errors.api.SERVER_ERROR
  });
};

// src/http/middlewares/auth.ts
var import_fastify_plugin = __toESM(require("fastify-plugin"));

// src/lib/prisma.ts
var import_client = require("@prisma/client");
var prisma = new import_client.PrismaClient();

// src/http/middlewares/auth.ts
var auth = (0, import_fastify_plugin.default)(async (app2) => {
  app2.addHook("preHandler", async (request) => {
    request.getCurrentUserId = async () => {
      try {
        const { sub } = await request.jwtVerify();
        return sub;
      } catch (error) {
        throw new UnauthorizedError(errors.auth.INVALID_TOKEN);
      }
    };
    request.getCurrentUserMembership = async (slug) => {
      const userId = await request.getCurrentUserId();
      const member = await prisma.member.findFirst({
        where: {
          userId,
          organization: {
            slug
          }
        },
        include: {
          organization: true
        }
      });
      if (!member) {
        throw new UnauthorizedError(errors.organizations.members.CANNOT_ACCESS);
      }
      const { organization, ...membership } = member;
      return {
        organization,
        membership
      };
    };
  });
});

// src/http/routes/account/cancel-email-change.ts
async function deleteEmailChangeToken(app2) {
  app2.withTypeProvider().register(auth).delete(
    "/users/email",
    {
      schema: {
        tags: ["Account"],
        summary: "Delete an open validation change to user e-mail.",
        security: [{ bearerAuth: [] }]
      }
    },
    async (request, reply) => {
      const userId = await request.getCurrentUserId();
      const token = await prisma.token.deleteMany({
        where: {
          userId,
          type: "EMAIL_CHANGE_VALIDATION"
        }
      });
      if (!token) {
        throw new BadRequestError(errors.user.EMAIL_VALIDATION_EXPIRED);
      }
      return reply.status(204).send({
        token
      });
    }
  );
}

// src/http/routes/account/check-email-change.ts
var import_zod4 = require("zod");

// src/schemas/tokens-schema.ts
var import_zod3 = __toESM(require("zod"));
var tokensSchema = import_zod3.default.enum([
  "PASSWORD_RECOVER",
  "EMAIL_VALIDATION",
  "EMAIL_CHANGE_VALIDATION"
]);

// src/http/routes/account/check-email-change.ts
async function checkEmailChange(app2) {
  app2.withTypeProvider().register(auth).get(
    "/users/email",
    {
      schema: {
        tags: ["Account"],
        summary: "Check if there is an open validation change to user e-mail.",
        security: [{ bearerAuth: [] }],
        response: {
          200: import_zod4.z.object({
            token: import_zod4.z.object({
              userId: import_zod4.z.string().uuid(),
              type: tokensSchema,
              payload: import_zod4.z.string().email().nullable(),
              createdAt: import_zod4.z.date()
            }).nullable()
          })
        }
      }
    },
    async (request, reply) => {
      const userId = await request.getCurrentUserId();
      const token = await prisma.token.findFirst({
        where: {
          userId,
          type: "EMAIL_CHANGE_VALIDATION"
        },
        select: {
          type: true,
          createdAt: true,
          payload: true,
          userId: true
        }
      });
      return reply.status(200).send({
        token
      });
    }
  );
}

// src/http/routes/account/confirm-email-change.ts
var import_dayjs = __toESM(require("dayjs"));
var import_zod5 = __toESM(require("zod"));
async function confirmEmailChangeToken(app2) {
  app2.withTypeProvider().register(auth).patch(
    "/users/email",
    {
      schema: {
        tags: ["Account"],
        summary: "Confirm user e-mail change.",
        security: [{ bearerAuth: [] }],
        body: import_zod5.default.object({
          code: import_zod5.default.string().uuid()
        })
      }
    },
    async (request, reply) => {
      const userId = await request.getCurrentUserId();
      const token = await prisma.token.findFirst({
        where: {
          userId,
          type: "EMAIL_CHANGE_VALIDATION"
        }
      });
      if (!token) {
        throw new BadRequestError(errors.user.EMAIL_VALIDATION_EXPIRED);
      }
      const { code } = request.body;
      if (code !== token.id) {
        throw new BadRequestError(errors.user.EMAIL_VALIDATION_INVALID);
      }
      const tokenWasCreatedAt = (0, import_dayjs.default)(token.createdAt);
      const wasTokenCreatedWithin5Minutes = (0, import_dayjs.default)().diff(tokenWasCreatedAt, "minutes") <= 5;
      if (!wasTokenCreatedWithin5Minutes) {
        await prisma.token.delete({
          where: {
            id: token.id
          }
        });
        throw new BadRequestError(errors.user.EMAIL_VALIDATION_EXPIRED);
      }
      await prisma.$transaction([
        prisma.user.update({
          where: {
            id: userId
          },
          data: {
            email: token.payload
          }
        }),
        prisma.token.delete({
          where: {
            id: token.id
          }
        })
      ]);
      return reply.status(204).send();
    }
  );
}

// src/lib/cloudflare-r2.ts
var import_client_s3 = require("@aws-sdk/client-s3");
var R2 = new import_client_s3.S3Client({
  endpoint: env.CLOUDFLARE_ENDPOINT,
  region: env.CLOUDFLARE_REGION,
  credentials: {
    accessKeyId: env.CLOUDFLARE_ACCESS_KEY,
    secretAccessKey: env.CLOUDFLARE_SECRET_KEY
  }
});
async function putObjectR2(fileName, contentType, fileBuffer) {
  await R2.send(
    new import_client_s3.PutObjectCommand({
      Bucket: env.CLOUDFLARE_BUCKET,
      Key: fileName,
      ContentType: contentType,
      Body: fileBuffer
    })
  );
}
async function deleteObjectR2(fileName) {
  await R2.send(
    new import_client_s3.DeleteObjectCommand({
      Bucket: env.CLOUDFLARE_BUCKET,
      Key: fileName
    })
  );
}
async function deleteMultipleObjectsR2(filenames) {
  if (filenames.length) {
    await R2.send(
      new import_client_s3.DeleteObjectsCommand({
        Bucket: env.CLOUDFLARE_BUCKET,
        Delete: {
          Objects: filenames.map((fileName) => {
            return { Key: fileName };
          })
        }
      })
    );
  }
}

// src/utils/get-uploaded-avatar-names.ts
function getUploadedAvatarNames(avatars) {
  const validAvatars = avatars.filter((avatar) => avatar.startsWith("{AWS}/")).map((avatar) => {
    return avatar.replace("{AWS}/", "");
  });
  return validAvatars;
}

// src/http/routes/account/delete-account.ts
async function deleteAccount(app2) {
  app2.withTypeProvider().register(auth).delete(
    "/users",
    {
      schema: {
        tags: ["Account"],
        summary: "Delete account.",
        security: [{ bearerAuth: [] }]
      }
    },
    async (request, reply) => {
      const userId = await request.getCurrentUserId();
      const user = await prisma.user.findUnique({
        where: {
          id: userId
        },
        include: {
          ownsOrganizations: {
            include: {
              projects: true
            }
          }
        }
      });
      const avatars = [];
      if (user?.avatarUrl) {
        avatars.push(user.avatarUrl);
      }
      if (user?.ownsOrganizations.length) {
        user.ownsOrganizations.filter((organization) => !!organization.avatarUrl).map((organization) => {
          avatars.push(organization.avatarUrl);
          organization.projects.filter((project) => !!project.avatarUrl).map((project) => avatars.push(project.avatarUrl));
          return true;
        });
      }
      const uploadedAvatars = getUploadedAvatarNames(avatars);
      await prisma.avatar.deleteMany({
        where: {
          name: {
            in: uploadedAvatars
          }
        }
      });
      await deleteMultipleObjectsR2(uploadedAvatars);
      await prisma.user.delete({
        where: {
          id: userId
        }
      });
      reply.status(200).send();
    }
  );
}

// src/http/routes/account/get-profile.ts
var import_dayjs2 = __toESM(require("dayjs"));
var import_zod7 = require("zod");

// src/schemas/account-providers-schema.ts
var import_zod6 = __toESM(require("zod"));
var accountProvidersSchema = import_zod6.default.enum(["GITHUB", "GOOGLE"]);

// src/http/routes/account/get-profile.ts
async function getProfile(app2) {
  app2.withTypeProvider().register(auth).get(
    "/profile",
    {
      schema: {
        tags: ["Account"],
        summary: "Get authenticated user profile.",
        security: [{ bearerAuth: [] }],
        response: {
          200: import_zod7.z.object({
            user: import_zod7.z.object({
              id: import_zod7.z.string().uuid(),
              name: import_zod7.z.string().nullable(),
              email: import_zod7.z.string().email(),
              avatarUrl: import_zod7.z.string().nullable(),
              passwordHash: import_zod7.z.boolean(),
              accounts: import_zod7.z.array(
                import_zod7.z.object({
                  id: import_zod7.z.string().uuid(),
                  provider: accountProvidersSchema,
                  createdAt: import_zod7.z.date()
                })
              )
            })
          })
        }
      }
    },
    async (request, reply) => {
      const userId = await request.getCurrentUserId();
      const user = await prisma.user.findUnique({
        where: { id: userId },
        select: {
          id: true,
          name: true,
          email: true,
          avatarUrl: true,
          passwordHash: true,
          accounts: {
            select: {
              id: true,
              provider: true,
              createdAt: true
            }
          }
        }
      });
      if (!user) {
        throw new BadRequestError(errors.user.NOT_FOUND);
      }
      const hasAnEmailChangePending = await prisma.token.findFirst({
        where: {
          userId: user.id,
          type: "EMAIL_CHANGE_VALIDATION"
        }
      });
      if (hasAnEmailChangePending) {
        const tokenWasCreatedAt = (0, import_dayjs2.default)(hasAnEmailChangePending.createdAt);
        const wasTokenCreatedWithin5Minutes = (0, import_dayjs2.default)().diff(tokenWasCreatedAt, "minutes") <= 5;
        if (!wasTokenCreatedWithin5Minutes) {
          await prisma.token.delete({
            where: {
              id: hasAnEmailChangePending.id
            }
          });
        }
      }
      return reply.status(200).send({
        user: {
          ...user,
          passwordHash: !!user.passwordHash
        }
      });
    }
  );
}

// src/http/routes/account/leave-organization.ts
var import_zod8 = __toESM(require("zod"));
async function leaveOrganization(app2) {
  app2.withTypeProvider().register(auth).delete(
    "/users/organizations/:organization",
    {
      schema: {
        tags: ["Account"],
        summary: "Leave a organization.",
        security: [{ bearerAuth: [] }],
        params: import_zod8.default.object({
          organization: import_zod8.default.string()
        }),
        response: {
          200: import_zod8.default.null()
        }
      }
    },
    async (request, reply) => {
      const { organization: organizationSlug } = request.params;
      const userId = await request.getCurrentUserId();
      const { organization, membership } = await request.getCurrentUserMembership(organizationSlug);
      if (userId === organization.ownerId) {
        throw new BadRequestError(errors.organizations.entity.CANNOT_LEAVE);
      }
      await prisma.member.delete({
        where: {
          id: membership.id
        }
      });
      return reply.status(200).send();
    }
  );
}

// src/http/routes/account/providers/connect-github.ts
var import_zod9 = require("zod");
async function connectGitHub(app2) {
  app2.withTypeProvider().register(auth).post(
    "/users/accounts/github",
    {
      schema: {
        tags: ["Auth"],
        summary: "Authenticate with GitHub and connect to current account.",
        security: [{ bearerAuth: [] }],
        body: import_zod9.z.object({
          code: import_zod9.z.string()
        })
      }
    },
    async (request, reply) => {
      const userId = await request.getCurrentUserId();
      const { code } = request.body;
      const githubOAuthURL = new URL("https://github.com/login/oauth/access_token");
      githubOAuthURL.searchParams.set("client_id", env.GITHUB_OAUTH_CLIENT_ID);
      githubOAuthURL.searchParams.set("client_secret", env.GITHUB_OAUTH_CLIENT_SECRET);
      githubOAuthURL.searchParams.set("redirect_uri", env.GITHUB_OAUTH_CLIENT_REDIRECT_URI);
      githubOAuthURL.searchParams.set("code", code);
      const githubAccessTokenResponse = await fetch(githubOAuthURL, {
        method: "POST",
        headers: {
          Accept: "application/json"
        }
      });
      const githubAccessTokenData = await githubAccessTokenResponse.json();
      const { access_token: GitHubAccessToken } = import_zod9.z.object({
        access_token: import_zod9.z.string(),
        token_type: import_zod9.z.literal("bearer"),
        scope: import_zod9.z.string()
      }).parse(githubAccessTokenData);
      const githubUserResponse = await fetch("https://api.github.com/user", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${GitHubAccessToken}`
        }
      });
      const githubUserData = await githubUserResponse.json();
      const { id: githubId } = import_zod9.z.object({
        id: import_zod9.z.coerce.number().int().transform(String)
      }).parse(githubUserData);
      const providerAlreadyInUseByUser = await prisma.account.findUnique({
        where: {
          provider_userId: {
            provider: "GITHUB",
            userId
          }
        }
      });
      if (providerAlreadyInUseByUser) {
        throw new BadRequestError(errors.services.GITHUB_ALREADY_CONNECTED);
      }
      const accountAlreadyInUseBySomeoneElse = await prisma.account.findUnique({
        where: {
          provider_providerAccountId: {
            provider: "GITHUB",
            providerAccountId: githubId
          }
        }
      });
      if (accountAlreadyInUseBySomeoneElse) {
        throw new BadRequestError(errors.services.GITHUB_ALREADY_CONNECTED_SOMEONE_ELSE);
      }
      await prisma.account.create({
        data: {
          provider: "GITHUB",
          providerAccountId: githubId,
          userId
        }
      });
      return reply.status(201).send();
    }
  );
}

// src/http/routes/account/providers/connect-google.ts
var import_zod10 = require("zod");
async function connectGoogle(app2) {
  app2.withTypeProvider().register(auth).post(
    "/users/accounts/google",
    {
      schema: {
        tags: ["Auth"],
        summary: "Authenticate with Google and connect to current account.",
        security: [{ bearerAuth: [] }],
        body: import_zod10.z.object({
          code: import_zod10.z.string()
        })
      }
    },
    async (request, reply) => {
      const userId = await request.getCurrentUserId();
      const { code } = request.body;
      const googleOAuthURL = new URL("token", "https://oauth2.googleapis.com");
      googleOAuthURL.searchParams.set("code", code);
      googleOAuthURL.searchParams.set("client_id", env.GOOGLE_OAUTH_CLIENT_ID);
      googleOAuthURL.searchParams.set("client_secret", env.GOOGLE_OAUTH_CLIENT_SECRET);
      googleOAuthURL.searchParams.set("redirect_uri", env.GOOGLE_OAUTH_CLIENT_REDIRECT_URI);
      googleOAuthURL.searchParams.set("grant_type", "authorization_code");
      const googleAccessTokenResponse = await fetch(googleOAuthURL, {
        method: "POST",
        headers: {
          Accept: "application/json"
        }
      });
      const googleAccessTokenData = await googleAccessTokenResponse.json();
      const { access_token: GoogleAccessToken } = import_zod10.z.object({
        access_token: import_zod10.z.string(),
        expires_in: import_zod10.z.coerce.number().int(),
        refresh_token: import_zod10.z.string(),
        scope: import_zod10.z.string(),
        token_type: import_zod10.z.literal("Bearer"),
        id_token: import_zod10.z.string()
      }).parse(googleAccessTokenData);
      const googleUserInfoURL = new URL("oauth2/v3/userinfo", "https://www.googleapis.com");
      googleUserInfoURL.searchParams.set("access_token", GoogleAccessToken);
      const githubUserResponse = await fetch(googleUserInfoURL, {
        method: "GET"
      });
      const githubUserData = await githubUserResponse.json();
      const {
        sub: googleId
      } = import_zod10.z.object({
        sub: import_zod10.z.string(),
        name: import_zod10.z.string(),
        given_name: import_zod10.z.string(),
        picture: import_zod10.z.string(),
        email: import_zod10.z.string().email(),
        email_verified: import_zod10.z.boolean()
      }).parse(githubUserData);
      const providerAlreadyInUseByUser = await prisma.account.findUnique({
        where: {
          provider_userId: {
            provider: "GOOGLE",
            userId
          }
        }
      });
      if (providerAlreadyInUseByUser) {
        throw new BadRequestError(errors.services.GOOGLE_ALREADY_CONNECTED);
      }
      const accountAlreadyInUseBySomeoneElse = await prisma.account.findUnique({
        where: {
          provider_providerAccountId: {
            provider: "GOOGLE",
            providerAccountId: googleId
          }
        }
      });
      if (accountAlreadyInUseBySomeoneElse) {
        throw new BadRequestError(errors.services.GOOGLE_ALREADY_CONNECTED_SOMEONE_ELSE);
      }
      await prisma.account.create({
        data: {
          provider: "GOOGLE",
          providerAccountId: googleId,
          userId
        }
      });
      return reply.status(201).send();
    }
  );
}

// src/http/routes/account/remove-provider.ts
var import_zod11 = require("zod");
async function removeAccountProvider(app2) {
  app2.withTypeProvider().register(auth).delete(
    "/users/providers/:provider",
    {
      schema: {
        tags: ["Account"],
        summary: "Delete a authentication provider from your account.",
        security: [{ bearerAuth: [] }],
        params: import_zod11.z.object({
          provider: accountProvidersSchema
        })
      }
    },
    async (request, reply) => {
      const userId = await request.getCurrentUserId();
      const { provider } = request.params;
      const userWithoutPassword = await prisma.user.findFirst({
        where: {
          id: userId,
          passwordHash: null
        }
      });
      const countAccountsAvailable = await prisma.account.count({
        where: { userId }
      });
      if (userWithoutPassword && countAccountsAvailable < 2) {
        throw new BadRequestError(errors.auth.LAST_METHOD_AVAILABLE);
      }
      const accountExists = await prisma.account.findFirst({
        where: {
          userId,
          provider
        }
      });
      if (!accountExists) {
        throw new BadRequestError(errors.user.ACCOUNT_NOT_FOUND);
      }
      await prisma.account.delete({
        where: {
          id: accountExists.id
        }
      });
      reply.status(200).send();
    }
  );
}

// src/http/routes/account/update-account.ts
var import_zod12 = require("zod");

// src/lib/mail.ts
var import_nodemailer = __toESM(require("nodemailer"));
var emailService = import_nodemailer.default.createTransport({
  host: env.MAIL_SMTP_HOST,
  port: env.MAIL_SMTP_PORT,
  secure: true,
  auth: {
    user: env.MAIL_SMTP_EMAIL,
    pass: env.MAIL_SMTP_PASSWORD
  }
});

// src/http/emails/template/change-account-email.template.ts
function changeAccountEmailTemplate({
  name,
  oldEmail,
  newEmail,
  code,
  link
}) {
  return `
		<p style="margin:0 0 0.25rem;line-height:1.5;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;font-size:14px;">
			Hi, ${name ? name.split(" ").at(0) + "!" : ""}
		</p>
		<p style="margin:0 0 1rem;line-height:1.5;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;font-size:14px;">
			We received a request to verify your new e-mail address on our platform.
		</p>

		<p style="margin:0 0 0.25rem;line-height:1.5;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;font-size:14px;">
			You are about to change your e-mail from ${oldEmail} to ${newEmail}. 
		</p>
		<p style="margin:0 0 1rem;line-height:1.5;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;font-size:14px;">
			To proceed, please use the unique validation code below:
		</p>

		<p style="margin:0 0 1rem;line-height:1.5;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;font-size:14px;">
			<strong>Validation Code:</strong>
		</p>
		<p style="margin:0 0 1rem;line-height:1.5;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;font-size:14px;">
			${code}
		</p>

		<p style="margin:0 0 1rem;line-height:1.5;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;font-size:14px;">
			<i>Note: The code is valid for 5 minutes.</i>
		</p>

		<p style="margin:0 0 1rem;line-height:1.5;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;font-size:14px;">
			<strong>Here\u2019s what to do next:</strong>
		</p>

		<p style="margin:0 0 0.25rem;line-height:1.5;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;font-size:14px;">
			1. Copy the validation code provided above.
		</p>
		<p style="margin:0 0 0.25rem;line-height:1.5;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;font-size:14px;">
			2. Click the link to proceed with validation:
			<a href="${link}" style="text-decoration:underline;color:currentColor;">Complete E-mail Verification</a>
		</p>
		<p style="margin:0 0 1rem;line-height:1.5;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;font-size:14px;">
			3. Paste the code when prompted on the verification page.
		</p>

		<p style="margin:0 0 1rem;line-height:1.5;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;font-size:14px;">
			If you did not request this, you can safely ignore this email.
		</p>

		<p style="margin:0 0 0.25rem;line-height:1.5;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;font-size:14px;">
			Thanks.
		</p>
	`;
}

// src/http/emails/change-account-email.ts
async function changeAccountEmail({
  name,
  oldEmail,
  newEmail,
  code
}) {
  const htmlTemplate = changeAccountEmailTemplate({
    name,
    code,
    oldEmail,
    newEmail,
    link: `${env.NEXT_PUBLIC_URL}/account/settings`
  });
  const emailOptions = {
    from: env.MAIL_SMTP_EMAIL,
    to: newEmail,
    subject: "Your New Account E-mail Verification Code",
    html: htmlTemplate
  };
  await emailService.sendMail(emailOptions);
}

// src/http/routes/account/update-account.ts
async function updateAccount(app2) {
  app2.withTypeProvider().register(auth).put(
    "/users",
    {
      schema: {
        tags: ["Account"],
        summary: "Update account informations.",
        security: [{ bearerAuth: [] }],
        body: import_zod12.z.object({
          name: import_zod12.z.string(),
          email: import_zod12.z.string().email()
        })
      }
    },
    async (request, reply) => {
      const userId = await request.getCurrentUserId();
      const { email: newEmail, name } = request.body;
      const userWithSameEmail = await prisma.user.findFirst({
        where: {
          email: newEmail,
          id: {
            not: userId
          }
        }
      });
      if (userWithSameEmail) {
        throw new BadRequestError(errors.user.ALREADY_EXISTS);
      }
      const currentUser = await prisma.user.findUnique({
        where: {
          id: userId
        }
      });
      if (!currentUser) {
        throw new BadRequestError(errors.user.NOT_FOUND);
      }
      const hasAnEmailChangePending = await prisma.token.findFirst({
        where: {
          userId,
          type: "EMAIL_CHANGE_VALIDATION"
        }
      });
      const { email: currentEmail } = currentUser;
      if (currentEmail !== newEmail && !hasAnEmailChangePending) {
        const { id: verificationCode } = await prisma.token.create({
          data: {
            userId,
            type: "EMAIL_CHANGE_VALIDATION",
            payload: newEmail
          }
        });
        try {
          await changeAccountEmail({
            name,
            oldEmail: currentEmail,
            newEmail,
            code: verificationCode
          });
        } catch {
          throw new BadRequestError(errors.services.SEND_EMAIL);
        }
      }
      await prisma.user.update({
        where: {
          id: userId
        },
        data: {
          name
        }
      });
      reply.status(204).send();
    }
  );
}

// src/http/routes/account/update-password.ts
var import_bcryptjs = require("bcryptjs");
var import_zod13 = require("zod");

// src/schemas/validate-strong-password-schema.ts
var validateStrongPasswordSchema = ({ password }, checkPassComplexity) => {
  if (!password.length) {
    checkPassComplexity.addIssue({
      code: "custom",
      path: ["password"],
      message: JSON.stringify({
        minLength: {
          valid: false,
          message: errors.auth.PASSWORD_LENGTH
        }
      })
    });
  }
  const hasUppercase = (ch) => /[A-Z]/.test(ch);
  const hasLowercase = (ch) => /[a-z]/.test(ch);
  const hasSpecial = (ch) => /[`!@#$%^&*()_\-+=[\]{};':"\\|,.<>/?~ ]/.test(ch);
  let countUppercase = 0;
  let countLowercase = 0;
  let countNumbers = 0;
  let countSpecial = 0;
  for (let i4 = 0; i4 < password.length; i4++) {
    const ch = password.charAt(i4);
    if (!isNaN(+ch)) countNumbers++;
    else if (hasUppercase(ch)) countUppercase++;
    else if (hasLowercase(ch)) countLowercase++;
    else if (hasSpecial(ch)) countSpecial++;
  }
  let errors3 = {
    totalNumber: {
      valid: true,
      message: errors.auth.PASSWORD_NUMBER
    },
    upperCase: {
      valid: true,
      message: errors.auth.PASSWORD_UPPER
    },
    lowerCase: {
      valid: true,
      message: errors.auth.PASSWORD_LOWER
    },
    specialCh: {
      valid: true,
      message: errors.auth.PASSWORD_SPECIAL
    },
    minLength: {
      valid: true,
      message: errors.auth.PASSWORD_LENGTH
    }
  };
  if (countNumbers < 1) {
    errors3 = {
      ...errors3,
      totalNumber: { ...errors3.totalNumber, valid: false }
    };
  }
  if (countUppercase < 1) {
    errors3 = {
      ...errors3,
      upperCase: {
        ...errors3.upperCase,
        valid: false
      }
    };
  }
  if (countLowercase < 1) {
    errors3 = {
      ...errors3,
      lowerCase: {
        ...errors3.lowerCase,
        valid: false
      }
    };
  }
  if (countSpecial < 1) {
    errors3 = {
      ...errors3,
      specialCh: {
        ...errors3.specialCh,
        valid: false
      }
    };
  }
  if (password.length < 6) {
    errors3 = {
      ...errors3,
      minLength: {
        ...errors3.minLength,
        valid: false
      }
    };
  }
  if (countNumbers < 1 || countUppercase < 1 || countLowercase < 1 || countSpecial < 1 || password.length < 6) {
    checkPassComplexity.addIssue({
      code: "custom",
      path: ["password"],
      message: JSON.stringify(errors3)
    });
  }
};

// src/http/routes/account/update-password.ts
async function updatePassword(app2) {
  app2.withTypeProvider().register(auth).patch(
    "/users/passwords",
    {
      schema: {
        tags: ["Account"],
        summary: "Update or create account password.",
        security: [{ bearerAuth: [] }],
        body: import_zod13.z.object({
          currentPassword: import_zod13.z.string().nullish(),
          password: import_zod13.z.string()
        }).superRefine(validateStrongPasswordSchema)
      }
    },
    async (request, reply) => {
      const userId = await request.getCurrentUserId();
      const { currentPassword, password: newPassword } = request.body;
      const user = await prisma.user.findUnique({
        where: {
          id: userId
        }
      });
      if (!user) {
        throw new BadRequestError(errors.auth.INVALID_CREDENTIALS);
      }
      if (user.passwordHash) {
        if (!currentPassword) {
          throw new BadRequestError(errors.auth.INVALID_CREDENTIALS);
        }
        const isPasswordValid = await (0, import_bcryptjs.compare)(
          currentPassword,
          user.passwordHash
        );
        if (!isPasswordValid) {
          throw new BadRequestError(errors.auth.INVALID_CREDENTIALS);
        }
      }
      const hashedPassword = await (0, import_bcryptjs.hash)(newPassword, 8);
      await prisma.user.update({
        where: {
          id: user.id
        },
        data: {
          passwordHash: hashedPassword
        }
      });
      reply.status(204).send();
    }
  );
}

// src/http/routes/auth/authenticate-with-github.ts
var import_zod14 = require("zod");
async function authenticateWithGitHub(app2) {
  app2.withTypeProvider().post(
    "/sessions/github",
    {
      schema: {
        tags: ["Auth"],
        summary: "Authenticate with GitHub.",
        body: import_zod14.z.object({
          code: import_zod14.z.string()
        }),
        response: {
          201: import_zod14.z.object({
            token: import_zod14.z.string()
          })
        }
      }
    },
    async (request, reply) => {
      const { code } = request.body;
      const githubOAuthURL = new URL("https://github.com/login/oauth/access_token");
      githubOAuthURL.searchParams.set("client_id", env.GITHUB_OAUTH_CLIENT_ID);
      githubOAuthURL.searchParams.set("client_secret", env.GITHUB_OAUTH_CLIENT_SECRET);
      githubOAuthURL.searchParams.set("redirect_uri", env.GITHUB_OAUTH_CLIENT_REDIRECT_URI);
      githubOAuthURL.searchParams.set("code", code);
      const githubAccessTokenResponse = await fetch(githubOAuthURL, {
        method: "POST",
        headers: {
          Accept: "application/json"
        }
      });
      const githubAccessTokenData = await githubAccessTokenResponse.json();
      const { access_token: GitHubAccessToken } = import_zod14.z.object({
        access_token: import_zod14.z.string(),
        token_type: import_zod14.z.literal("bearer"),
        scope: import_zod14.z.string()
      }).parse(githubAccessTokenData);
      const githubUserResponse = await fetch("https://api.github.com/user", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${GitHubAccessToken}`
        }
      });
      const githubUserData = await githubUserResponse.json();
      const {
        id: githubId,
        name,
        email,
        avatar_url: avatarUrl
      } = import_zod14.z.object({
        id: import_zod14.z.coerce.number().int().transform(String),
        avatar_url: import_zod14.z.string().url(),
        name: import_zod14.z.string().nullable(),
        email: import_zod14.z.string().email().nullable()
      }).parse(githubUserData);
      if (email === null) {
        throw new BadRequestError(errors.auth.GITHUB_EMAIL_NOT_FOUND);
      }
      let token;
      let account = await prisma.account.findUnique({
        where: {
          provider_providerAccountId: {
            provider: "GITHUB",
            providerAccountId: githubId
          }
        }
      });
      if (account) {
        token = await reply.jwtSign(
          {
            sub: account.userId
          },
          {
            expiresIn: "7d"
          }
        );
        return reply.status(201).send({ token });
      }
      let user = await prisma.user.findUnique({
        where: { email }
      });
      if (!user) {
        user = await prisma.user.create({
          data: {
            name,
            email,
            emailValidatedAt: /* @__PURE__ */ new Date(),
            avatarUrl
          }
        });
      }
      account = await prisma.account.findUnique({
        where: {
          provider_userId: {
            provider: "GITHUB",
            userId: user.id
          }
        }
      });
      if (!account) {
        account = await prisma.account.create({
          data: {
            provider: "GITHUB",
            providerAccountId: githubId,
            userId: user.id
          }
        });
      }
      token = await reply.jwtSign(
        {
          sub: user.id
        },
        {
          expiresIn: "7d"
        }
      );
      return reply.status(201).send({ token });
    }
  );
}

// src/http/routes/auth/authenticate-with-google.ts
var import_zod15 = require("zod");
async function authenticateWithGoogle(app2) {
  app2.withTypeProvider().post(
    "/sessions/google",
    {
      schema: {
        tags: ["Auth"],
        summary: "Authenticate with Google.",
        body: import_zod15.z.object({
          code: import_zod15.z.string()
        }),
        response: {
          201: import_zod15.z.object({
            token: import_zod15.z.string()
          })
        }
      }
    },
    async (request, reply) => {
      const { code } = request.body;
      const googleOAuthURL = new URL("token", "https://oauth2.googleapis.com");
      googleOAuthURL.searchParams.set("code", code);
      googleOAuthURL.searchParams.set("client_id", env.GOOGLE_OAUTH_CLIENT_ID);
      googleOAuthURL.searchParams.set("client_secret", env.GOOGLE_OAUTH_CLIENT_SECRET);
      googleOAuthURL.searchParams.set("redirect_uri", env.GOOGLE_OAUTH_CLIENT_REDIRECT_URI);
      googleOAuthURL.searchParams.set("grant_type", "authorization_code");
      const googleAccessTokenResponse = await fetch(googleOAuthURL, {
        method: "POST",
        headers: {
          Accept: "application/json"
        }
      });
      const googleAccessTokenData = await googleAccessTokenResponse.json();
      const { access_token: GoogleAccessToken } = import_zod15.z.object({
        access_token: import_zod15.z.string(),
        expires_in: import_zod15.z.coerce.number().int(),
        refresh_token: import_zod15.z.string(),
        scope: import_zod15.z.string(),
        token_type: import_zod15.z.literal("Bearer"),
        id_token: import_zod15.z.string()
      }).parse(googleAccessTokenData);
      const googleUserInfoURL = new URL("oauth2/v3/userinfo", "https://www.googleapis.com");
      googleUserInfoURL.searchParams.set("access_token", GoogleAccessToken);
      const githubUserResponse = await fetch(googleUserInfoURL, {
        method: "GET"
      });
      const githubUserData = await githubUserResponse.json();
      const {
        sub: googleId,
        name,
        email,
        picture: avatarUrl
      } = import_zod15.z.object({
        sub: import_zod15.z.string(),
        name: import_zod15.z.string(),
        given_name: import_zod15.z.string(),
        picture: import_zod15.z.string(),
        email: import_zod15.z.string().email(),
        email_verified: import_zod15.z.boolean()
      }).parse(githubUserData);
      let token;
      let account = await prisma.account.findUnique({
        where: {
          provider_providerAccountId: {
            provider: "GOOGLE",
            providerAccountId: googleId
          }
        }
      });
      if (account) {
        token = await reply.jwtSign(
          {
            sub: account.userId
          },
          {
            expiresIn: "7d"
          }
        );
        return reply.status(201).send({ token });
      }
      let user = await prisma.user.findUnique({
        where: { email }
      });
      if (!user) {
        user = await prisma.user.create({
          data: {
            name,
            email,
            emailValidatedAt: /* @__PURE__ */ new Date(),
            avatarUrl
          }
        });
      }
      account = await prisma.account.findUnique({
        where: {
          provider_userId: {
            provider: "GOOGLE",
            userId: user.id
          }
        }
      });
      if (!account) {
        account = await prisma.account.create({
          data: {
            provider: "GOOGLE",
            providerAccountId: googleId,
            userId: user.id
          }
        });
      }
      token = await reply.jwtSign(
        {
          sub: user.id
        },
        {
          expiresIn: "7d"
        }
      );
      return reply.status(201).send({ token });
    }
  );
}

// src/http/routes/auth/authenticate-with-password.ts
var import_bcryptjs2 = require("bcryptjs");
var import_zod16 = require("zod");
async function authenticateWithPassword(app2) {
  app2.withTypeProvider().post(
    "/sessions/password",
    {
      schema: {
        tags: ["Auth"],
        summary: "Authenticate with e-mail and password.",
        body: import_zod16.z.object({
          email: import_zod16.z.string().email(),
          password: import_zod16.z.string()
        }),
        response: {
          201: import_zod16.z.object({
            token: import_zod16.z.string(),
            emailValidatedAt: import_zod16.z.date().nullable()
          })
        }
      }
    },
    async (request, reply) => {
      const { email, password } = request.body;
      const userFromEmail = await prisma.user.findUnique({
        where: { email }
      });
      if (!userFromEmail) {
        throw new BadRequestError(errors.auth.INVALID_CREDENTIALS);
      }
      if (userFromEmail.passwordHash === null) {
        throw new BadRequestError(errors.auth.NOT_PASSWORD_FOUND);
      }
      const isPasswordValid = await (0, import_bcryptjs2.compare)(
        password,
        userFromEmail.passwordHash
      );
      if (!isPasswordValid) {
        throw new BadRequestError(errors.auth.INVALID_CREDENTIALS);
      }
      const token = await reply.jwtSign(
        {
          sub: userFromEmail.id
        },
        {
          expiresIn: "7d"
        }
      );
      return reply.status(201).send({
        token,
        emailValidatedAt: userFromEmail.emailValidatedAt
      });
    }
  );
}

// src/http/routes/auth/create-account.ts
var import_bcryptjs3 = require("bcryptjs");
var import_zod17 = require("zod");

// src/http/emails/template/verify-account-email.template.ts
function verifyAccountEmailTemplate({
  name,
  code,
  link
}) {
  return `
		<p style="margin:0 0 0.25rem;line-height:1.5;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;font-size:14px;">
			Hi, ${name ? name.split(" ").at(0) + "!" : ""}
		</p>
		<p style="margin:0 0 1rem;line-height:1.5;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;font-size:14px;">
			We received a request to verify your e-mail address on our platform. To proceed, please use the unique validation code below:
		</p>

		<p style="margin:0 0 1rem;line-height:1.5;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;font-size:14px;">
			<strong>Validation Code:</strong>
		</p>
		<p style="margin:0 0 1rem;line-height:1.5;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;font-size:14px;">
			${code}
		</p>

		<p style="margin:0 0 1rem;line-height:1.5;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;font-size:14px;">
			<i>Note: The code is valid for 5 minutes.</i>
		</p>

		<p style="margin:0 0 1rem;line-height:1.5;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;font-size:14px;">
			<strong>Here\u2019s what to do next:</strong>
		</p>

		<p style="margin:0 0 0.25rem;line-height:1.5;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;font-size:14px;">
			1. Copy the validation code provided above.
		</p>
		<p style="margin:0 0 0.25rem;line-height:1.5;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;font-size:14px;">
			2. Click the link to proceed with validation:
			<a href="${link}" style="text-decoration:underline;color:currentColor;">Complete E-mail Verification</a>
		</p>
		<p style="margin:0 0 1rem;line-height:1.5;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;font-size:14px;">
			3. Paste the code when prompted on the verification page.
		</p>

		<p style="margin:0 0 1rem;line-height:1.5;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;font-size:14px;">
			If you did not request this, you can safely ignore this email.
		</p>

		<p style="margin:0 0 0.25rem;line-height:1.5;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;font-size:14px;">
			Thanks.
		</p>
	`;
}

// src/http/emails/verify-account-email.ts
async function verifyAccountEmail({
  name,
  email,
  code
}) {
  const htmlTemplate = verifyAccountEmailTemplate({
    name,
    code,
    link: `${env.NEXT_PUBLIC_URL}/auth/verify-email?email=${email}&code=${code}`
  });
  const emailOptions = {
    from: env.MAIL_SMTP_EMAIL,
    to: email,
    subject: "Your Account E-mail Verification Code",
    html: htmlTemplate
  };
  await emailService.sendMail(emailOptions);
}

// src/http/routes/auth/create-account.ts
async function createAccount(app2) {
  app2.withTypeProvider().post(
    "/users",
    {
      schema: {
        tags: ["Auth"],
        summary: "Create a new account.",
        body: import_zod17.z.object({
          name: import_zod17.z.string(),
          email: import_zod17.z.string().email(),
          password: import_zod17.z.string()
        }).superRefine(validateStrongPasswordSchema)
      }
    },
    async (request, reply) => {
      const { email, name, password } = request.body;
      const userWithSameEmail = await prisma.user.findUnique({
        where: {
          email
        }
      });
      if (userWithSameEmail) {
        throw new BadRequestError(errors.user.ALREADY_EXISTS);
      }
      const autoJoinOrganization = await prisma.organization.findFirst({
        where: {
          domain: email.split("@").at(1),
          shouldAttachUsersByDomain: true
        }
      });
      const hashedPassword = await (0, import_bcryptjs3.hash)(password, 8);
      const { id: userId } = await prisma.user.create({
        data: {
          name,
          email,
          passwordHash: hashedPassword,
          memberOn: autoJoinOrganization ? {
            create: {
              organizationId: autoJoinOrganization.id
            }
          } : void 0
        }
      });
      const { id: verificationCode } = await prisma.token.create({
        data: {
          userId,
          type: "EMAIL_VALIDATION"
        }
      });
      try {
        await verifyAccountEmail({
          name,
          email,
          code: verificationCode
        });
      } catch {
        throw new BadRequestError(errors.services.SEND_EMAIL);
      }
      reply.status(201).send();
    }
  );
}

// src/http/routes/auth/request-password-recover.ts
var import_zod18 = require("zod");

// src/http/emails/template/password-recover-email.template.ts
function passwordRecoverEmailTemplate({
  name,
  code,
  link
}) {
  return `
		<p style="margin:0 0 0.25rem;line-height:1.5;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;font-size:14px;">
			Hi, ${name ? name.split(" ").at(0) + "!" : ""}
		</p>
		<p style="margin:0 0 1rem;line-height:1.5;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;font-size:14px;">
			We received a request to reset your password. To proceed, please use the unique recovery code below:
		</p>

		<p style="margin:0 0 1rem;line-height:1.5;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;font-size:14px;">
			<strong>Recovery Code:</strong>
		</p>
		<p style="margin:0 0 1rem;line-height:1.5;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;font-size:14px;">
			${code}
		</p>

		<p style="margin:0 0 1rem;line-height:1.5;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;font-size:14px;">
			<i>Note: The code is valid for 5 minutes.</i>
		</p>

		<p style="margin:0 0 1rem;line-height:1.5;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;font-size:14px;">
			<strong>Here\u2019s what to do next:</strong>
		</p>

		<p style="margin:0 0 0.25rem;line-height:1.5;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;font-size:14px;">
			1. Copy the recovery code provided above.
		</p>
		<p style="margin:0 0 0.25rem;line-height:1.5;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;font-size:14px;">
			2. Click the link to proceed with resetting your password:
			<a href="${link}" style="text-decoration:underline;color:currentColor;">Reset Password Link</a>
		</p>
		<p style="margin:0 0 1rem;line-height:1.5;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;font-size:14px;">
			3. Paste the code when prompted on the password reset page.
		</p>

		<p style="margin:0 0 1rem;line-height:1.5;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;font-size:14px;">
			If you did not request this, you can safely ignore this email.
		</p>

		<p style="margin:0 0 0.25rem;line-height:1.5;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;font-size:14px;">
			Thanks.
		</p>
	`;
}

// src/http/emails/password-recover-email.ts
async function passwordRecoverEmail({
  name,
  email,
  code
}) {
  const htmlTemplate = passwordRecoverEmailTemplate({
    name,
    code,
    link: `${env.NEXT_PUBLIC_URL}/auth/recover-password?email=${email}&code=${code}`
  });
  const emailOptions = {
    from: env.MAIL_SMTP_EMAIL,
    to: email,
    subject: "Your Password Recovery Code",
    html: htmlTemplate
  };
  await emailService.sendMail(emailOptions);
}

// src/http/routes/auth/request-password-recover.ts
async function requestPasswordRecover(app2) {
  app2.withTypeProvider().post(
    "/password/recover",
    {
      schema: {
        tags: ["Auth"],
        summary: "Request password recover.",
        body: import_zod18.z.object({
          email: import_zod18.z.string().email()
        }),
        response: {
          201: import_zod18.z.null()
        }
      }
    },
    async (request, reply) => {
      const { email } = request.body;
      const userWithEmail = await prisma.user.findUnique({
        where: { email }
      });
      if (!userWithEmail) {
        return reply.status(201).send();
      }
      const { id: code } = await prisma.token.create({
        data: {
          type: "PASSWORD_RECOVER",
          userId: userWithEmail.id
        }
      });
      try {
        await passwordRecoverEmail({
          name: userWithEmail.name,
          email,
          code
        });
      } catch {
        throw new BadRequestError(errors.services.SEND_EMAIL);
      }
      return reply.status(201).send();
    }
  );
}

// src/http/routes/auth/resend-email-validation-code.ts
var import_zod19 = require("zod");
async function resendEmailValidationCode(app2) {
  app2.withTypeProvider().post(
    "/users/resend-email-validation-code",
    {
      schema: {
        tags: ["Auth"],
        summary: "Resend a validation code by e-mail.",
        body: import_zod19.z.object({
          email: import_zod19.z.string().email()
        }),
        response: {
          200: import_zod19.z.null()
        }
      }
    },
    async (request, reply) => {
      const { email } = request.body;
      const userFromEmail = await prisma.user.findFirst({
        where: {
          email,
          emailValidatedAt: {
            equals: null
          }
        }
      });
      if (!userFromEmail) {
        throw new BadRequestError(errors.auth.INVALID_CREDENTIALS);
      }
      const { id: validationCode } = await prisma.token.create({
        data: {
          type: "EMAIL_VALIDATION",
          userId: userFromEmail.id
        }
      });
      try {
        await verifyAccountEmail({
          name: userFromEmail.name,
          email,
          code: validationCode
        });
      } catch {
        throw new BadRequestError(errors.services.SEND_EMAIL);
      }
      return reply.status(200).send();
    }
  );
}

// src/http/routes/auth/reset-password.ts
var import_bcryptjs4 = require("bcryptjs");
var import_dayjs3 = __toESM(require("dayjs"));
var import_zod20 = require("zod");
async function resetPassword(app2) {
  app2.withTypeProvider().post(
    "/password/reset",
    {
      schema: {
        tags: ["Auth"],
        summary: "Reset user password.",
        body: import_zod20.z.object({
          code: import_zod20.z.string().uuid(),
          email: import_zod20.z.string().email(),
          password: import_zod20.z.string()
        }).superRefine(validateStrongPasswordSchema),
        response: {
          204: import_zod20.z.null()
        }
      }
    },
    async (request, reply) => {
      const { code, password, email } = request.body;
      const emailFromRequest = await prisma.user.findUnique({
        where: {
          email
        }
      });
      if (!emailFromRequest) {
        throw new UnauthorizedError(errors.auth.INVALID_PASSWORD_TOKEN);
      }
      const tokenFromCode = await prisma.token.findFirst({
        where: {
          id: code,
          type: "PASSWORD_RECOVER",
          userId: emailFromRequest.id
        }
      });
      if (!tokenFromCode) {
        throw new UnauthorizedError(errors.auth.INVALID_PASSWORD_TOKEN);
      }
      const tokenWasCreatedAt = (0, import_dayjs3.default)(tokenFromCode.createdAt);
      const wasTokenCreatedWithin5Minutes = (0, import_dayjs3.default)().diff(tokenWasCreatedAt, "minutes") <= 5;
      if (!wasTokenCreatedWithin5Minutes) {
        await prisma.token.delete({
          where: {
            id: tokenFromCode.id
          }
        });
        throw new UnauthorizedError(errors.auth.INVALID_PASSWORD_TOKEN);
      }
      const hashedPassword = await (0, import_bcryptjs4.hash)(password, 8);
      await prisma.$transaction([
        prisma.user.update({
          where: {
            id: tokenFromCode.userId
          },
          data: {
            passwordHash: hashedPassword
          }
        }),
        prisma.token.deleteMany({
          where: {
            userId: emailFromRequest.id,
            type: "PASSWORD_RECOVER"
          }
        })
      ]);
      return reply.status(204).send();
    }
  );
}

// src/http/routes/auth/verify-email-and-authenticate.ts
var import_bcryptjs5 = require("bcryptjs");
var import_dayjs4 = __toESM(require("dayjs"));
var import_zod21 = require("zod");
async function verifyEmailAndAuthenticate(app2) {
  app2.withTypeProvider().post(
    "/users/verify-email",
    {
      schema: {
        tags: ["Auth"],
        summary: "Verify an e-mail by validation code and then sign in.",
        body: import_zod21.z.object({
          email: import_zod21.z.string().email(),
          password: import_zod21.z.string(),
          code: import_zod21.z.string().uuid()
        }),
        response: {
          201: import_zod21.z.object({
            token: import_zod21.z.string()
          })
        }
      }
    },
    async (request, reply) => {
      const { email, password, code } = request.body;
      const userFromEmail = await prisma.user.findUnique({
        where: { email }
      });
      if (!userFromEmail) {
        throw new BadRequestError(errors.auth.INVALID_CREDENTIALS);
      }
      if (userFromEmail.passwordHash === null) {
        throw new BadRequestError(errors.auth.NOT_PASSWORD_FOUND);
      }
      const isPasswordValid = await (0, import_bcryptjs5.compare)(
        password,
        userFromEmail.passwordHash
      );
      if (!isPasswordValid) {
        throw new BadRequestError(errors.auth.INVALID_CREDENTIALS);
      }
      const validationToken = await prisma.token.findFirst({
        where: {
          id: code,
          userId: userFromEmail.id,
          type: "EMAIL_VALIDATION"
        }
      });
      if (!validationToken) {
        throw new BadRequestError(errors.auth.INVALID_EMAIL_TOKEN);
      }
      const tokenWasCreatedAt = (0, import_dayjs4.default)(validationToken.createdAt);
      const wasTokenCreatedWithin5Minutes = (0, import_dayjs4.default)().diff(tokenWasCreatedAt, "minutes") <= 5;
      if (!wasTokenCreatedWithin5Minutes) {
        await prisma.token.delete({
          where: {
            id: validationToken.id
          }
        });
        throw new BadRequestError(errors.auth.INVALID_EMAIL_TOKEN);
      }
      await prisma.$transaction([
        prisma.user.update({
          where: {
            id: userFromEmail.id
          },
          data: {
            emailValidatedAt: /* @__PURE__ */ new Date()
          }
        }),
        prisma.token.deleteMany({
          where: {
            userId: userFromEmail.id,
            type: "EMAIL_VALIDATION"
          }
        })
      ]);
      const token = await reply.jwtSign(
        {
          sub: userFromEmail.id
        },
        {
          expiresIn: "7d"
        }
      );
      return reply.status(201).send({
        token
      });
    }
  );
}

// src/http/routes/billing/get-organization-billing.ts
var import_zod32 = __toESM(require("zod"));

// ../../node_modules/.pnpm/@ucast+core@1.10.2/node_modules/@ucast/core/dist/es6m/index.mjs
var t = class {
  constructor(t3, e3) {
    this.operator = t3, this.value = e3, Object.defineProperty(this, "t", { writable: true });
  }
  get notes() {
    return this.t;
  }
  addNote(t3) {
    this.t = this.t || [], this.t.push(t3);
  }
};
var e = class extends t {
};
var r = class extends e {
  constructor(t3, e3) {
    if (!Array.isArray(e3)) throw new Error(`"${t3}" operator expects to receive an array of conditions`);
    super(t3, e3);
  }
};
var n = "__itself__";
var o = class extends t {
  constructor(t3, e3, r2) {
    super(t3, r2), this.field = e3;
  }
};
var s = new e("__null__", null);
var i = Object.prototype.hasOwnProperty.call.bind(Object.prototype.hasOwnProperty);
function c(t3, e3) {
  return e3 instanceof r && e3.operator === t3;
}
function u(t3, e3) {
  return 1 === e3.length ? e3[0] : new r(t3, function t4(e4, r2, n3) {
    const o3 = n3 || [];
    for (let n4 = 0, s3 = r2.length; n4 < s3; n4++) {
      const s4 = r2[n4];
      c(e4, s4) ? t4(e4, s4.value, o3) : o3.push(s4);
    }
    return o3;
  }(t3, e3));
}
var a = (t3) => t3;
var h = () => /* @__PURE__ */ Object.create(null);
var f = Object.defineProperty(h(), "__@type@__", { value: "ignore value" });
function l(t3, e3, r2 = false) {
  if (!t3 || t3 && t3.constructor !== Object) return false;
  for (const n3 in t3) {
    if (i(t3, n3) && i(e3, n3) && (!r2 || t3[n3] !== f)) return true;
  }
  return false;
}
function d(t3) {
  const e3 = [];
  for (const r2 in t3) i(t3, r2) && t3[r2] !== f && e3.push(r2);
  return e3;
}
function p(t3, e3) {
  e3 !== s && t3.push(e3);
}
var w = (t3) => u("and", t3);
var O = { compound(t3, e3, n3) {
  const o3 = (Array.isArray(e3) ? e3 : [e3]).map((t4) => n3.parse(t4));
  return new r(t3.name, o3);
}, field: (t3, e3, r2) => new o(t3.name, r2.field, e3), document: (t3, r2) => new e(t3.name, r2) };
var j = class {
  constructor(t3, e3 = h()) {
    this.o = void 0, this.s = void 0, this.i = void 0, this.u = void 0, this.h = void 0, this.parse = this.parse.bind(this), this.u = { operatorToConditionName: e3.operatorToConditionName || a, defaultOperatorName: e3.defaultOperatorName || "eq", mergeFinalConditions: e3.mergeFinalConditions || w }, this.o = Object.keys(t3).reduce((e4, r2) => (e4[r2] = Object.assign({ name: this.u.operatorToConditionName(r2) }, t3[r2]), e4), {}), this.s = Object.assign({}, e3.fieldContext, { field: "", query: {}, parse: this.parse, hasOperators: (t4) => l(t4, this.o, e3.useIgnoreValue) }), this.i = Object.assign({}, e3.documentContext, { parse: this.parse, query: {} }), this.h = e3.useIgnoreValue ? d : Object.keys;
  }
  setParse(t3) {
    this.parse = t3, this.s.parse = t3, this.i.parse = t3;
  }
  parseField(t3, e3, r2, n3) {
    const o3 = this.o[e3];
    if (!o3) throw new Error(`Unsupported operator "${e3}"`);
    if ("field" !== o3.type) throw new Error(`Unexpected ${o3.type} operator "${e3}" at field level`);
    return this.s.field = t3, this.s.query = n3, this.parseInstruction(o3, r2, this.s);
  }
  parseInstruction(t3, e3, r2) {
    "function" == typeof t3.validate && t3.validate(t3, e3);
    return (t3.parse || O[t3.type])(t3, e3, r2);
  }
  parseFieldOperators(t3, e3) {
    const r2 = [], n3 = this.h(e3);
    for (let o3 = 0, s3 = n3.length; o3 < s3; o3++) {
      const s4 = n3[o3];
      if (!this.o[s4]) throw new Error(`Field query for "${t3}" may contain only operators or a plain object as a value`);
      p(r2, this.parseField(t3, s4, e3[s4], e3));
    }
    return r2;
  }
  parse(t3) {
    const e3 = [], r2 = this.h(t3);
    this.i.query = t3;
    for (let n3 = 0, o3 = r2.length; n3 < o3; n3++) {
      const o4 = r2[n3], s3 = t3[o4], i4 = this.o[o4];
      if (i4) {
        if ("document" !== i4.type && "compound" !== i4.type) throw new Error(`Cannot use parsing instruction for operator "${o4}" in "document" context as it is supposed to be used in  "${i4.type}" context`);
        p(e3, this.parseInstruction(i4, s3, this.i));
      } else this.s.hasOperators(s3) ? e3.push(...this.parseFieldOperators(o4, s3)) : p(e3, this.parseField(o4, this.u.defaultOperatorName, s3, t3));
    }
    return this.u.mergeFinalConditions(e3);
  }
};
function _(t3, e3) {
  const r2 = t3[e3];
  if ("function" != typeof r2) throw new Error(`Unable to interpret "${e3}" condition. Did you forget to register interpreter for it?`);
  return r2;
}
function y(t3) {
  return t3.operator;
}
function m(t3, e3) {
  const r2 = e3, n3 = r2 && r2.getInterpreterName || y;
  let o3;
  switch (r2 ? r2.numberOfArguments : 0) {
    case 1:
      o3 = (e4) => {
        const o4 = n3(e4, r2);
        return _(t3, o4)(e4, s3);
      };
      break;
    case 3:
      o3 = (e4, o4, i4) => {
        const c4 = n3(e4, r2);
        return _(t3, c4)(e4, o4, i4, s3);
      };
      break;
    default:
      o3 = (e4, o4) => {
        const i4 = n3(e4, r2);
        return _(t3, i4)(e4, o4, s3);
      };
  }
  const s3 = Object.assign({}, r2, { interpret: o3 });
  return s3.interpret;
}
function v(t3, e3) {
  return (r2, ...n3) => {
    const o3 = t3(r2, ...n3), s3 = e3.bind(null, o3);
    return s3.ast = o3, s3;
  };
}
var x = j.prototype.parseInstruction;

// ../../node_modules/.pnpm/@ucast+mongo@2.4.3/node_modules/@ucast/mongo/dist/es6m/index.mjs
function s2(e3, t3) {
  if (!Array.isArray(t3)) throw new Error(`"${e3.name}" expects value to be an array`);
}
function p2(e3, t3) {
  if (s2(e3, t3), !t3.length) throw new Error(`"${e3.name}" expects to have at least one element in array`);
}
var l2 = (e3) => (t3, r2) => {
  if (typeof r2 !== e3) throw new Error(`"${t3.name}" expects value to be a "${e3}"`);
};
var c2 = { type: "compound", validate: p2, parse(t3, r2, { parse: o3 }) {
  const a4 = r2.map((e3) => o3(e3));
  return u(t3.name, a4);
} };
var f2 = c2;
var d2 = { type: "compound", validate: p2 };
var u2 = { type: "field", validate(e3, t3) {
  if (!(t3 && (t3 instanceof RegExp || t3.constructor === Object))) throw new Error(`"${e3.name}" expects to receive either regular expression or object of field operators`);
}, parse(e3, o3, a4) {
  const n3 = o3 instanceof RegExp ? new o("regex", a4.field, o3) : a4.parse(o3, a4);
  return new r(e3.name, [n3]);
} };
var $ = { type: "field", validate(e3, t3) {
  if (!t3 || t3.constructor !== Object) throw new Error(`"${e3.name}" expects to receive an object with nested query or field level operators`);
}, parse(e3, r2, { parse: a4, field: n3, hasOperators: i4 }) {
  const s3 = i4(r2) ? a4(r2, { field: n }) : a4(r2);
  return new o(e3.name, n3, s3);
} };
var w2 = { type: "field", validate: l2("number") };
var y2 = { type: "field", validate: s2 };
var x2 = y2;
var v2 = y2;
var h2 = { type: "field", validate(e3, t3) {
  if (!Array.isArray(t3) || 2 !== t3.length) throw new Error(`"${e3.name}" expects an array with 2 numeric elements`);
} };
var m2 = { type: "field", validate: l2("boolean") };
var g = { type: "field", validate: function(e3, t3) {
  if (!("string" == typeof t3 || "number" == typeof t3 || t3 instanceof Date)) throw new Error(`"${e3.name}" expects value to be comparable (i.e., string, number or date)`);
} };
var b = g;
var E = b;
var j2 = b;
var O2 = { type: "field" };
var R = O2;
var _2 = { type: "field", validate(e3, t3) {
  if (!(t3 instanceof RegExp) && "string" != typeof t3) throw new Error(`"${e3.name}" expects value to be a regular expression or a string that represents regular expression`);
}, parse(e3, r2, o3) {
  const a4 = "string" == typeof r2 ? new RegExp(r2, o3.query.$options || "") : r2;
  return new o(e3.name, o3.field, a4);
} };
var q = { type: "field", parse: () => s };
var A = { type: "document", validate: l2("function") };
var N = Object.freeze({ __proto__: null, $and: c2, $or: f2, $nor: d2, $not: u2, $elemMatch: $, $size: w2, $in: y2, $nin: x2, $all: v2, $mod: h2, $exists: m2, $gte: g, $gt: b, $lt: E, $lte: j2, $eq: O2, $ne: R, $regex: _2, $options: q, $where: A });
var P = class extends j {
  constructor(e3) {
    super(e3, { defaultOperatorName: "$eq", operatorToConditionName: (e4) => e4.slice(1) });
  }
  parse(e3, t3) {
    return t3 && t3.field ? w(this.parseFieldOperators(t3.field, e3)) : super.parse(e3);
  }
};
var z21 = N;

// ../../node_modules/.pnpm/@ucast+js@3.0.4/node_modules/@ucast/js/dist/es6m/index.mjs
function n2(r2, t3, n3) {
  for (let e3 = 0, o3 = r2.length; e3 < o3; e3++) if (0 === n3(r2[e3], t3)) return true;
  return false;
}
function e2(r2, t3) {
  return Array.isArray(r2) && Number.isNaN(Number(t3));
}
function o2(r2, t3, n3) {
  if (!e2(r2, t3)) return n3(r2, t3);
  let o3 = [];
  for (let e3 = 0; e3 < r2.length; e3++) {
    const u5 = n3(r2[e3], t3);
    void 0 !== u5 && (o3 = o3.concat(u5));
  }
  return o3;
}
function u3(r2) {
  return (t3, n3, e3) => {
    const o3 = e3.get(n3, t3.field);
    return Array.isArray(o3) ? o3.some((n4) => r2(t3, n4, e3)) : r2(t3, o3, e3);
  };
}
var c3 = (r2, t3) => r2[t3];
function i2(r2, t3, n3) {
  const e3 = t3.lastIndexOf(".");
  return -1 === e3 ? [r2, t3] : [n3(r2, t3.slice(0, e3)), t3.slice(e3 + 1)];
}
function f3(t3, n3, e3 = c3) {
  if (n3 === n) return t3;
  if (!t3) throw new Error(`Unable to get field "${n3}" out of ${String(t3)}.`);
  return function(r2, t4, n4) {
    if (-1 === t4.indexOf(".")) return o2(r2, t4, n4);
    const e4 = t4.split(".");
    let u5 = r2;
    for (let r3 = 0, t5 = e4.length; r3 < t5; r3++) if (u5 = o2(u5, e4[r3], n4), !u5 || "object" != typeof u5) return u5;
    return u5;
  }(t3, n3, e3);
}
function a2(r2, t3) {
  return r2 === t3 ? 0 : r2 > t3 ? 1 : -1;
}
function l3(r2, n3 = {}) {
  return m(r2, Object.assign({ get: f3, compare: a2 }, n3));
}
var p3 = (r2, t3, { interpret: n3 }) => r2.value.some((r3) => n3(r3, t3));
var g2 = (r2, t3, n3) => !p3(r2, t3, n3);
var m3 = (r2, t3, { interpret: n3 }) => r2.value.every((r3) => n3(r3, t3));
var y3 = (r2, t3, { interpret: n3 }) => !n3(r2.value[0], t3);
var b2 = (r2, t3, { compare: e3, get: o3 }) => {
  const u5 = o3(t3, r2.field);
  return Array.isArray(u5) && !Array.isArray(r2.value) ? n2(u5, r2.value, e3) : 0 === e3(u5, r2.value);
};
var A2 = (r2, t3, n3) => !b2(r2, t3, n3);
var d3 = u3((r2, t3, n3) => {
  const e3 = n3.compare(t3, r2.value);
  return 0 === e3 || -1 === e3;
});
var h3 = u3((r2, t3, n3) => -1 === n3.compare(t3, r2.value));
var j3 = u3((r2, t3, n3) => 1 === n3.compare(t3, r2.value));
var w3 = u3((r2, t3, n3) => {
  const e3 = n3.compare(t3, r2.value);
  return 0 === e3 || 1 === e3;
});
var _3 = (t3, n3, { get: o3 }) => {
  if (t3.field === n) return void 0 !== n3;
  const [u5, c4] = i2(n3, t3.field, o3), f4 = (r2) => null == r2 ? Boolean(r2) === t3.value : r2.hasOwnProperty(c4) === t3.value;
  return e2(u5, c4) ? u5.some(f4) : f4(u5);
};
var v3 = u3((r2, t3) => "number" == typeof t3 && t3 % r2.value[0] === r2.value[1]);
var x3 = (t3, n3, { get: o3 }) => {
  const [u5, c4] = i2(n3, t3.field, o3), f4 = (r2) => {
    const n4 = o3(r2, c4);
    return Array.isArray(n4) && n4.length === t3.value;
  };
  return t3.field !== n && e2(u5, c4) ? u5.some(f4) : f4(u5);
};
var O3 = u3((r2, t3) => "string" == typeof t3 && r2.value.test(t3));
var N2 = u3((r2, t3, { compare: e3 }) => n2(r2.value, t3, e3));
var $2 = (r2, t3, n3) => !N2(r2, t3, n3);
var q2 = (r2, t3, { compare: e3, get: o3 }) => {
  const u5 = o3(t3, r2.field);
  return Array.isArray(u5) && r2.value.every((r3) => n2(u5, r3, e3));
};
var z22 = (r2, t3, { interpret: n3, get: e3 }) => {
  const o3 = e3(t3, r2.field);
  return Array.isArray(o3) && o3.some((t4) => n3(r2.value, t4));
};
var B = (r2, t3) => r2.value.call(t3);
var E2 = Object.freeze({ __proto__: null, or: p3, nor: g2, and: m3, not: y3, eq: b2, ne: A2, lte: d3, lt: h3, gt: j3, gte: w3, exists: _3, mod: v3, size: x3, regex: O3, within: N2, nin: $2, all: q2, elemMatch: z22, where: B });
var M = Object.assign({}, E2, { in: N2 });
var S = l3(M);

// ../../node_modules/.pnpm/@ucast+mongo2js@1.3.4/node_modules/@ucast/mongo2js/dist/es6m/index.mjs
function i3(o3) {
  return o3 instanceof Date ? o3.getTime() : o3 && "function" == typeof o3.toJSON ? o3.toJSON() : o3;
}
var m4 = (o3, t3) => a2(i3(o3), i3(t3));
function p4(e3, c4, f4) {
  const s3 = new P(e3), i4 = l3(c4, Object.assign({ compare: m4 }, f4));
  if (f4 && f4.forPrimitives) {
    const o3 = { field: n }, r2 = s3.parse;
    s3.setParse((t3) => r2(t3, o3));
  }
  return v(s3.parse, i4);
}
var a3 = p4(z21, M);
var u4 = p4(["$and", "$or"].reduce((o3, t3) => (o3[t3] = Object.assign({}, o3[t3], { type: "field" }), o3), Object.assign({}, z21, { $nor: Object.assign({}, z21.$nor, { type: "field", parse: O.compound }) })), M, { forPrimitives: true });

// ../../node_modules/.pnpm/@casl+ability@6.7.2/node_modules/@casl/ability/dist/es6m/index.mjs
function O4(t3) {
  return Array.isArray(t3) ? t3 : [t3];
}
var C = "__caslSubjectType__";
var P2 = (t3) => {
  const i4 = typeof t3;
  return i4 === "string" || i4 === "function";
};
var S2 = (t3) => t3.modelName || t3.name;
function T(t3) {
  return typeof t3 === "string" ? t3 : S2(t3);
}
function z23(t3) {
  if (Object.hasOwn(t3, C)) return t3[C];
  return S2(t3.constructor);
}
var B2 = { function: (t3) => t3.constructor, string: z23 };
function U(t3, i4, e3) {
  for (let s3 = e3; s3 < i4.length; s3++) t3.push(i4[s3]);
}
function G(t3, i4) {
  if (!t3 || !t3.length) return i4 || [];
  if (!i4 || !i4.length) return t3 || [];
  let e3 = 0;
  let s3 = 0;
  const n3 = [];
  while (e3 < t3.length && s3 < i4.length) if (t3[e3].priority < i4[s3].priority) {
    n3.push(t3[e3]);
    e3++;
  } else {
    n3.push(i4[s3]);
    s3++;
  }
  U(n3, t3, e3);
  U(n3, i4, s3);
  return n3;
}
function H(t3, i4, e3) {
  let s3 = t3.get(i4);
  if (!s3) {
    s3 = e3();
    t3.set(i4, s3);
  }
  return s3;
}
var I = (t3) => t3;
function J(t3, i4) {
  if (Array.isArray(t3.fields) && !t3.fields.length) throw new Error("`rawRule.fields` cannot be an empty array. https://bit.ly/390miLa");
  if (t3.fields && !i4.fieldMatcher) throw new Error('You need to pass "fieldMatcher" option in order to restrict access by fields');
  if (t3.conditions && !i4.conditionsMatcher) throw new Error('You need to pass "conditionsMatcher" option in order to restrict access by conditions');
}
var K = class {
  constructor(t3, i4, e3 = 0) {
    J(t3, i4);
    this.action = i4.resolveAction(t3.action);
    this.subject = t3.subject;
    this.inverted = !!t3.inverted;
    this.conditions = t3.conditions;
    this.reason = t3.reason;
    this.origin = t3;
    this.fields = t3.fields ? O4(t3.fields) : void 0;
    this.priority = e3;
    this.t = i4;
  }
  i() {
    if (this.conditions && !this.o) this.o = this.t.conditionsMatcher(this.conditions);
    return this.o;
  }
  get ast() {
    const t3 = this.i();
    return t3 ? t3.ast : void 0;
  }
  matchesConditions(t3) {
    if (!this.conditions) return true;
    if (!t3 || P2(t3)) return !this.inverted;
    const i4 = this.i();
    return i4(t3);
  }
  matchesField(t3) {
    if (!this.fields) return true;
    if (!t3) return !this.inverted;
    if (this.fields && !this.u) this.u = this.t.fieldMatcher(this.fields);
    return this.u(t3);
  }
};
function N3(t3, i4) {
  const e3 = { value: t3, prev: i4, next: null };
  if (i4) i4.next = e3;
  return e3;
}
function Q(t3) {
  if (t3.next) t3.next.prev = t3.prev;
  if (t3.prev) t3.prev.next = t3.next;
  t3.next = t3.prev = null;
}
var V = (t3) => ({ value: t3.value, prev: t3.prev, next: t3.next });
var W = () => ({ rules: [], merged: false });
var X = () => /* @__PURE__ */ new Map();
var Z = class {
  constructor(t3 = [], i4 = {}) {
    this.h = false;
    this.l = /* @__PURE__ */ new Map();
    this.p = { conditionsMatcher: i4.conditionsMatcher, fieldMatcher: i4.fieldMatcher, resolveAction: i4.resolveAction || I };
    this.$ = i4.anyAction || "manage";
    this.A = i4.anySubjectType || "all";
    this.m = t3;
    this.M = !!i4.detectSubjectType;
    this.j = i4.detectSubjectType || z23;
    this.v(t3);
  }
  get rules() {
    return this.m;
  }
  detectSubjectType(t3) {
    if (P2(t3)) return t3;
    if (!t3) return this.A;
    return this.j(t3);
  }
  update(t3) {
    const i4 = { rules: t3, ability: this, target: this };
    this._("update", i4);
    this.m = t3;
    this.v(t3);
    this._("updated", i4);
    return this;
  }
  v(t3) {
    const i4 = /* @__PURE__ */ new Map();
    let e3;
    for (let s3 = t3.length - 1; s3 >= 0; s3--) {
      const n3 = t3.length - s3 - 1;
      const r2 = new K(t3[s3], this.p, n3);
      const o3 = O4(r2.action);
      const c4 = O4(r2.subject || this.A);
      if (!this.h && r2.fields) this.h = true;
      for (let t4 = 0; t4 < c4.length; t4++) {
        const s4 = H(i4, c4[t4], X);
        if (e3 === void 0) e3 = typeof c4[t4];
        if (typeof c4[t4] !== e3 && e3 !== "mixed") e3 = "mixed";
        for (let t5 = 0; t5 < o3.length; t5++) H(s4, o3[t5], W).rules.push(r2);
      }
    }
    this.l = i4;
    if (e3 !== "mixed" && !this.M) {
      const t4 = B2[e3] || B2.string;
      this.j = t4;
    }
  }
  possibleRulesFor(t3, i4 = this.A) {
    if (!P2(i4)) throw new Error('"possibleRulesFor" accepts only subject types (i.e., string or class) as the 2nd parameter');
    const e3 = H(this.l, i4, X);
    const s3 = H(e3, t3, W);
    if (s3.merged) return s3.rules;
    const n3 = t3 !== this.$ && e3.has(this.$) ? e3.get(this.$).rules : void 0;
    let r2 = G(s3.rules, n3);
    if (i4 !== this.A) r2 = G(r2, this.possibleRulesFor(t3, this.A));
    s3.rules = r2;
    s3.merged = true;
    return r2;
  }
  rulesFor(t3, i4, e3) {
    const s3 = this.possibleRulesFor(t3, i4);
    if (e3 && typeof e3 !== "string") throw new Error("The 3rd, `field` parameter is expected to be a string. See https://stalniy.github.io/casl/en/api/casl-ability#can-of-pure-ability for details");
    if (!this.h) return s3;
    return s3.filter((t4) => t4.matchesField(e3));
  }
  actionsFor(t3) {
    if (!P2(t3)) throw new Error('"actionsFor" accepts only subject types (i.e., string or class) as a parameter');
    const i4 = /* @__PURE__ */ new Set();
    const e3 = this.l.get(t3);
    if (e3) Array.from(e3.keys()).forEach((t4) => i4.add(t4));
    const s3 = t3 !== this.A ? this.l.get(this.A) : void 0;
    if (s3) Array.from(s3.keys()).forEach((t4) => i4.add(t4));
    return Array.from(i4);
  }
  on(t3, i4) {
    this.F = this.F || /* @__PURE__ */ new Map();
    const e3 = this.F;
    const s3 = e3.get(t3) || null;
    const n3 = N3(i4, s3);
    e3.set(t3, n3);
    return () => {
      const i5 = e3.get(t3);
      if (!n3.next && !n3.prev && i5 === n3) e3.delete(t3);
      else if (n3 === i5) e3.set(t3, n3.prev);
      Q(n3);
    };
  }
  _(t3, i4) {
    if (!this.F) return;
    let e3 = this.F.get(t3) || null;
    while (e3 !== null) {
      const t4 = e3.prev ? V(e3.prev) : null;
      e3.value(i4);
      e3 = t4;
    }
  }
};
var PureAbility = class extends Z {
  can(t3, i4, e3) {
    const s3 = this.relevantRuleFor(t3, i4, e3);
    return !!s3 && !s3.inverted;
  }
  relevantRuleFor(t3, i4, e3) {
    const s3 = this.detectSubjectType(i4);
    const n3 = this.rulesFor(t3, s3, e3);
    for (let t4 = 0, e4 = n3.length; t4 < e4; t4++) if (n3[t4].matchesConditions(i4)) return n3[t4];
    return null;
  }
  cannot(t3, i4, e3) {
    return !this.can(t3, i4, e3);
  }
};
var tt = { $eq: O2, $ne: R, $lt: E, $lte: j2, $gt: b, $gte: g, $in: y2, $nin: x2, $all: v2, $size: w2, $regex: _2, $options: q, $elemMatch: $, $exists: m2 };
var it = { eq: b2, ne: A2, lt: h3, lte: d3, gt: j3, gte: w3, in: N2, nin: $2, all: q2, size: x3, regex: O3, elemMatch: z22, exists: _3, and: m3 };
var st = p4(tt, it);
var nt = /[-/\\^$+?.()|[\]{}]/g;
var rt = /\.?\*+\.?/g;
var ot = /\*+/;
var ct = /\./g;
function ut(t3, i4, e3) {
  const s3 = e3[0] === "*" || t3[0] === "." && t3[t3.length - 1] === "." ? "+" : "*";
  const n3 = t3.indexOf("**") === -1 ? "[^.]" : ".";
  const r2 = t3.replace(ct, "\\$&").replace(ot, n3 + s3);
  return i4 + t3.length === e3.length ? `(?:${r2})?` : r2;
}
function ht(t3, i4, e3) {
  if (t3 === "." && (e3[i4 - 1] === "*" || e3[i4 + 1] === "*")) return t3;
  return `\\${t3}`;
}
function lt(t3) {
  const i4 = t3.map((t4) => t4.replace(nt, ht).replace(rt, ut));
  const e3 = i4.length > 1 ? `(?:${i4.join("|")})` : i4[0];
  return new RegExp(`^${e3}$`);
}
var at = (t3) => {
  let i4;
  return (e3) => {
    if (typeof i4 === "undefined") i4 = t3.every((t4) => t4.indexOf("*") === -1) ? null : lt(t3);
    return i4 === null ? t3.indexOf(e3) !== -1 : i4.test(e3);
  };
};
function createMongoAbility(t3 = [], i4 = {}) {
  return new PureAbility(t3, Object.assign({ conditionsMatcher: st, fieldMatcher: at }, i4));
}
function isAbilityClass(t3) {
  return t3.prototype !== void 0 && typeof t3.prototype.possibleRulesFor === "function";
}
var ft = class {
  constructor(t3) {
    this.O = t3;
  }
  because(t3) {
    this.O.reason = t3;
    return this;
  }
};
var AbilityBuilder = class {
  constructor(t3) {
    this.rules = [];
    this.C = t3;
    this.can = (t4, i4, e3, s3) => this.R(t4, i4, e3, s3, false);
    this.cannot = (t4, i4, e3, s3) => this.R(t4, i4, e3, s3, true);
    this.build = (t4) => isAbilityClass(this.C) ? new this.C(this.rules, t4) : this.C(this.rules, t4);
  }
  R(t3, i4, e3, s3, n3) {
    const r2 = { action: t3 };
    if (n3) r2.inverted = n3;
    if (i4) {
      r2.subject = i4;
      if (Array.isArray(e3) || typeof e3 === "string") r2.fields = e3;
      else if (typeof e3 !== "undefined") r2.conditions = e3;
      if (typeof s3 !== "undefined") r2.conditions = s3;
    }
    this.rules.push(r2);
    return new ft(r2);
  }
};
var dt = (t3) => `Cannot execute "${t3.action}" on "${t3.subjectType}"`;
var yt = function t2(i4) {
  this.message = i4;
};
yt.prototype = Object.create(Error.prototype);
var ForbiddenError = class extends yt {
  static setDefaultMessage(t3) {
    this.P = typeof t3 === "string" ? () => t3 : t3;
  }
  static from(t3) {
    return new this(t3);
  }
  constructor(t3) {
    super("");
    this.ability = t3;
    if (typeof Error.captureStackTrace === "function") {
      this.name = "ForbiddenError";
      Error.captureStackTrace(this, this.constructor);
    }
  }
  setMessage(t3) {
    this.message = t3;
    return this;
  }
  throwUnlessCan(t3, i4, e3) {
    const s3 = this.unlessCan(t3, i4, e3);
    if (s3) throw s3;
  }
  unlessCan(t3, i4, e3) {
    const s3 = this.ability.relevantRuleFor(t3, i4, e3);
    if (s3 && !s3.inverted) return;
    this.action = t3;
    this.subject = i4;
    this.subjectType = T(this.ability.detectSubjectType(i4));
    this.field = e3;
    const n3 = s3 ? s3.reason : "";
    this.message = this.message || n3 || this.constructor.P(this);
    return this;
  }
};
ForbiddenError.P = dt;
var pt = Object.freeze({ __proto__: null });

// ../../packages/auth/src/index.ts
var import_zod31 = require("zod");

// ../../packages/auth/src/messages/error.ts
var errors2 = {
  PERMISSIONS_NOT_FOUND: "Permissions for role {role} not found"
};

// ../../packages/auth/src/permissions.ts
var permissions = {
  ADMIN(user, { can, cannot }) {
    can("manage", "all");
    cannot(["update", "transfer_ownership"], "Organization");
    can(["update", "transfer_ownership"], "Organization", {
      ownerId: { $eq: user.id }
    });
  },
  MEMBER(user, { can }) {
    can("get", "User");
    can(["create", "get"], "Project");
    can(["update", "delete"], "Project", {
      ownerId: { $eq: user.id }
    });
  },
  BILLING(_4, { can }) {
    can("get", "User");
    can("get", "Project");
    can("manage", "Billing");
  }
};

// ../../packages/auth/src/subjects/billing.ts
var import_zod22 = require("zod");
var billingSubject = import_zod22.z.tuple([
  import_zod22.z.union([import_zod22.z.literal("manage"), import_zod22.z.literal("get"), import_zod22.z.literal("export")]),
  import_zod22.z.literal("Billing")
]);

// ../../packages/auth/src/subjects/invite.ts
var import_zod23 = require("zod");
var inviteSubject = import_zod23.z.tuple([
  import_zod23.z.union([
    import_zod23.z.literal("manage"),
    import_zod23.z.literal("get"),
    import_zod23.z.literal("create"),
    import_zod23.z.literal("delete")
  ]),
  import_zod23.z.literal("Invite")
]);

// ../../packages/auth/src/subjects/organization.ts
var import_zod25 = require("zod");

// ../../packages/auth/src/models/organization.ts
var import_zod24 = require("zod");
var organizationSchema = import_zod24.z.object({
  __typename: import_zod24.z.literal("Organization").default("Organization"),
  id: import_zod24.z.string(),
  ownerId: import_zod24.z.string()
});

// ../../packages/auth/src/subjects/organization.ts
var organizationSubject = import_zod25.z.tuple([
  import_zod25.z.union([
    import_zod25.z.literal("manage"),
    import_zod25.z.literal("update"),
    import_zod25.z.literal("delete"),
    import_zod25.z.literal("transfer_ownership")
  ]),
  import_zod25.z.union([import_zod25.z.literal("Organization"), organizationSchema])
]);

// ../../packages/auth/src/subjects/project.ts
var import_zod27 = require("zod");

// ../../packages/auth/src/models/project.ts
var import_zod26 = require("zod");
var projectSchema = import_zod26.z.object({
  __typename: import_zod26.z.literal("Project").default("Project"),
  id: import_zod26.z.string(),
  ownerId: import_zod26.z.string()
});

// ../../packages/auth/src/subjects/project.ts
var projectSubject = import_zod27.z.tuple([
  import_zod27.z.union([
    import_zod27.z.literal("manage"),
    import_zod27.z.literal("get"),
    import_zod27.z.literal("create"),
    import_zod27.z.literal("update"),
    import_zod27.z.literal("delete")
  ]),
  import_zod27.z.union([import_zod27.z.literal("Project"), projectSchema])
]);

// ../../packages/auth/src/subjects/user.ts
var import_zod28 = require("zod");
var userSubject = import_zod28.z.tuple([
  import_zod28.z.union([
    import_zod28.z.literal("manage"),
    import_zod28.z.literal("get"),
    import_zod28.z.literal("create"),
    import_zod28.z.literal("update"),
    import_zod28.z.literal("delete")
  ]),
  import_zod28.z.literal("User")
]);

// ../../packages/auth/src/models/user.ts
var import_zod30 = require("zod");

// ../../packages/auth/src/roles.ts
var import_zod29 = require("zod");
var rolesSchema = import_zod29.z.union([
  import_zod29.z.literal("ADMIN"),
  import_zod29.z.literal("MEMBER"),
  import_zod29.z.literal("BILLING")
]);

// ../../packages/auth/src/models/user.ts
var userSchema = import_zod30.z.object({
  // __typename: z.literal('User').default('User'),
  id: import_zod30.z.string(),
  role: rolesSchema
});

// ../../packages/auth/src/index.ts
var appAbilitiesSchema = import_zod31.z.union([
  userSubject,
  projectSubject,
  organizationSubject,
  inviteSubject,
  billingSubject,
  import_zod31.z.tuple([import_zod31.z.literal("manage"), import_zod31.z.literal("all")])
]);
var createAppAbility = createMongoAbility;
function defineAbilityFor(user) {
  const builder = new AbilityBuilder(createAppAbility);
  if (typeof permissions[user.role] !== "function") {
    throw new Error(errors2.PERMISSIONS_NOT_FOUND.replace("{role}", user.role));
  }
  permissions[user.role](user, builder);
  const ability = builder.build({
    detectSubjectType(subject) {
      return subject.__typename;
    }
  });
  ability.can = ability.can.bind(ability);
  ability.cannot = ability.cannot.bind(ability);
  return ability;
}

// src/utils/get-user-permissions.ts
function getUserPermissions(userId, role) {
  const authUser = userSchema.parse({
    id: userId,
    role
  });
  const ability = defineAbilityFor(authUser);
  return ability;
}

// src/http/routes/billing/get-organization-billing.ts
async function getOrganizationBilling(app2) {
  app2.withTypeProvider().register(auth).get(
    "/organizations/:slug/billing",
    {
      schema: {
        tags: ["Billing"],
        summary: "Get billing information from organization.",
        security: [{ bearerAuth: [] }],
        params: import_zod32.default.object({
          slug: import_zod32.default.string()
        }),
        response: {
          200: import_zod32.default.object({
            billing: import_zod32.default.object({
              seats: import_zod32.default.object({
                amount: import_zod32.default.coerce.number(),
                unit: import_zod32.default.coerce.number(),
                price: import_zod32.default.coerce.number()
              }),
              projects: import_zod32.default.object({
                amount: import_zod32.default.coerce.number(),
                unit: import_zod32.default.coerce.number(),
                price: import_zod32.default.coerce.number()
              }),
              total: import_zod32.default.coerce.number()
            })
          })
        }
      }
    },
    async (request) => {
      const { slug } = request.params;
      const userId = await request.getCurrentUserId();
      const { membership, organization } = await request.getCurrentUserMembership(slug);
      const { cannot } = getUserPermissions(userId, membership.role);
      if (cannot("get", "Billing")) {
        throw new UnauthorizedError(errors.organizations.billing.CANNOT_LIST);
      }
      const [amountOfMembers, amountOfProjects] = await Promise.all([
        prisma.member.count({
          where: {
            organizationId: organization.id,
            role: { not: "BILLING" }
          }
        }),
        prisma.project.count({
          where: {
            organizationId: organization.id
          }
        })
      ]);
      const billing = {
        seats: {
          amount: amountOfMembers,
          unit: 10.25,
          price: Number((amountOfMembers * 10.25).toFixed(2))
        },
        projects: {
          amount: amountOfProjects,
          unit: 20.33,
          price: Number((amountOfProjects * 20.33).toFixed(2))
        },
        total: Number((amountOfMembers * 10.25).toFixed(2)) + Number((amountOfProjects * 20.33).toFixed(2))
      };
      return { billing };
    }
  );
}

// src/http/routes/invites/accept-invite.ts
var import_zod33 = __toESM(require("zod"));
async function acceptInvite(app2) {
  app2.withTypeProvider().register(auth).post(
    "/invites/:inviteId/accept",
    {
      schema: {
        tags: ["Invites"],
        summary: "Accept an invite.",
        security: [{ bearerAuth: [] }],
        params: import_zod33.default.object({
          inviteId: import_zod33.default.string().uuid()
        }),
        response: {
          204: import_zod33.default.null()
        }
      }
    },
    async (request, reply) => {
      const userId = await request.getCurrentUserId();
      const { inviteId } = request.params;
      const invite = await prisma.invite.findUnique({
        where: { id: inviteId }
      });
      if (!invite) {
        throw new BadRequestError(errors.organizations.invites.NOT_FOUND);
      }
      const user = await prisma.user.findUnique({
        where: {
          id: userId
        }
      });
      if (!user) {
        throw new BadRequestError(errors.user.NOT_FOUND);
      }
      if (invite.email !== user.email) {
        throw new BadRequestError(errors.organizations.invites.NOT_ALLOWED);
      }
      await prisma.$transaction([
        prisma.member.create({
          data: {
            userId,
            organizationId: invite.organizationId,
            role: invite.role
          }
        }),
        prisma.invite.delete({
          where: {
            id: invite.id
          }
        })
      ]);
      return reply.status(204).send();
    }
  );
}

// src/http/routes/invites/create-invite.ts
var import_zod34 = __toESM(require("zod"));

// src/http/emails/template/create-invite-email.template.ts
function createInviteEmailTemplate({
  authorName,
  organizationName,
  role,
  acceptLink,
  rejectLink
}) {
  function renderRoleName() {
    switch (role) {
      case "ADMIN":
        return "owner";
      case "MEMBER":
        return "member";
      case "BILLING":
        return "billing member";
    }
  }
  return `
		<p style="margin:0 0 0.25rem;line-height:1.5;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;font-size:14px;">
			Hi,
		</p>
		<p style="margin:0 0 1rem;line-height:1.5;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;font-size:14px;">
			${authorName} has invited you to join <strong>${organizationName}</strong> as ${renderRoleName()}. We would love to have you as part of our team!
		</p>
		<p style="margin:0 0 0.25rem;line-height:1.5;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;font-size:14px;">
			To accept the invitation, click the link below:
		</p>
		<p style="margin:0 0 1rem;line-height:1.5;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;font-size:14px;">
			<a href="${acceptLink}" style="text-decoration:underline;color:currentColor;font-weight:bold;">Accept Invite</a>
		</p>
		<p style="margin:0 0 0.25rem;line-height:1.5;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;font-size:14px;">
			 If you do not wish to join, you can decline the invitation using this link:
		</p>
		<p style="margin:0 0 1rem;line-height:1.5;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;font-size:14px;">
			<a href="${rejectLink}" style="text-decoration:underline;color:currentColor;font-weight:bold;">Reject Invite</a>
		</p>
		<p style="margin:0 0 1rem;line-height:1.5;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;font-size:14px;">
			If you have any questions or need further assistance, feel free to reach out to us.
		</p>
		<p style="margin:0 0 0.25rem;line-height:1.5;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;font-size:14px;">
			Best regards,
			<br />
			<strong>${organizationName} Team</strong>
		</p>
	`;
}

// src/http/emails/create-invite-email-email.ts
async function createInviteEmail({
  inviteId,
  authorName,
  organizationName,
  role,
  targetEmail
}) {
  const htmlTemplate = createInviteEmailTemplate({
    authorName,
    organizationName,
    role,
    acceptLink: `${env.NEXT_PUBLIC_URL}/invite/${inviteId}`,
    rejectLink: `${env.NEXT_PUBLIC_URL}/invite/${inviteId}/decline`
  });
  const emailOptions = {
    from: env.MAIL_SMTP_EMAIL,
    to: targetEmail,
    subject: `Invitation to Join ${organizationName}`,
    html: htmlTemplate
  };
  await emailService.sendMail(emailOptions);
}

// src/http/routes/invites/create-invite.ts
async function createInvite(app2) {
  app2.withTypeProvider().register(auth).post(
    "/organization/:slug/invites",
    {
      schema: {
        tags: ["Invites"],
        summary: "Create a new invite.",
        security: [{ bearerAuth: [] }],
        params: import_zod34.default.object({
          slug: import_zod34.default.string()
        }),
        body: import_zod34.default.object({
          email: import_zod34.default.string().email(),
          role: rolesSchema
        }),
        response: {
          201: import_zod34.default.object({
            inviteId: import_zod34.default.string().uuid()
          })
        }
      }
    },
    async (request, reply) => {
      const { slug } = request.params;
      const userId = await request.getCurrentUserId();
      const { organization, membership } = await request.getCurrentUserMembership(slug);
      const { cannot } = getUserPermissions(userId, membership.role);
      if (cannot("create", "Invite")) {
        throw new UnauthorizedError(errors.organizations.invites.CANNOT_SEND);
      }
      const { email, role } = request.body;
      const domain = email.split("@").at(1);
      if (organization.shouldAttachUsersByDomain && organization.domain === domain) {
        throw new BadRequestError(
          errors.organizations.invites.AUTOJOIN_DOMAIN.replace(
            "{domain}",
            domain
          )
        );
      }
      const inviteWithSameEmail = await prisma.invite.findUnique({
        where: {
          email_organizationId: {
            email,
            organizationId: organization.id
          }
        }
      });
      if (inviteWithSameEmail) {
        throw new BadRequestError(errors.organizations.invites.ALREADY_EXISTS);
      }
      const memberWithSameEmail = await prisma.member.findFirst({
        where: {
          organizationId: organization.id,
          user: {
            email
          }
        }
      });
      if (memberWithSameEmail) {
        throw new BadRequestError(errors.organizations.invites.ALREADY_MEMBER);
      }
      const { id } = await prisma.invite.create({
        data: {
          organizationId: organization.id,
          authorId: userId,
          email,
          role
        }
      });
      const invite = await prisma.invite.findUnique({
        where: { id },
        include: {
          author: true,
          organization: true
        }
      });
      if (!invite) {
        throw new BadRequestError(errors.organizations.invites.NOT_FOUND);
      }
      try {
        await createInviteEmail({
          inviteId: invite.id,
          authorName: invite.author?.name ?? "",
          organizationName: invite.organization.name,
          role: invite.role,
          targetEmail: email
        });
      } catch {
        throw new BadRequestError(errors.services.SEND_EMAIL);
      }
      return reply.status(201).send({
        inviteId: invite.id
      });
    }
  );
}

// src/http/routes/invites/get-invite.ts
var import_zod35 = __toESM(require("zod"));
async function getInvite(app2) {
  app2.withTypeProvider().get(
    "/invites/:inviteId",
    {
      schema: {
        tags: ["Invites"],
        summary: "Get an invite details.",
        params: import_zod35.default.object({
          inviteId: import_zod35.default.string().uuid()
        }),
        response: {
          200: import_zod35.default.object({
            invite: import_zod35.default.object({
              id: import_zod35.default.string().uuid(),
              email: import_zod35.default.string().email(),
              role: rolesSchema,
              createdAt: import_zod35.default.date(),
              author: import_zod35.default.object({
                id: import_zod35.default.string().uuid(),
                name: import_zod35.default.string().nullable(),
                email: import_zod35.default.string().email(),
                avatarUrl: import_zod35.default.string().nullable()
              }).nullable(),
              organization: import_zod35.default.object({
                name: import_zod35.default.string()
              })
            })
          })
        }
      }
    },
    async (request, reply) => {
      const { inviteId } = request.params;
      const invite = await prisma.invite.findUnique({
        where: { id: inviteId },
        select: {
          id: true,
          email: true,
          role: true,
          createdAt: true,
          author: {
            select: {
              id: true,
              name: true,
              avatarUrl: true,
              email: true
            }
          },
          organization: {
            select: {
              name: true
            }
          }
        }
      });
      if (!invite) {
        throw new BadRequestError(errors.organizations.invites.NOT_FOUND);
      }
      return reply.status(200).send({
        invite
      });
    }
  );
}

// src/http/routes/invites/get-invites.ts
var import_zod36 = __toESM(require("zod"));
async function getInvites(app2) {
  app2.withTypeProvider().register(auth).get(
    "/organization/:slug/invites",
    {
      schema: {
        tags: ["Invites"],
        summary: "Get organization invites.",
        security: [{ bearerAuth: [] }],
        params: import_zod36.default.object({
          slug: import_zod36.default.string()
        }),
        response: {
          200: import_zod36.default.object({
            invites: import_zod36.default.array(
              import_zod36.default.object({
                id: import_zod36.default.string().uuid(),
                email: import_zod36.default.string().email(),
                role: rolesSchema,
                createdAt: import_zod36.default.date(),
                author: import_zod36.default.object({
                  id: import_zod36.default.string().uuid(),
                  name: import_zod36.default.string().nullable()
                }).nullable()
              })
            )
          })
        }
      }
    },
    async (request, reply) => {
      const { slug } = request.params;
      const userId = await request.getCurrentUserId();
      const { organization, membership } = await request.getCurrentUserMembership(slug);
      const { cannot } = getUserPermissions(userId, membership.role);
      if (cannot("get", "Invite")) {
        throw new UnauthorizedError(errors.organizations.invites.CANNOT_LIST);
      }
      const invites = await prisma.invite.findMany({
        where: {
          organizationId: organization.id
        },
        orderBy: {
          createdAt: "desc"
        },
        select: {
          id: true,
          email: true,
          role: true,
          createdAt: true,
          author: {
            select: {
              id: true,
              name: true
            }
          }
        }
      });
      return reply.status(201).send({
        invites
      });
    }
  );
}

// src/http/routes/invites/get-pending-invites.ts
var import_zod37 = __toESM(require("zod"));
async function getPendingInvites(app2) {
  app2.withTypeProvider().register(auth).get(
    "/pending-invites",
    {
      schema: {
        tags: ["Invites"],
        summary: "Get all user pending invites.",
        security: [{ bearerAuth: [] }],
        response: {
          200: import_zod37.default.object({
            invites: import_zod37.default.array(
              import_zod37.default.object({
                id: import_zod37.default.string().uuid(),
                email: import_zod37.default.string().email(),
                role: rolesSchema,
                createdAt: import_zod37.default.date(),
                author: import_zod37.default.object({
                  id: import_zod37.default.string().uuid(),
                  name: import_zod37.default.string().nullable(),
                  avatarUrl: import_zod37.default.string().nullable()
                }).nullable(),
                organization: import_zod37.default.object({
                  name: import_zod37.default.string()
                })
              })
            )
          })
        }
      }
    },
    async (request) => {
      const userId = await request.getCurrentUserId();
      const user = await prisma.user.findUnique({
        where: {
          id: userId
        }
      });
      if (!user) {
        throw new BadRequestError(errors.user.NOT_FOUND);
      }
      const invites = await prisma.invite.findMany({
        where: {
          email: user.email
        },
        select: {
          id: true,
          email: true,
          role: true,
          createdAt: true,
          author: {
            select: {
              id: true,
              name: true,
              avatarUrl: true
            }
          },
          organization: {
            select: {
              name: true
            }
          }
        }
      });
      return { invites };
    }
  );
}

// src/http/routes/invites/reject-invite.ts
var import_zod38 = __toESM(require("zod"));
async function rejectInvite(app2) {
  app2.withTypeProvider().register(auth).post(
    "/invites/:inviteId/reject",
    {
      schema: {
        tags: ["Invites"],
        summary: "Reject an invite.",
        security: [{ bearerAuth: [] }],
        params: import_zod38.default.object({
          inviteId: import_zod38.default.string().uuid()
        }),
        response: {
          204: import_zod38.default.null()
        }
      }
    },
    async (request, reply) => {
      const userId = await request.getCurrentUserId();
      const { inviteId } = request.params;
      const invite = await prisma.invite.findUnique({
        where: { id: inviteId }
      });
      if (!invite) {
        throw new BadRequestError(errors.organizations.invites.NOT_FOUND);
      }
      const user = await prisma.user.findUnique({
        where: {
          id: userId
        }
      });
      if (!user) {
        throw new BadRequestError(errors.user.NOT_FOUND);
      }
      if (invite.email !== user.email) {
        throw new BadRequestError(errors.organizations.invites.NOT_ALLOWED);
      }
      await prisma.invite.delete({
        where: {
          id: invite.id
        }
      });
      return reply.status(204).send();
    }
  );
}

// src/http/routes/invites/revoke-invite.ts
var import_zod39 = __toESM(require("zod"));
async function revokeInvite(app2) {
  app2.withTypeProvider().register(auth).delete(
    "/organization/:slug/invites/:inviteId",
    {
      schema: {
        tags: ["Invites"],
        summary: "Revoke an invite.",
        security: [{ bearerAuth: [] }],
        params: import_zod39.default.object({
          slug: import_zod39.default.string(),
          inviteId: import_zod39.default.string().uuid()
        }),
        response: {
          204: import_zod39.default.null()
        }
      }
    },
    async (request, reply) => {
      const { slug, inviteId } = request.params;
      const userId = await request.getCurrentUserId();
      const { organization, membership } = await request.getCurrentUserMembership(slug);
      const { cannot } = getUserPermissions(userId, membership.role);
      if (cannot("delete", "Invite")) {
        throw new UnauthorizedError(
          errors.organizations.invites.CANNOT_REVOKE
        );
      }
      const invite = await prisma.invite.findUnique({
        where: {
          id: inviteId,
          organizationId: organization.id
        }
      });
      if (!invite) {
        throw new BadRequestError(errors.organizations.invites.NOT_FOUND);
      }
      await prisma.invite.delete({
        where: {
          id: inviteId,
          organizationId: organization.id
        }
      });
      return reply.status(204).send();
    }
  );
}

// src/http/routes/members/get-members.ts
var import_zod40 = __toESM(require("zod"));
async function getMembers(app2) {
  app2.withTypeProvider().register(auth).get(
    "/organization/:slug/members",
    {
      schema: {
        tags: ["Organization members"],
        summary: "Show organization members list.",
        security: [{ bearerAuth: [] }],
        params: import_zod40.default.object({
          slug: import_zod40.default.string()
        }),
        response: {
          200: import_zod40.default.object({
            members: import_zod40.default.array(
              import_zod40.default.object({
                memberId: import_zod40.default.string().uuid(),
                userId: import_zod40.default.string().uuid(),
                role: rolesSchema,
                name: import_zod40.default.string().nullable(),
                email: import_zod40.default.string().email(),
                avatarUrl: import_zod40.default.string().nullable()
              })
            )
          })
        }
      }
    },
    async (request, reply) => {
      const { slug } = request.params;
      const userId = await request.getCurrentUserId();
      const { organization, membership } = await request.getCurrentUserMembership(slug);
      const { cannot } = getUserPermissions(userId, membership.role);
      if (cannot("get", "User")) {
        throw new UnauthorizedError(errors.organizations.members.CANNOT_LIST);
      }
      const members = await prisma.member.findMany({
        where: {
          organizationId: organization.id
        },
        orderBy: {
          role: "asc"
        },
        select: {
          id: true,
          role: true,
          user: {
            select: {
              id: true,
              name: true,
              email: true,
              avatarUrl: true
            }
          }
        }
      });
      const membersFlatten = members.map((member) => {
        return {
          memberId: member.id,
          userId: member.user.id,
          role: member.role,
          name: member.user.name,
          email: member.user.email,
          avatarUrl: member.user.avatarUrl
        };
      });
      return reply.status(200).send({
        members: membersFlatten
      });
    }
  );
}

// src/http/routes/members/remove-member.ts
var import_zod41 = __toESM(require("zod"));
async function removeMember(app2) {
  app2.withTypeProvider().register(auth).delete(
    "/organization/:slug/members/:memberId",
    {
      schema: {
        tags: ["Organization members"],
        summary: "Remove a member from a organization.",
        security: [{ bearerAuth: [] }],
        params: import_zod41.default.object({
          slug: import_zod41.default.string(),
          memberId: import_zod41.default.string().uuid()
        }),
        response: {
          204: import_zod41.default.null()
        }
      }
    },
    async (request, reply) => {
      const { slug, memberId } = request.params;
      const userId = await request.getCurrentUserId();
      const { organization, membership } = await request.getCurrentUserMembership(slug);
      const { cannot } = getUserPermissions(userId, membership.role);
      if (cannot("delete", "User")) {
        throw new UnauthorizedError(
          errors.organizations.members.CANNOT_DELETE
        );
      }
      await prisma.member.delete({
        where: {
          id: memberId,
          organizationId: organization.id
        }
      });
      return reply.status(204).send();
    }
  );
}

// src/http/routes/members/update-member.ts
var import_zod42 = __toESM(require("zod"));
async function updateMember(app2) {
  app2.withTypeProvider().register(auth).put(
    "/organization/:slug/members/:memberId",
    {
      schema: {
        tags: ["Organization members"],
        summary: "Update a member from a organization.",
        security: [{ bearerAuth: [] }],
        params: import_zod42.default.object({
          slug: import_zod42.default.string(),
          memberId: import_zod42.default.string().uuid()
        }),
        body: import_zod42.default.object({
          role: rolesSchema
        }),
        response: {
          204: import_zod42.default.null()
        }
      }
    },
    async (request, reply) => {
      const { slug, memberId } = request.params;
      const userId = await request.getCurrentUserId();
      const { organization, membership } = await request.getCurrentUserMembership(slug);
      const { cannot } = getUserPermissions(userId, membership.role);
      if (cannot("update", "User")) {
        throw new UnauthorizedError(
          errors.organizations.members.CANNOT_UPDATE
        );
      }
      const { role } = request.body;
      await prisma.member.update({
        where: {
          id: memberId,
          organizationId: organization.id
        },
        data: {
          role
        }
      });
      return reply.status(204).send();
    }
  );
}

// src/http/routes/organization/authorize-domain.ts
var import_node_dns = __toESM(require("dns"));
var import_zod43 = __toESM(require("zod"));
var dnsPromisses = import_node_dns.default.promises;
async function authorizeDomain(app2) {
  app2.withTypeProvider().register(auth).post(
    "/organization/:slug/domain",
    {
      schema: {
        tags: ["Organizations"],
        summary: "Check if a domain is verified and save information.",
        security: [{ bearerAuth: [] }],
        params: import_zod43.default.object({
          slug: import_zod43.default.string()
        }),
        body: import_zod43.default.object({
          domain: import_zod43.default.string(),
          shouldAttachUsersByDomain: import_zod43.default.boolean().optional()
        }),
        response: {
          204: import_zod43.default.null()
        }
      }
    },
    async (request, reply) => {
      const { slug: organizationSlug } = request.params;
      const { domain, shouldAttachUsersByDomain } = request.body;
      const organization = await prisma.organization.findUnique({
        where: {
          slug: organizationSlug
        }
      });
      if (!organization) {
        throw new BadRequestError(errors.organizations.entity.NOT_FOUND);
      }
      const formatedDomain = `_saas.${domain}`;
      let checkForDomainTxtRecords = null;
      try {
        checkForDomainTxtRecords = await dnsPromisses.resolveTxt(formatedDomain);
      } catch (error) {
        throw new BadRequestError(errors.organizations.domain.CHECK_DNS);
      }
      const checkForValidValue = checkForDomainTxtRecords.flat().find(
        (item) => item.includes("saas-domain-verification") && item.includes("=")
      );
      if (!checkForValidValue) {
        throw new BadRequestError(errors.organizations.domain.TXT_NOT_FOUND);
      }
      const validationIdFromDomain = checkForValidValue.split("=").at(1);
      if (organization.domainValidationId !== validationIdFromDomain) {
        throw new BadRequestError(errors.organizations.domain.TXT_INVALID);
      }
      if (domain) {
        const organizationByDomain = await prisma.organization.findFirst({
          where: {
            domain,
            id: {
              not: organization.id
            }
          }
        });
        if (organizationByDomain) {
          throw new BadRequestError(
            errors.organizations.domain.ALREADY_EXISTS
          );
        }
      }
      await prisma.organization.update({
        where: {
          id: organization.id
        },
        data: {
          domain,
          shouldAttachUsersByDomain,
          domainValidatedAt: /* @__PURE__ */ new Date()
        }
      });
      reply.status(204).send();
    }
  );
}

// src/http/routes/organization/create-organization.ts
var import_zod44 = __toESM(require("zod"));

// src/utils/generate-slug.ts
function generateSlug(text) {
  return text.toString().normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().trim().replace(/[^a-z0-9 -]/g, "").replace(/\s+/g, "-").replace(/-+/g, "-");
}

// src/http/routes/organization/create-organization.ts
async function creteOrganization(app2) {
  app2.withTypeProvider().register(auth).post(
    "/organizations",
    {
      schema: {
        tags: ["Organizations"],
        summary: "Create a new organization.",
        security: [{ bearerAuth: [] }],
        body: import_zod44.default.object({
          name: import_zod44.default.string()
        }),
        response: {
          201: import_zod44.default.object({
            organizationId: import_zod44.default.string().uuid()
          })
        }
      }
    },
    async (request, reply) => {
      const userId = await request.getCurrentUserId();
      const { name } = request.body;
      const newSlug = generateSlug(name);
      const organizationNameAlreadyExists = await prisma.organization.findFirst({
        where: {
          slug: newSlug
        }
      });
      if (organizationNameAlreadyExists) {
        throw new BadRequestError(errors.organizations.entity.ALREADY_EXISTS);
      }
      const organization = await prisma.organization.create({
        data: {
          name,
          slug: newSlug,
          ownerId: userId,
          members: {
            create: {
              userId,
              role: "ADMIN"
            }
          }
        }
      });
      return reply.status(201).send({
        organizationId: organization.id
      });
    }
  );
}

// src/http/routes/organization/get-membership.ts
var import_zod45 = __toESM(require("zod"));
async function getMemebership(app2) {
  app2.withTypeProvider().register(auth).get(
    "/organizations/:slug/membership",
    {
      schema: {
        tags: ["Organizations"],
        summary: "Get user memebership on organization.",
        security: [{ bearerAuth: [] }],
        params: import_zod45.default.object({
          slug: import_zod45.default.string()
        }),
        response: {
          200: import_zod45.default.object({
            membership: import_zod45.default.object({
              id: import_zod45.default.string().uuid(),
              role: rolesSchema,
              organizationId: import_zod45.default.string().uuid(),
              userId: import_zod45.default.string().uuid()
            })
          })
        }
      }
    },
    async (request) => {
      const { slug } = request.params;
      const { membership } = await request.getCurrentUserMembership(slug);
      return {
        membership: {
          id: membership.id,
          role: rolesSchema.parse(membership.role),
          organizationId: membership.organizationId,
          userId: membership.userId
        }
      };
    }
  );
}

// src/http/routes/organization/get-organization.ts
var import_zod46 = __toESM(require("zod"));
async function getOrganization(app2) {
  app2.withTypeProvider().register(auth).get(
    "/organizations/:slug",
    {
      schema: {
        tags: ["Organizations"],
        summary: "Get details of an organization where user is a member.",
        security: [{ bearerAuth: [] }],
        params: import_zod46.default.object({
          slug: import_zod46.default.string()
        }),
        response: {
          200: import_zod46.default.object({
            organization: import_zod46.default.object({
              id: import_zod46.default.string().uuid(),
              slug: import_zod46.default.string(),
              name: import_zod46.default.string(),
              domain: import_zod46.default.string().nullable(),
              domainValidationId: import_zod46.default.string().uuid().nullable(),
              domainValidatedAt: import_zod46.default.date().nullable(),
              shouldAttachUsersByDomain: import_zod46.default.boolean(),
              avatarUrl: import_zod46.default.string().nullable(),
              createdAt: import_zod46.default.date(),
              updatedAt: import_zod46.default.date(),
              ownerId: import_zod46.default.string().uuid()
            })
          })
        }
      }
    },
    async (request) => {
      const { slug } = request.params;
      const { organization } = await request.getCurrentUserMembership(slug);
      return {
        organization
      };
    }
  );
}

// src/http/routes/organization/get-organizations.ts
var import_zod47 = __toESM(require("zod"));
async function getOrganizations(app2) {
  app2.withTypeProvider().register(auth).get(
    "/organizations",
    {
      schema: {
        tags: ["Organizations"],
        summary: "Get organizations where user is a member.",
        security: [{ bearerAuth: [] }],
        response: {
          200: import_zod47.default.object({
            organizations: import_zod47.default.array(
              import_zod47.default.object({
                id: import_zod47.default.string().uuid(),
                name: import_zod47.default.string(),
                slug: import_zod47.default.string(),
                avatarUrl: import_zod47.default.string().nullable(),
                role: rolesSchema
              })
            )
          })
        }
      }
    },
    async (request) => {
      const userId = await request.getCurrentUserId();
      const organizations = await prisma.organization.findMany({
        select: {
          id: true,
          name: true,
          slug: true,
          avatarUrl: true,
          members: {
            select: {
              role: true
            },
            where: {
              userId
            }
          }
        },
        where: {
          members: {
            some: {
              userId
            }
          }
        }
      });
      const formatOrganizationsObject = organizations.map(
        ({ members, ...org }) => {
          return {
            ...org,
            role: members.at(0).role
          };
        }
      );
      return {
        organizations: formatOrganizationsObject
      };
    }
  );
}

// src/http/routes/organization/remove-domain.ts
var import_node_crypto = require("crypto");
var import_zod48 = __toESM(require("zod"));
async function removeDomain(app2) {
  app2.withTypeProvider().register(auth).delete(
    "/organization/:slug/domain",
    {
      schema: {
        tags: ["Organizations"],
        summary: "Delete a domain from a organization.",
        security: [{ bearerAuth: [] }],
        params: import_zod48.default.object({
          slug: import_zod48.default.string()
        }),
        response: {
          204: import_zod48.default.null()
        }
      }
    },
    async (request, reply) => {
      const { slug: organizationSlug } = request.params;
      const organization = await prisma.organization.findUnique({
        where: {
          slug: organizationSlug
        }
      });
      if (!organization) {
        throw new BadRequestError(errors.organizations.entity.NOT_FOUND);
      }
      await prisma.organization.update({
        where: {
          id: organization.id
        },
        data: {
          domain: null,
          domainValidatedAt: null,
          domainValidationId: (0, import_node_crypto.randomUUID)()
        }
      });
      reply.status(204).send();
    }
  );
}

// src/http/routes/organization/shutdown-organization.ts
var import_zod49 = __toESM(require("zod"));
async function shutdownOrganization(app2) {
  app2.withTypeProvider().register(auth).delete(
    "/organizations/:slug",
    {
      schema: {
        tags: ["Organizations"],
        summary: "Shutdown organization.",
        security: [{ bearerAuth: [] }],
        params: import_zod49.default.object({
          slug: import_zod49.default.string()
        }),
        response: {
          204: import_zod49.default.null()
        }
      }
    },
    async (request, reply) => {
      const { slug } = request.params;
      const userId = await request.getCurrentUserId();
      const { membership, organization } = await request.getCurrentUserMembership(slug);
      const authOrganization = organizationSchema.parse({
        id: organization.id,
        ownerId: organization.ownerId
      });
      const { cannot } = getUserPermissions(userId, membership.role);
      if (cannot("delete", authOrganization)) {
        throw new UnauthorizedError(
          errors.organizations.entity.CANNOT_SHUTDOWN
        );
      }
      const organizationFromDatabse = await prisma.organization.findUnique({
        where: {
          id: organization.id
        },
        include: {
          projects: true
        }
      });
      const avatars = [];
      if (organizationFromDatabse?.avatarUrl) {
        avatars.push(organizationFromDatabse.avatarUrl);
      }
      if (organizationFromDatabse?.projects.length) {
        organizationFromDatabse.projects.filter((project) => !!project.avatarUrl).map((project) => avatars.push(project.avatarUrl));
      }
      const uploadedAvatars = getUploadedAvatarNames(avatars);
      await prisma.avatar.deleteMany({
        where: {
          name: {
            in: uploadedAvatars
          }
        }
      });
      await deleteMultipleObjectsR2(uploadedAvatars);
      await prisma.organization.delete({
        where: {
          id: organization.id
        }
      });
      return reply.status(204).send();
    }
  );
}

// src/http/routes/organization/transfer-organization.ts
var import_zod50 = __toESM(require("zod"));

// src/http/emails/template/transfer-organization-ownership-email.template.ts
function transferOrganizationOwnershipEmailTemplate({
  organizationName,
  targetName
}) {
  return `
		<p style="margin:0 0 0.25rem;line-height:1.5;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;font-size:14px;">
			Hi, ${targetName ? targetName.split(" ").at(0) + "!" : ""}
		</p>
		<p style="margin:0 0 1rem;line-height:1.5;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;font-size:14px;">
			You have been designated as the new administrator of ${organizationName}. You now have full access to manage organization settings and projects.
		</p>
		<p style="margin:0 0 0.25rem;line-height:1.5;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;font-size:14px;">
			Welcome, and congratulations on your new role!
			<br />
			<a href="${env.NEXT_PUBLIC_URL}" style="text-decoration:underline;color:currentColor;">Get it started</a>
		</p>
	`;
}

// src/http/emails/transfer-organization-ownership-email.ts
async function transferOrganizationOwnershipEmail({
  organizationName,
  targetName,
  targetEmail
}) {
  const htmlTemplate = transferOrganizationOwnershipEmailTemplate({
    targetName,
    organizationName
  });
  const emailOptions = {
    from: env.MAIL_SMTP_EMAIL,
    to: targetEmail,
    subject: `${organizationName} Ownership Transfer`,
    html: htmlTemplate
  };
  await emailService.sendMail(emailOptions);
}

// src/http/routes/organization/transfer-organization.ts
async function transferOrganization(app2) {
  app2.withTypeProvider().register(auth).patch(
    "/organizations/:slug/owner",
    {
      schema: {
        tags: ["Organizations"],
        summary: "Transfer organization ownership.",
        security: [{ bearerAuth: [] }],
        params: import_zod50.default.object({
          slug: import_zod50.default.string()
        }),
        body: import_zod50.default.object({
          transferToUserId: import_zod50.default.string().uuid(),
          action: import_zod50.default.enum(["UPDATE_ROLE", "LEAVE"])
        }),
        response: {
          204: import_zod50.default.null()
        }
      }
    },
    async (request, reply) => {
      const { slug } = request.params;
      const { transferToUserId, action } = request.body;
      const userId = await request.getCurrentUserId();
      const { membership, organization } = await request.getCurrentUserMembership(slug);
      const authOrganization = organizationSchema.parse({
        id: organization.id,
        ownerId: organization.ownerId
      });
      const { cannot } = getUserPermissions(userId, membership.role);
      if (cannot("transfer_ownership", authOrganization)) {
        throw new UnauthorizedError(
          errors.organizations.entity.CANNOT_TRANSFER
        );
      }
      const transferToMembership = await prisma.member.findUnique({
        where: {
          organizationId_userId: {
            organizationId: organization.id,
            userId: transferToUserId
          }
        }
      });
      if (!transferToMembership) {
        throw new BadRequestError(errors.organizations.entity.NOT_MEMBER);
      }
      await prisma.$transaction([
        prisma.member.update({
          where: {
            organizationId_userId: {
              organizationId: organization.id,
              userId: transferToUserId
            }
          },
          data: {
            role: "ADMIN"
          }
        }),
        prisma.organization.update({
          where: {
            id: organization.id
          },
          data: {
            ownerId: transferToUserId
          }
        }),
        action === "UPDATE_ROLE" ? prisma.member.update({
          where: {
            organizationId_userId: {
              organizationId: organization.id,
              userId
            }
          },
          data: {
            role: "MEMBER"
          }
        }) : prisma.member.delete({
          where: {
            organizationId_userId: {
              organizationId: organization.id,
              userId
            }
          }
        })
      ]);
      const newOwner = await prisma.user.findUniqueOrThrow({
        where: {
          id: transferToUserId
        }
      });
      try {
        await transferOrganizationOwnershipEmail({
          organizationName: organization.name,
          targetName: newOwner.name ?? "",
          targetEmail: newOwner.email
        });
      } catch {
        throw new BadRequestError(errors.services.SEND_EMAIL);
      }
      return reply.status(204).send();
    }
  );
}

// src/http/routes/organization/update-organization.ts
var import_zod51 = __toESM(require("zod"));
async function updateOrganization(app2) {
  app2.withTypeProvider().register(auth).put(
    "/organizations/:slug",
    {
      schema: {
        tags: ["Organizations"],
        summary: "Update organization details.",
        security: [{ bearerAuth: [] }],
        params: import_zod51.default.object({
          slug: import_zod51.default.string()
        }),
        body: import_zod51.default.object({
          name: import_zod51.default.string()
        }),
        response: {
          204: import_zod51.default.null()
        }
      }
    },
    async (request, reply) => {
      const { slug } = request.params;
      const { name } = request.body;
      const userId = await request.getCurrentUserId();
      const { membership, organization } = await request.getCurrentUserMembership(slug);
      const authOrganization = organizationSchema.parse({
        id: organization.id,
        ownerId: organization.ownerId
      });
      const { cannot } = getUserPermissions(userId, membership.role);
      if (cannot("update", authOrganization)) {
        throw new UnauthorizedError(errors.organizations.entity.CANNOT_UPDATE);
      }
      const newSlug = generateSlug(name);
      const organizationNameAlreadyExists = await prisma.organization.findFirst({
        where: {
          slug: newSlug,
          id: {
            not: organization.id
          }
        }
      });
      if (organizationNameAlreadyExists) {
        throw new BadRequestError(errors.organizations.entity.ALREADY_EXISTS);
      }
      await prisma.organization.update({
        where: {
          id: organization.id
        },
        data: {
          name,
          slug: generateSlug(name)
        }
      });
      return reply.status(204).send();
    }
  );
}

// src/http/routes/projects/create-project.ts
var import_zod52 = __toESM(require("zod"));
async function createProject(app2) {
  app2.withTypeProvider().register(auth).post(
    "/organization/:slug/projects",
    {
      schema: {
        tags: ["Projects"],
        summary: "Create a new project.",
        security: [{ bearerAuth: [] }],
        params: import_zod52.default.object({
          slug: import_zod52.default.string()
        }),
        body: import_zod52.default.object({
          name: import_zod52.default.string(),
          description: import_zod52.default.string()
        }),
        response: {
          201: import_zod52.default.object({
            projectId: import_zod52.default.string().uuid()
          })
        }
      }
    },
    async (request, reply) => {
      const { slug } = request.params;
      const userId = await request.getCurrentUserId();
      const { organization, membership } = await request.getCurrentUserMembership(slug);
      const { cannot } = getUserPermissions(userId, membership.role);
      if (cannot("create", "Project")) {
        throw new UnauthorizedError(errors.projects.CANNOT_CREATE);
      }
      const { name, description } = request.body;
      const newSlug = generateSlug(name);
      const existsAnotherProjectWithSameSlug = await prisma.project.findUnique({
        where: {
          organizationId_slug: {
            organizationId: organization.id,
            slug: newSlug
          }
        }
      });
      if (existsAnotherProjectWithSameSlug) {
        throw new BadRequestError(errors.projects.ALREADY_EXISTS);
      }
      const project = await prisma.project.create({
        data: {
          name,
          slug: newSlug,
          description,
          organizationId: organization.id,
          ownerId: userId
        }
      });
      return reply.status(201).send({
        projectId: project.id
      });
    }
  );
}

// src/http/routes/projects/delete-project.ts
var import_zod53 = __toESM(require("zod"));
async function deleteProject(app2) {
  app2.withTypeProvider().register(auth).delete(
    "/organization/:slug/projects/:projectId",
    {
      schema: {
        tags: ["Projects"],
        summary: "Delete a project.",
        security: [{ bearerAuth: [] }],
        params: import_zod53.default.object({
          slug: import_zod53.default.string(),
          projectId: import_zod53.default.string().uuid()
        }),
        response: {
          204: import_zod53.default.null()
        }
      }
    },
    async (request, reply) => {
      const { slug, projectId } = request.params;
      const userId = await request.getCurrentUserId();
      const { organization, membership } = await request.getCurrentUserMembership(slug);
      console.log(projectId, organization.id);
      const project = await prisma.project.findUnique({
        where: {
          id: projectId,
          organizationId: organization.id
        }
      });
      if (!project) {
        throw new BadRequestError(errors.projects.NOT_FOUND);
      }
      const authProject = projectSchema.parse(project);
      const { cannot } = getUserPermissions(userId, membership.role);
      if (cannot("delete", authProject)) {
        throw new UnauthorizedError(errors.projects.CANNOT_DELETE);
      }
      const avatars = [];
      if (project?.avatarUrl) {
        avatars.push(project.avatarUrl);
      }
      const uploadedAvatars = getUploadedAvatarNames(avatars);
      await prisma.avatar.deleteMany({
        where: {
          name: {
            in: uploadedAvatars
          }
        }
      });
      await deleteMultipleObjectsR2(uploadedAvatars);
      await prisma.project.delete({
        where: {
          id: projectId
        }
      });
      return reply.status(204).send();
    }
  );
}

// src/http/routes/projects/get-project.ts
var import_zod54 = __toESM(require("zod"));
async function getProject(app2) {
  app2.withTypeProvider().register(auth).get(
    "/organization/:organizationSlug/projects/:projectSlug",
    {
      schema: {
        tags: ["Projects"],
        summary: "Show project details.",
        security: [{ bearerAuth: [] }],
        params: import_zod54.default.object({
          organizationSlug: import_zod54.default.string(),
          projectSlug: import_zod54.default.string()
        }),
        response: {
          200: import_zod54.default.object({
            project: import_zod54.default.object({
              id: import_zod54.default.string().uuid(),
              name: import_zod54.default.string(),
              slug: import_zod54.default.string(),
              description: import_zod54.default.string(),
              avatarUrl: import_zod54.default.string().nullable(),
              organizationId: import_zod54.default.string().uuid(),
              createdAt: import_zod54.default.date(),
              updatedAt: import_zod54.default.date(),
              ownerId: import_zod54.default.string().uuid().nullable(),
              owner: import_zod54.default.object({
                id: import_zod54.default.string().uuid(),
                name: import_zod54.default.string().nullable(),
                avatarUrl: import_zod54.default.string().nullable(),
                email: import_zod54.default.string().email()
              }).nullable()
            })
          })
        }
      }
    },
    async (request, reply) => {
      const { organizationSlug, projectSlug } = request.params;
      const userId = await request.getCurrentUserId();
      const { organization, membership } = await request.getCurrentUserMembership(organizationSlug);
      const { cannot } = getUserPermissions(userId, membership.role);
      if (cannot("get", "Project")) {
        throw new UnauthorizedError(errors.projects.CANNOT_GET);
      }
      const project = await prisma.project.findUnique({
        where: {
          organizationId_slug: {
            slug: projectSlug,
            organizationId: organization.id
          }
        },
        select: {
          id: true,
          name: true,
          slug: true,
          description: true,
          avatarUrl: true,
          organizationId: true,
          createdAt: true,
          updatedAt: true,
          ownerId: true,
          owner: {
            select: {
              id: true,
              name: true,
              avatarUrl: true,
              email: true
            }
          }
        }
      });
      if (!project) {
        throw new BadRequestError(errors.projects.NOT_FOUND);
      }
      return reply.status(200).send({
        project
      });
    }
  );
}

// src/http/routes/projects/get-projects.ts
var import_zod55 = __toESM(require("zod"));
async function getProjects(app2) {
  app2.withTypeProvider().register(auth).get(
    "/organization/:slug/projects",
    {
      schema: {
        tags: ["Projects"],
        summary: "Show projects list.",
        security: [{ bearerAuth: [] }],
        params: import_zod55.default.object({
          slug: import_zod55.default.string()
        }),
        response: {
          200: import_zod55.default.object({
            projects: import_zod55.default.array(
              import_zod55.default.object({
                id: import_zod55.default.string().uuid(),
                name: import_zod55.default.string(),
                slug: import_zod55.default.string(),
                description: import_zod55.default.string(),
                avatarUrl: import_zod55.default.string().nullable(),
                organizationId: import_zod55.default.string().uuid(),
                createdAt: import_zod55.default.date(),
                updatedAt: import_zod55.default.date(),
                owner: import_zod55.default.object({
                  id: import_zod55.default.string().uuid(),
                  name: import_zod55.default.string().nullable(),
                  avatarUrl: import_zod55.default.string().nullable(),
                  email: import_zod55.default.string().email()
                }).nullable()
              })
            )
          })
        }
      }
    },
    async (request, reply) => {
      const { slug } = request.params;
      const userId = await request.getCurrentUserId();
      const { organization, membership } = await request.getCurrentUserMembership(slug);
      const { cannot } = getUserPermissions(userId, membership.role);
      if (cannot("get", "Project")) {
        throw new UnauthorizedError(errors.projects.CANNOT_LIST);
      }
      const projects = await prisma.project.findMany({
        where: {
          organizationId: organization.id
        },
        orderBy: {
          createdAt: "desc"
        },
        select: {
          id: true,
          name: true,
          slug: true,
          description: true,
          avatarUrl: true,
          organizationId: true,
          createdAt: true,
          updatedAt: true,
          owner: {
            select: {
              id: true,
              name: true,
              avatarUrl: true,
              email: true
            }
          }
        }
      });
      return reply.status(200).send({
        projects
      });
    }
  );
}

// src/http/routes/projects/update-project.ts
var import_zod56 = __toESM(require("zod"));
async function updateProject(app2) {
  app2.withTypeProvider().register(auth).put(
    "/organization/:slug/projects/:projectId",
    {
      schema: {
        tags: ["Projects"],
        summary: "Update a project.",
        security: [{ bearerAuth: [] }],
        params: import_zod56.default.object({
          slug: import_zod56.default.string(),
          projectId: import_zod56.default.string().uuid()
        }),
        body: import_zod56.default.object({
          name: import_zod56.default.string(),
          description: import_zod56.default.string()
        }),
        response: {
          204: import_zod56.default.null()
        }
      }
    },
    async (request, reply) => {
      const { slug, projectId } = request.params;
      const userId = await request.getCurrentUserId();
      const { organization, membership } = await request.getCurrentUserMembership(slug);
      const project = await prisma.project.findUnique({
        where: {
          id: projectId,
          organizationId: organization.id
        }
      });
      if (!project) {
        throw new BadRequestError(errors.projects.NOT_FOUND);
      }
      const authProject = projectSchema.parse(project);
      const { cannot } = getUserPermissions(userId, membership.role);
      if (cannot("update", authProject)) {
        throw new UnauthorizedError(errors.projects.CANNOT_UPDATE);
      }
      const { name, description } = request.body;
      const newSlug = generateSlug(name);
      const existsAnotherProjectWithSameSlug = await prisma.project.findUnique({
        where: {
          organizationId_slug: {
            organizationId: organization.id,
            slug: newSlug
          }
        }
      });
      if (existsAnotherProjectWithSameSlug && existsAnotherProjectWithSameSlug.id !== project.id) {
        throw new BadRequestError(errors.projects.ALREADY_EXISTS);
      }
      await prisma.project.update({
        where: {
          id: projectId
        },
        data: {
          name,
          description,
          slug: newSlug
        }
      });
      return reply.status(204).send();
    }
  );
}

// src/http/routes/upload-avatar.ts
var import_multipart = __toESM(require("@fastify/multipart"));
var import_zod57 = __toESM(require("zod"));

// src/utils/generate-avatar.ts
var import_node_crypto2 = require("crypto");
var import_sharp = __toESM(require("sharp"));

// src/utils/generate-filename.ts
function generateFilename(filename) {
  const parts = filename.split(".");
  const extension = parts.pop()?.toLocaleLowerCase();
  const name = parts.join(".");
  const slug = name.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
  return extension ? `${slug}.${extension}` : slug;
}

// src/utils/generate-avatar.ts
async function generateAvatar(app2, file) {
  if (!file) {
    throw new BadRequestError(errors.files.NOT_FOUND);
  }
  let fileBuffer;
  try {
    fileBuffer = await file.toBuffer();
  } catch (error) {
    if (error instanceof app2.multipartErrors.RequestFileTooLargeError) {
      throw new BadRequestError(errors.files.MAX_SIZE);
    }
    console.log(error);
    throw new BadRequestError(errors.files.PROCESSING);
  }
  const fileName = file.filename;
  const fileMimeType = file.mimetype;
  if (!/^image\/(jpeg|png)$/.test(fileMimeType)) {
    throw new BadRequestError(errors.files.FORMAT);
  }
  const fileNamePrefix = (0, import_node_crypto2.randomUUID)();
  const uniqueFileName = generateFilename(`${fileNamePrefix}-${fileName}`);
  let transformedBuffer;
  try {
    transformedBuffer = await (0, import_sharp.default)(fileBuffer).resize(600, 600).jpeg().toBuffer();
  } catch (error) {
    console.log(error);
    throw new BadRequestError(errors.files.PROCESSING);
  }
  return {
    fileName: uniqueFileName,
    mimeType: "image/jpeg",
    // fileMimeType fixed since its converted
    fileBuffer: transformedBuffer
  };
}

// src/http/routes/upload-avatar.ts
async function uploadAvatar(app2) {
  app2.withTypeProvider().register(auth).register(import_multipart.default).post(
    "/upload/:receipient/:receipientId",
    {
      schema: {
        tags: ["Upload"],
        summary: "Upload avatar image to entity.",
        security: [{ bearerAuth: [] }],
        params: import_zod57.default.object({
          receipientId: import_zod57.default.string().uuid(),
          receipient: import_zod57.default.enum(["user", "organization", "project"]).transform((value) => {
            switch (value) {
              case "user":
                return "USER";
              case "organization":
                return "ORGANIZATION";
              case "project":
                return "PROJECT";
            }
          })
        })
      }
    },
    async (request, reply) => {
      const { receipient, receipientId } = request.params;
      const file = await request.file({
        limits: {
          fileSize: 1e3 * 100 * 10 * 2
          // ~2mb
        }
      });
      const { fileName, mimeType, fileBuffer } = await generateAvatar(
        app2,
        file
      );
      try {
        await putObjectR2(fileName, mimeType, fileBuffer);
      } catch (error) {
        console.error(error);
        throw new BadRequestError(errors.files.UPLOAD);
      }
      const entityHasAnAvatar = await prisma.avatar.findUnique({
        where: {
          receipient_receipientId: {
            receipient,
            receipientId
          }
        }
      });
      if (entityHasAnAvatar) {
        await prisma.avatar.delete({
          where: {
            receipient_receipientId: {
              receipient,
              receipientId
            }
          }
        });
        try {
          const fileNameToDelete = entityHasAnAvatar.name;
          await deleteObjectR2(fileNameToDelete);
        } catch (error) {
          console.error(error);
          throw new BadRequestError(errors.files.DELETE);
        }
      }
      const { name: newAvatar } = await prisma.avatar.create({
        data: {
          name: fileName,
          receipient,
          receipientId
        }
      });
      if (receipient === "USER") {
        await prisma.user.update({
          where: {
            id: receipientId
          },
          data: {
            avatarUrl: `{AWS}/${newAvatar}`
          }
        });
      }
      if (receipient === "ORGANIZATION") {
        await prisma.organization.update({
          where: {
            id: receipientId
          },
          data: {
            avatarUrl: `{AWS}/${newAvatar}`
          }
        });
      }
      if (receipient === "PROJECT") {
        await prisma.project.update({
          where: {
            id: receipientId
          },
          data: {
            avatarUrl: `{AWS}/${newAvatar}`
          }
        });
      }
      return reply.status(201).send();
    }
  );
}

// src/http/server.ts
var app = (0, import_fastify.fastify)().withTypeProvider();
app.setSerializerCompiler(import_fastify_type_provider_zod2.serializerCompiler);
app.setValidatorCompiler(import_fastify_type_provider_zod2.validatorCompiler);
app.setErrorHandler(errorHandler);
app.register(import_swagger.default, {
  openapi: {
    info: {
      title: "Next.js Fastify Saas RBAC",
      description: "Full-stack SaaS app with multi-tenant and RBAC.",
      version: "1.0.0"
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT"
        }
      }
    }
  },
  transform: import_fastify_type_provider_zod2.jsonSchemaTransform
});
app.register(import_swagger_ui.default, {
  routePrefix: "/docs"
});
app.register(import_cors.default);
app.register(import_jwt.default, {
  secret: {
    public: Buffer.from(env.JWT_PUBLIC_KEY, "base64"),
    private: Buffer.from(env.JWT_SECRET_KEY, "base64")
  },
  sign: {
    algorithm: "RS256"
  }
});
app.register(createAccount);
app.register(authenticateWithPassword);
app.register(authenticateWithGitHub);
app.register(authenticateWithGoogle);
app.register(requestPasswordRecover);
app.register(resetPassword);
app.register(verifyEmailAndAuthenticate);
app.register(resendEmailValidationCode);
app.register(getProfile);
app.register(updateAccount);
app.register(updatePassword);
app.register(removeAccountProvider);
app.register(leaveOrganization);
app.register(deleteAccount);
app.register(checkEmailChange);
app.register(deleteEmailChangeToken);
app.register(confirmEmailChangeToken);
app.register(connectGitHub);
app.register(connectGoogle);
app.register(creteOrganization);
app.register(getMemebership);
app.register(getOrganizations);
app.register(getOrganization);
app.register(updateOrganization);
app.register(shutdownOrganization);
app.register(transferOrganization);
app.register(authorizeDomain);
app.register(removeDomain);
app.register(getMembers);
app.register(updateMember);
app.register(removeMember);
app.register(createInvite);
app.register(getInvites);
app.register(getInvite);
app.register(acceptInvite);
app.register(rejectInvite);
app.register(revokeInvite);
app.register(getPendingInvites);
app.register(getOrganizationBilling);
app.register(createProject);
app.register(deleteProject);
app.register(getProject);
app.register(getProjects);
app.register(updateProject);
app.register(uploadAvatar);
app.listen({
  port: env.PORT,
  host: "0.0.0.0"
}).then(() => console.log("\u2705 HTTP server is running."));
//# sourceMappingURL=server.js.map