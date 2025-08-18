import { z } from "zod";
export declare const registerValidation: z.ZodObject<{
    body: z.ZodObject<{
        name: z.ZodString;
        email: z.ZodString;
        password: z.ZodString;
        role: z.ZodOptional<z.ZodEnum<{
            trainer: "trainer";
            admin: "admin";
            trainee: "trainee";
        }>>;
    }, z.core.$strip>;
}, z.core.$strip>;
export declare const loginValidation: z.ZodObject<{
    body: z.ZodObject<{
        email: z.ZodString;
        password: z.ZodString;
    }, z.core.$strip>;
}, z.core.$strip>;
export declare const AuthValidation: {
    registerValidation: z.ZodObject<{
        body: z.ZodObject<{
            name: z.ZodString;
            email: z.ZodString;
            password: z.ZodString;
            role: z.ZodOptional<z.ZodEnum<{
                trainer: "trainer";
                admin: "admin";
                trainee: "trainee";
            }>>;
        }, z.core.$strip>;
    }, z.core.$strip>;
    loginValidation: z.ZodObject<{
        body: z.ZodObject<{
            email: z.ZodString;
            password: z.ZodString;
        }, z.core.$strip>;
    }, z.core.$strip>;
};
export default AuthValidation;
//# sourceMappingURL=auth.validation.d.ts.map