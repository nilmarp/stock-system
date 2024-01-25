import { BaseEntity, SelectQueryBuilder } from "typeorm";
import { IPagination, paginate } from "../common/pagination";
import { TypeORMPagination } from "../common/TypeORMPagination";

const pagination: IPagination<SelectQueryBuilder<any>> = new TypeORMPagination;

export interface PaginationOptions {
    page?: number,
    take?: number
}

export interface IRepository {
    _entity: any

    create(data: any)

    findAll()

    findBy(where)

    paginate(options: PaginationOptions, builder?: any)
}

export abstract class BaseRepository implements IRepository {
    abstract _entity: typeof BaseEntity

    public async create(data: {}): Promise<BaseEntity> {
        const entity = new this._entity;

        for (const key in data) {
            entity[key] = data[key]
        }

        await entity.save()

        return entity
    }

    public async paginate(options: PaginationOptions, builder?: SelectQueryBuilder<BaseEntity>) {
        return await paginate(pagination)
            .builder(builder ?? this._entity.createQueryBuilder())
            .take(options?.take)
            .page(options?.page)
            .get()
    }

    public async findAll() {
        return await this._entity.find()
    }

    public async findBy(where) {
        return await this._entity.findBy(where)
    }
}
