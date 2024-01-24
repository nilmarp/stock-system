export interface PaginationOptions {
    take: number
    page: number
}

export interface PaginationAwareObject {
    take: number
    page: number
    total: number
    pages: number
    nextPage: number
    previousPage: number
    hasNextPage: boolean
    hasPreviousPage: boolean
    data: Array<object|any>|any
}

export interface IPagination<QueryBuilder> {
    options: PaginationOptions

    setOptions(options: PaginationOptions)

    paginate(builder: QueryBuilder): Promise<PaginationAwareObject>
}

const DEFAULT_TAKE = 10 // this should come from a config file
const DEFAULT_PAGE = 1

export const paginate = (pagination: IPagination<any>) => {
    return {
        _pagination: pagination,
        _builder: null,
        _take: null,
        _page: null,

        take(number = DEFAULT_TAKE) {
            this._take = number
            return this
        },

        page(number = DEFAULT_PAGE) {
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