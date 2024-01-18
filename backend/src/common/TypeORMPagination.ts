import { SelectQueryBuilder } from "typeorm";
import { IPagination, PaginationOptions, PaginationAwareObject } from "./pagination";

export class TypeORMPagination implements IPagination<SelectQueryBuilder<any>> {
    options: PaginationOptions

    constructor(options?: PaginationOptions) {
        this.options = options
    }

    setOptions(options: PaginationOptions) {
        this.options = options
    }

    async paginate(builder: SelectQueryBuilder<any>): Promise<PaginationAwareObject> {
        const { take, page } = this.options

        const total = await builder.getCount()
        const pages = Math.ceil(total / take)
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
            hasNextPage,
            hasPreviousPage,
            data
        }
    }
}