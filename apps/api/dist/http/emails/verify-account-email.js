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

// src/http/emails/verify-account-email.ts
var verify_account_email_exports = {};
__export(verify_account_email_exports, {
  verifyAccountEmail: () => verifyAccountEmail
});
module.exports = __toCommonJS(verify_account_email_exports);

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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  verifyAccountEmail
});
//# sourceMappingURL=verify-account-email.js.map