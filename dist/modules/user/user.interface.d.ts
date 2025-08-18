import { USER_ROLE } from "./user.constant";
export type UserRole = "admin" | "trainer" | "trainee";
export interface IUser {
    name: string;
    email: string;
    password: string;
    role: UserRole;
    profile?: {
        age?: number;
        phone?: string;
        address?: string;
    };
    isBlocked: boolean;
    isDeleted: boolean;
}
export type IUserRole = keyof typeof USER_ROLE;
//# sourceMappingURL=user.interface.d.ts.map