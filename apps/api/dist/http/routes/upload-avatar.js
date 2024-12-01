"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
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
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/http/routes/upload-avatar.ts
var upload_avatar_exports = {};
__export(upload_avatar_exports, {
  uploadAvatar: () => uploadAvatar
});
module.exports = __toCommonJS(upload_avatar_exports);
var import_multipart = __toESM(require("@fastify/multipart"));
var import_zod3 = __toESM(require("zod"));

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

// src/http/middlewares/auth.ts
var import_fastify_plugin = __toESM(require("fastify-plugin"));

// src/lib/prisma.ts
var import_client = require("@prisma/client");
var prisma = new import_client.PrismaClient();

// src/http/routes/_errors/unauthorized-error.ts
var UnauthorizedError = class extends Error {
  constructor(message) {
    super(message ?? "Unauthorized.");
  }
};

// src/http/middlewares/auth.ts
var auth = (0, import_fastify_plugin.default)(async (app) => {
  app.addHook("preHandler", async (request) => {
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

// src/lib/cloudflare-r2.ts
var import_client_s3 = require("@aws-sdk/client-s3");

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

// src/lib/cloudflare-r2.ts
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

// src/utils/generate-avatar.ts
var import_node_crypto = require("crypto");
var import_sharp = __toESM(require("sharp"));

// src/http/routes/_errors/bad-request-error.ts
var BadRequestError = class extends Error {
};

// src/utils/generate-filename.ts
function generateFilename(filename) {
  const parts = filename.split(".");
  const extension = parts.pop()?.toLocaleLowerCase();
  const name = parts.join(".");
  const slug = name.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
  return extension ? `${slug}.${extension}` : slug;
}

// src/utils/generate-avatar.ts
async function generateAvatar(app, file) {
  if (!file) {
    throw new BadRequestError(errors.files.NOT_FOUND);
  }
  let fileBuffer;
  try {
    fileBuffer = await file.toBuffer();
  } catch (error) {
    if (error instanceof app.multipartErrors.RequestFileTooLargeError) {
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
  const fileNamePrefix = (0, import_node_crypto.randomUUID)();
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
async function uploadAvatar(app) {
  app.withTypeProvider().register(auth).register(import_multipart.default).post(
    "/upload/:receipient/:receipientId",
    {
      schema: {
        tags: ["Upload"],
        summary: "Upload avatar image to entity.",
        security: [{ bearerAuth: [] }],
        params: import_zod3.default.object({
          receipientId: import_zod3.default.string().uuid(),
          receipient: import_zod3.default.enum(["user", "organization", "project"]).transform((value) => {
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
        app,
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  uploadAvatar
});
//# sourceMappingURL=upload-avatar.js.map