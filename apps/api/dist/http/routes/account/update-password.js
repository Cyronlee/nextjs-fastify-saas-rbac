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

// src/http/routes/account/update-password.ts
var update_password_exports = {};
__export(update_password_exports, {
  updatePassword: () => updatePassword
});
module.exports = __toCommonJS(update_password_exports);
var import_bcryptjs = require("bcryptjs");
var import_zod = require("zod");

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
  for (let i = 0; i < password.length; i++) {
    const ch = password.charAt(i);
    if (!isNaN(+ch)) countNumbers++;
    else if (hasUppercase(ch)) countUppercase++;
    else if (hasLowercase(ch)) countLowercase++;
    else if (hasSpecial(ch)) countSpecial++;
  }
  let errors2 = {
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
    errors2 = {
      ...errors2,
      totalNumber: { ...errors2.totalNumber, valid: false }
    };
  }
  if (countUppercase < 1) {
    errors2 = {
      ...errors2,
      upperCase: {
        ...errors2.upperCase,
        valid: false
      }
    };
  }
  if (countLowercase < 1) {
    errors2 = {
      ...errors2,
      lowerCase: {
        ...errors2.lowerCase,
        valid: false
      }
    };
  }
  if (countSpecial < 1) {
    errors2 = {
      ...errors2,
      specialCh: {
        ...errors2.specialCh,
        valid: false
      }
    };
  }
  if (password.length < 6) {
    errors2 = {
      ...errors2,
      minLength: {
        ...errors2.minLength,
        valid: false
      }
    };
  }
  if (countNumbers < 1 || countUppercase < 1 || countLowercase < 1 || countSpecial < 1 || password.length < 6) {
    checkPassComplexity.addIssue({
      code: "custom",
      path: ["password"],
      message: JSON.stringify(errors2)
    });
  }
};

// src/http/routes/_errors/bad-request-error.ts
var BadRequestError = class extends Error {
};

// src/http/routes/account/update-password.ts
async function updatePassword(app) {
  app.withTypeProvider().register(auth).patch(
    "/users/passwords",
    {
      schema: {
        tags: ["Account"],
        summary: "Update or create account password.",
        security: [{ bearerAuth: [] }],
        body: import_zod.z.object({
          currentPassword: import_zod.z.string().nullish(),
          password: import_zod.z.string()
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  updatePassword
});
//# sourceMappingURL=update-password.js.map