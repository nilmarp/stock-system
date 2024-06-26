import typeorm, { BaseEntity, SelectQueryBuilder, createConnection } from "typeorm";
import { AppDataSource } from "../database/data-source";
import { IPagination, paginate } from "../common/pagination";
import { TypeORMPagination } from "../common/TypeORMPagination";

import 'reflect-metadata';
import path from 'path'

import dotenv from 'dotenv'
dotenv.config()

const DATABASE_FILE_PATH: string = path.join(__dirname, '../../') + (process.env.DB_NAME || 'guarita_andaimes_db.sqlite')

const pagination: IPagination<SelectQueryBuilder<any>> = new TypeORMPagination;

export interface PaginationOptions {
    page?: number,
    take?: number
}

export interface IRepository {
    _entity: any

    create(data: {})

    all()

    findBy(where)

    findOneBy(where)

    update(entity: number, data: {})

    delete(id: number)

    search(query: {})

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

    public async all() {
        return await (this.getBuilder().getMany())
    }

    protected getBuilder() {
        return this.builder ?? this._entity.createQueryBuilder('entity')
    }

    protected setBuilder(builder: SelectQueryBuilder<BaseEntity>) {
        this.builder = builder
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

    public async delete(id: number|string) {
        await AppDataSource
            .createQueryBuilder()
            .delete()
            .from(this._entity)
            .where("id = :id", { id })
            .execute()
    }

    public async softDelete(id: number|string) {
        await AppDataSource
            .createQueryBuilder()
            .softDelete()
            .from(this._entity)
            .where("id = :id", { id })
            .execute()
    }

    public search(query: {}) {
        const builder = this.getBuilder()
        
        for (const key in query) 
            builder.orWhere(`entity.${key} like :${key}`, { [key]: `%${query[key]}%` })

        this.setBuilder(builder)

        return this
    }

    public nquery(content: string, params){

        let response =  AppDataSource.query(content, params)

        return response;

    }
}
