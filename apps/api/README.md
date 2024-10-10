# 🔐 SaaS: Fastify + RBAC
<!-- Resume of this project -->
<!-- This project contains all the necessary boilerplate to setup a multi-tenant SaaS with Next.js including authentication and RBAC authorization. -->
*Soon*

## 🚀 Techs and Tools
*Soon*

## 🖥️ Project
*Soon*

## ⚙️ Get started
*Soon*

## 🔗 Routes
*Soon*
<!-- Insomnia -->
<!-- Swagger url: http://localhost:3333/docs/ -->

## 📋 Business Rules and Requirements

**Authentication:**
- [x] It should be able to authenticate using e-mail and password;
- [x] It should be able to authenticate using Github account;
- [x] It should be able to recover password using e-mail;
- [x] It should be able to create an account (e-mail, name and password);
**Organizations**
- [x] It should be able to create a new organization;
- [x] It should be able to get organizations to which the user belongs;
- [x] It should be able to update an organization;
- [x] It should be able to shutdown an organization;
- [x] It should be able to transfer organization ownership;
**Invites**
- [ ] It should be able to invite a new member (e-mail, role);
- [ ] It should be able to accept an invite;
- [ ] It should be able to revoke a pending invite;
**Members**
- [ ] It should be able to get organization members;
- [ ] It should be able to update a member role;
**Projects**
- [ ] It should be able to get projects within a organization;
- [ ] It should be able to create a new project (name, url, description);
- [ ] It should be able to update a project (name, url, description);
- [ ] It should be able to delete a project;
**Billing**
- [ ] It should be able to get billing details for organization ($20 per project / $10 per member excluding billing role);

## 🧑🏼‍💻 RBAC: Roles and Permissions
Owner/Administrator, Member, Billing (one per organization) and Anonymous.

| Description              | Administrator | Member | Billing | Anonymous |
| ------------------------ | ------------- | ------ | ------- | --------- |
| Update organization      | ✅            | ❌     | ❌       | ❌        |
| Delete organization      | ✅            | ❌     | ❌       | ❌        |
| Invite a member          | ✅            | ❌     | ❌       | ❌        |
| Revoke an invite         | ✅            | ❌     | ❌       | ❌        |
| List members             | ✅            | ✅     | ✅       | ❌        |
| Transfer ownership       | 🟡            | ❌     | ❌       | ❌        |
| Update member role       | ✅            | ❌     | ❌       | ❌        |
| Delete member            | ✅            | 🟡     | ❌       | ❌        |
| List projects            | ✅            | ✅     | ✅       | ❌        |
| Create a new project     | ✅            | ✅     | ❌       | ❌        |
| Update a project         | ✅            | 🟡     | ❌       | ❌        |
| Delete a project         | ✅            | 🟡     | ❌       | ❌        |
| Get billing details      | ✅            | ❌     | ✅       | ❌        |
| Export billing details   | ✅            | ❌     | ✅       | ❌        |

> ✅ allowed | 
> ❌ not allowed | 
> 🟡 allowed with conditions

**Conditions:**
- Only owners may transfer organization ownership;
- Only administrators and project authors may update/delete a project;
- Members can leave their own organizations;