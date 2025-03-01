import { AbstractDocument } from "@app/common";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";


@Schema({ versionKey: false })
export class Order extends AbstractDocument {

    //also has _id fiels as it extends abstract doc 

    @Prop()
    name: string

    @Prop()
    price: string

    @Prop()
    phoneNumber: string

}

export const OrderSchema = SchemaFactory.createForClass(Order)

