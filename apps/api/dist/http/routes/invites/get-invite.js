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

// src/http/routes/invites/get-invite.ts
var get_invite_exports = {};
__export(get_invite_exports, {
  getInvite: () => getInvite
});
module.exports = __toCommonJS(get_invite_exports);

// ../../packages/auth/src/index.ts
var import_zod10 = require("zod");

// ../../packages/auth/src/subjects/billing.ts
var import_zod = require("zod");
var billingSubject = import_zod.z.tuple([
  import_zod.z.union([import_zod.z.literal("manage"), import_zod.z.literal("get"), import_zod.z.literal("export")]),
  import_zod.z.literal("Billing")
]);

// ../../packages/auth/src/subjects/invite.ts
var import_zod2 = require("zod");
var inviteSubject = import_zod2.z.tuple([
  import_zod2.z.union([
    import_zod2.z.literal("manage"),
    import_zod2.z.literal("get"),
    import_zod2.z.literal("create"),
    import_zod2.z.literal("delete")
  ]),
  import_zod2.z.literal("Invite")
]);

// ../../packages/auth/src/subjects/organization.ts
var import_zod4 = require("zod");

// ../../packages/auth/src/models/organization.ts
var import_zod3 = require("zod");
var organizationSchema = import_zod3.z.object({
  __typename: import_zod3.z.literal("Organization").default("Organization"),
  id: import_zod3.z.string(),
  ownerId: import_zod3.z.string()
});

// ../../packages/auth/src/subjects/organization.ts
var organizationSubject = import_zod4.z.tuple([
  import_zod4.z.union([
    import_zod4.z.literal("manage"),
    import_zod4.z.literal("update"),
    import_zod4.z.literal("delete"),
    import_zod4.z.literal("transfer_ownership")
  ]),
  import_zod4.z.union([import_zod4.z.literal("Organization"), organizationSchema])
]);

// ../../packages/auth/src/subjects/project.ts
var import_zod6 = require("zod");

// ../../packages/auth/src/models/project.ts
var import_zod5 = require("zod");
var projectSchema = import_zod5.z.object({
  __typename: import_zod5.z.literal("Project").default("Project"),
  id: import_zod5.z.string(),
  ownerId: import_zod5.z.string()
});

// ../../packages/auth/src/subjects/project.ts
var projectSubject = import_zod6.z.tuple([
  import_zod6.z.union([
    import_zod6.z.literal("manage"),
    import_zod6.z.literal("get"),
    import_zod6.z.literal("create"),
    import_zod6.z.literal("update"),
    import_zod6.z.literal("delete")
  ]),
  import_zod6.z.union([import_zod6.z.literal("Project"), projectSchema])
]);

// ../../packages/auth/src/subjects/user.ts
var import_zod7 = require("zod");
var userSubject = import_zod7.z.tuple([
  import_zod7.z.union([
    import_zod7.z.literal("manage"),
    import_zod7.z.literal("get"),
    import_zod7.z.literal("create"),
    import_zod7.z.literal("update"),
    import_zod7.z.literal("delete")
  ]),
  import_zod7.z.literal("User")
]);

// ../../packages/auth/src/models/user.ts
var import_zod9 = require("zod");

// ../../packages/auth/src/roles.ts
var import_zod8 = require("zod");
var rolesSchema = import_zod8.z.union([
  import_zod8.z.literal("ADMIN"),
  import_zod8.z.literal("MEMBER"),
  import_zod8.z.literal("BILLING")
]);

// ../../packages/auth/src/models/user.ts
var userSchema = import_zod9.z.object({
  // __typename: z.literal('User').default('User'),
  id: import_zod9.z.string(),
  role: rolesSchema
});

// ../../packages/auth/src/index.ts
var appAbilitiesSchema = import_zod10.z.union([
  userSubject,
  projectSubject,
  organizationSubject,
  inviteSubject,
  billingSubject,
  import_zod10.z.tuple([import_zod10.z.literal("manage"), import_zod10.z.literal("all")])
]);

// src/http/routes/invites/get-invite.ts
var import_zod11 = __toESM(require("zod"));

// src/errors/messages.ts
var errors2 = {
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

// src/lib/prisma.ts
var import_client = require("@prisma/client");
var prisma = new import_client.PrismaClient();

// src/http/routes/_errors/bad-request-error.ts
var BadRequestError = class extends Error {
};

// src/http/routes/invites/get-invite.ts
async function getInvite(app) {
  app.withTypeProvider().get(
    "/invites/:inviteId",
    {
      schema: {
        tags: ["Invites"],
        summary: "Get an invite details.",
        params: import_zod11.default.object({
          inviteId: import_zod11.default.string().uuid()
        }),
        response: {
          200: import_zod11.default.object({
            invite: import_zod11.default.object({
              id: import_zod11.default.string().uuid(),
              email: import_zod11.default.string().email(),
              role: rolesSchema,
              createdAt: import_zod11.default.date(),
              author: import_zod11.default.object({
                id: import_zod11.default.string().uuid(),
                name: import_zod11.default.string().nullable(),
                email: import_zod11.default.string().email(),
                avatarUrl: import_zod11.default.string().nullable()
              }).nullable(),
              organization: import_zod11.default.object({
                name: import_zod11.default.string()
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
        throw new BadRequestError(errors2.organizations.invites.NOT_FOUND);
      }
      return reply.status(200).send({
        invite
      });
    }
  );
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  getInvite
});
//# sourceMappingURL=get-invite.js.map