import { AbstractRepositry } from "@app/common";
import { User } from "./schemas/user.schema";
import { Injectable, Logger } from "@nestjs/common";
import { Connection, FilterQuery, Model } from "mongoose";
import { InjectConnection, InjectModel } from "@nestjs/mongoose";

@Injectable()
export class UsersRepositry extends AbstractRepositry<User> {

    constructor(
        @InjectModel(User.name) protected userModel: Model<User> , 
        @InjectConnection() connection: Connection
    ){
        super(userModel, connection)
    }

    protected readonly logger = new Logger(UsersRepositry.name)

}