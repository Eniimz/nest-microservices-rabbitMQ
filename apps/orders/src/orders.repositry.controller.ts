import { AbstractRepositry } from "@app/common";
import { Order } from "./schemas/order.schema";
import { Injectable, Logger } from "@nestjs/common";
import { InjectConnection, InjectModel } from "@nestjs/mongoose";
import { Connection, Model } from "mongoose";

@Injectable()
export class OrdersRepositry extends AbstractRepositry<Order> {
    
    protected logger: Logger = new Logger(OrdersRepositry.name);

    constructor(
        @InjectModel(Order.name) protected orderModel: Model<Order>,
        @InjectConnection() connection: Connection
    ){
        super(orderModel, connection)
    }

}