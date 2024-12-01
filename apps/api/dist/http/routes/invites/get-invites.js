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

// src/http/routes/invites/get-invites.ts
var get_invites_exports = {};
__export(get_invites_exports, {
  getInvites: () => getInvites
});
module.exports = __toCommonJS(get_invites_exports);

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
var z = N;

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
var z2 = (r2, t3, { interpret: n3, get: e3 }) => {
  const o3 = e3(t3, r2.field);
  return Array.isArray(o3) && o3.some((t4) => n3(r2.value, t4));
};
var B = (r2, t3) => r2.value.call(t3);
var E2 = Object.freeze({ __proto__: null, or: p3, nor: g2, and: m3, not: y3, eq: b2, ne: A2, lte: d3, lt: h3, gt: j3, gte: w3, exists: _3, mod: v3, size: x3, regex: O3, within: N2, nin: $2, all: q2, elemMatch: z2, where: B });
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
var a3 = p4(z, M);
var u4 = p4(["$and", "$or"].reduce((o3, t3) => (o3[t3] = Object.assign({}, o3[t3], { type: "field" }), o3), Object.assign({}, z, { $nor: Object.assign({}, z.$nor, { type: "field", parse: O.compound }) })), M, { forPrimitives: true });

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
function z3(t3) {
  if (Object.hasOwn(t3, C)) return t3[C];
  return S2(t3.constructor);
}
var B2 = { function: (t3) => t3.constructor, string: z3 };
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
    this.j = i4.detectSubjectType || z3;
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
var it = { eq: b2, ne: A2, lt: h3, lte: d3, gt: j3, gte: w3, in: N2, nin: $2, all: q2, size: x3, regex: O3, elemMatch: z2, exists: _3, and: m3 };
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
var import_zod10 = require("zod");

// ../../packages/auth/src/messages/error.ts
var errors = {
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
var createAppAbility = createMongoAbility;
function defineAbilityFor(user) {
  const builder = new AbilityBuilder(createAppAbility);
  if (typeof permissions[user.role] !== "function") {
    throw new Error(errors.PERMISSIONS_NOT_FOUND.replace("{role}", user.role));
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

// src/http/routes/invites/get-invites.ts
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
        throw new UnauthorizedError(errors2.auth.INVALID_TOKEN);
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
        throw new UnauthorizedError(errors2.organizations.members.CANNOT_ACCESS);
      }
      const { organization, ...membership } = member;
      return {
        organization,
        membership
      };
    };
  });
});

// src/utils/get-user-permissions.ts
function getUserPermissions(userId, role) {
  const authUser = userSchema.parse({
    id: userId,
    role
  });
  const ability = defineAbilityFor(authUser);
  return ability;
}

// src/http/routes/invites/get-invites.ts
async function getInvites(app) {
  app.withTypeProvider().register(auth).get(
    "/organization/:slug/invites",
    {
      schema: {
        tags: ["Invites"],
        summary: "Get organization invites.",
        security: [{ bearerAuth: [] }],
        params: import_zod11.default.object({
          slug: import_zod11.default.string()
        }),
        response: {
          200: import_zod11.default.object({
            invites: import_zod11.default.array(
              import_zod11.default.object({
                id: import_zod11.default.string().uuid(),
                email: import_zod11.default.string().email(),
                role: rolesSchema,
                createdAt: import_zod11.default.date(),
                author: import_zod11.default.object({
                  id: import_zod11.default.string().uuid(),
                  name: import_zod11.default.string().nullable()
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
        throw new UnauthorizedError(errors2.organizations.invites.CANNOT_LIST);
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  getInvites
});
//# sourceMappingURL=get-invites.js.map