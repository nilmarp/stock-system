import { BaseEntity, SelectQueryBuilder } from "typeorm";
import { AppDataSource } from "../database/data-source";
import { IPagination, paginate } from "../common/pagination";
import { TypeORMPagination } from "../common/TypeORMPagination";

const pagination: IPagination<SelectQueryBuilder<any>> = new TypeORMPagination;

export interface PaginationOptions {
    page?: number,
    take?: number
}

export interface IRepository {
    _entity: any

    create(data: {})

    findAll()

    findBy(where)

    findOneBy(where)

    update(entity: number, data: {})

    delete(id: number)

    paginate(options: PaginationOptions, builder?: any)
}

export abstract class BaseRepository implements IRepository {
    abstract _entity: typeof BaseEntity
    protected builder: SelectQueryBuilder<BaseEntity> = null

    public async create(data: {}): Promise<BaseEntity> {
        const entity = new this._entity;

        for (const key in data)
            entity[key] = data[key]

        await entity.save()

        return entity
    }

    public async paginate(options: PaginationOptions, builder?: SelectQueryBuilder<BaseEntity>) {
        return await paginate(pagination)
            .builder(builder ?? this.getBuilder())
            .take(options?.take)
            .page(options?.page)
            .get()
    }

    protected getBuilder() {
        return this.builder ?? this._entity.createQueryBuilder()
    }

    protected setBuilder(builder: SelectQueryBuilder<BaseEntity>) {
        this.builder = builder
    }

    public async findAll() {
        return await this._entity.find()
    }

    public async findBy(where) {
        return await this._entity.findBy(where)
    }

    public async findOneBy(where) {
        return await this._entity.findOneBy(where)
    }

    public async update(entity: BaseEntity | number, data: {}) {
        if (typeof entity === 'number' || typeof entity === 'string')
            entity = await this.findOneBy({ id: entity })

        if (!entity)
            throw Error(`Could not find entity`)

        for (const key in data) {
            entity[key] = data[key]
        }

        await entity.save()
    }

    public async delete(id: number) {
        await AppDataSource
            .getRepository(this._entity)
            .delete(id)
    }
}
