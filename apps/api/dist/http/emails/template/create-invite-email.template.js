"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
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
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/http/emails/template/create-invite-email.template.ts
var create_invite_email_template_exports = {};
__export(create_invite_email_template_exports, {
  createInviteEmailTemplate: () => createInviteEmailTemplate
});
module.exports = __toCommonJS(create_invite_email_template_exports);
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  createInviteEmailTemplate
});
//# sourceMappingURL=create-invite-email.template.js.map