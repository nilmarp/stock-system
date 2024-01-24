import { BaseEntity, SelectQueryBuilder } from "typeorm";
import { IPagination, PaginationOptions, PaginationAwareObject } from "./pagination";

export class TypeORMPagination implements IPagination<SelectQueryBuilder<BaseEntity>> {
    options: PaginationOptions

    constructor(options?: PaginationOptions) {
        this.options = options
    }

    setOptions(options: PaginationOptions) {
        this.options = options
    }

    async paginate(builder: SelectQueryBuilder<any>): Promise<PaginationAwareObject> {
        let { take, page } = this.options

        const total = await builder.getCount()
        const pages = Math.ceil(total / take)

        if (page > pages)
            page = pages
            
        const nextPage = page < pages ? page + 1 : page
        const previousPage = page > 1 ? page - 1 : page

        const skip = (page - 1) * take

        const data = await builder
            .skip(skip)
            .take(take)
            .getMany()

        const hasNextPage = page < pages
        const hasPreviousPage = page > 1

        return {
            take,
            page,
            total,
            pages,
            nextPage,
            previousPage,
            hasNextPage,
            hasPreviousPage,
            data
        }
    }
}