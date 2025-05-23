import { AbstractRepositry } from "@app/common";
import { Inject, Injectable, Logger } from "@nestjs/common";
import { MenuItem } from "../schemas/menu-item.schema";
import { InjectConnection, InjectModel } from "@nestjs/mongoose";
import { Connection, Model } from "mongoose";

@Injectable()
export class MenuRepositry extends AbstractRepositry<MenuItem> {
    protected logger = new Logger(MenuRepositry.name);
    
    constructor(
        @InjectModel(MenuItem.name) protected menuItemModel: Model<MenuItem>,
        @InjectConnection() connection: Connection 
    ){
        super(menuItemModel, connection)
    }



}