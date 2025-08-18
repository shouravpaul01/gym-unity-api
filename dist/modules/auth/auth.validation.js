"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthValidation = exports.loginValidation = exports.registerValidation = void 0;
const zod_1 = require("zod");
const userRoleEnum = zod_1.z.enum(["admin", "trainer", "trainee"]);
exports.registerValidation = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string().min(1, "Name is required"),
        email: zod_1.z.string().email("Valid email is required"),
        password: zod_1.z.string().min(6, "Password must be at least 6 characters"),
        role: userRoleEnum.optional(),
    }),
});
exports.loginValidation = zod_1.z.object({
    body: zod_1.z.object({
        email: zod_1.z.string().email("Valid email is required"),
        password: zod_1.z.string().min(1, "Password is required"),
    }),
});
exports.AuthValidation = {
    registerValidation: exports.registerValidation,
    loginValidation: exports.loginValidation,
};
exports.default = exports.AuthValidation;
//# sourceMappingURL=auth.validation.js.map