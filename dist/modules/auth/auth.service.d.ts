import { IUser } from "../user/user.interface";
export declare const registerDB: (userData: IUser) => Promise<import("mongoose").Document<unknown, {}, IUser, {}, {}> & IUser & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;
export declare const loginDB: (payload: {
    email: string;
    password: string;
}) => Promise<{
    token: string;
    user: (import("mongoose").FlattenMaps<{
        name: string;
        email: string;
        password: string;
        role: import("../user/user.interface").UserRole;
        profile?: {
            age?: number;
            phone?: string;
            address?: string;
        };
        isBlocked: boolean;
        isDeleted: boolean;
    }> & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }) | null;
}>;
declare const _default: {
    registerDB: (userData: IUser) => Promise<import("mongoose").Document<unknown, {}, IUser, {}, {}> & IUser & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }>;
    loginDB: (payload: {
        email: string;
        password: string;
    }) => Promise<{
        token: string;
        user: (import("mongoose").FlattenMaps<{
            name: string;
            email: string;
            password: string;
            role: import("../user/user.interface").UserRole;
            profile?: {
                age?: number;
                phone?: string;
                address?: string;
            };
            isBlocked: boolean;
            isDeleted: boolean;
        }> & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        }) | null;
    }>;
};
export default _default;
//# sourceMappingURL=auth.service.d.ts.map