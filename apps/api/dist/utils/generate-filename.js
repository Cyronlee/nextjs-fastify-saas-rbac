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

// src/utils/generate-filename.ts
var generate_filename_exports = {};
__export(generate_filename_exports, {
  generateFilename: () => generateFilename
});
module.exports = __toCommonJS(generate_filename_exports);
function generateFilename(filename) {
  const parts = filename.split(".");
  const extension = parts.pop()?.toLocaleLowerCase();
  const name = parts.join(".");
  const slug = name.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
  return extension ? `${slug}.${extension}` : slug;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  generateFilename
});
//# sourceMappingURL=generate-filename.js.map