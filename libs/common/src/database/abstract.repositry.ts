import { FilterQuery, Model, SaveOptions, Types, UpdateQuery } from "mongoose";
import { AbstractDocument } from "./abstract.schema";
import { Logger, NotFoundException } from "@nestjs/common";
import { Connection } from "mongoose";


export abstract class AbstractRepositry<TDocument extends AbstractDocument> {
    
    protected abstract readonly logger: Logger;

    constructor(
        protected readonly model: Model<TDocument>,
        protected readonly connection: Connection
    ) {}

    async create(
        document: Omit<TDocument, '_id'>,
        options?: SaveOptions
    ): Promise<TDocument> {
        const createdDocument = new this.model({
            ...document,
            _id: new Types.ObjectId
        })

        return (
            await createdDocument.save(options)
        ).toJSON() as unknown as TDocument
    }

    async findOne(
        filterQuery: FilterQuery<TDocument>
    ): Promise<TDocument> {

        const foundDocument = await this.model.findOne(filterQuery, {}, { lean: true })

        if(!foundDocument){
            this.logger.warn('Document not found with filterQuery ', filterQuery)
            throw new NotFoundException('Document not found')
        }
        
        return foundDocument as unknown as TDocument
    }

    async findOneAndUpdate(
        filterQuery: FilterQuery<TDocument>,
        update: UpdateQuery<TDocument>
    ): Promise<TDocument> {
        const foundDocument = await this.model.findOneAndUpdate(filterQuery, update, {
            lean: true,
            new: true
        })

        if(!foundDocument){
            this.logger.warn('Document not found with the filter query: ', filterQuery)
            throw new NotFoundException('Document not found')
        }

        return foundDocument as unknown as TDocument

    }

}