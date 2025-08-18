import { Query } from 'mongoose';
export declare class QueryBuilder<T> {
    modelQuery: Query<T[], T>;
    totalQuery: number;
    query: Record<string, unknown>;
    constructor(modelQuery: Query<T[], T>, query: Record<string, unknown>);
    search(searchableFields: string[]): this;
    filter(): this;
    sort(): this;
    totalPages(): Promise<this>;
    paginate(): this;
    fields(): this;
}
//# sourceMappingURL=QueryBuilder.d.ts.map