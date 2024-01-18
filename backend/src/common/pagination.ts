export interface PaginationOptions {
    take: number
    page: number
}

export interface PaginationAwareObject {
    take: number
    page: number
    total: number
    pages: number
    hasNextPage: boolean
    hasPreviousPage: boolean
    data: Array<object|any>|any
}

export interface IPagination<QueryBuilder> {
    options: PaginationOptions

    setOptions(options: PaginationOptions)

    paginate(builder: QueryBuilder): Promise<PaginationAwareObject>
}

export const paginate = (pagination: IPagination<any>) => {
    return {
        _pagination: pagination,
        _builder: null,
        _take: null,
        _page: null,

        take(number) {
            this._take = number
            return this
        },

        page(number) {
            this._page = number
            return this
        },

        builder(queryBuilder) {
            this._builder = queryBuilder
            return this
        },

        async get(): Promise<PaginationAwareObject> {
            this._pagination.setOptions({
                take: this._take,
                page: this._page
            })

            return await pagination.paginate(this._builder)
        }
    }
}