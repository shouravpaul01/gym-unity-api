"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QueryBuilder = void 0;
class QueryBuilder {
    modelQuery;
    totalQuery = 0;
    query;
    constructor(modelQuery, query) {
        this.modelQuery = modelQuery;
        // this.totalQuery = 0;
        this.query = query;
    }
    search(searchableFields) {
        const searchTerm = this?.query?.search;
        if (searchTerm) {
            this.modelQuery = this.modelQuery.find({
                $or: searchableFields.map((element) => ({
                    [element]: { $regex: searchTerm, $options: 'i' },
                })),
            });
        }
        return this;
    }
    filter() {
        const queryObj = { ...this.query };
        const excludeFelid = ['search', 'sort', 'page', 'limit', 'fields'];
        excludeFelid.forEach((element) => delete queryObj[element]);
        this.modelQuery = this.modelQuery.find(queryObj);
        return this;
    }
    sort() {
        const sort = this.query?.sort || '-createdAt';
        this.modelQuery = this.modelQuery.sort(sort);
        return this;
    }
    async totalPages() {
        const limit = Number(this?.query?.limit) || 5;
        const total = await this.modelQuery.model.countDocuments(this.modelQuery.getQuery());
        this.totalQuery = Math.ceil(total / limit);
        return this;
    }
    paginate() {
        const page = Number(this?.query?.page) || 1;
        const limit = Number(this?.query?.limit) || 5;
        const skip = (page - 1) * limit;
        this.modelQuery = this.modelQuery.skip(skip).limit(limit);
        return this;
    }
    fields() {
        const fields = this.query.fields?.split(',').join(' ') || '-__v';
        this.modelQuery = this.modelQuery.select(fields);
        return this;
    }
}
exports.QueryBuilder = QueryBuilder;
//# sourceMappingURL=QueryBuilder.js.map