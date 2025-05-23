import { AbstractDocument } from "@app/common";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { required } from "joi";
import { OrderStatus } from '../types/order.types';

@Schema({ versionKey: false, timestamps: true })
export class Order extends AbstractDocument {

    //also has _id field as it extends abstract doc 

    @Prop({ required: true, type: String })
    userId: string

    @Prop([{
        name: { type: String, required: true },
        price: { type: Number, required: true },
        quantity: { type: Number, required: true },
    }])
    items: Array<{ name: string; price: number; quantity: number }>

    @Prop({
        type: String,
        enum: [
          'pending',
          'confirmed',
          'preparing',
          'out_for_delivery',
          'delivered',
          'cancelled',
        ],
        default: 'pending',
      })
      status: OrderStatus;

      @Prop({ type: String, required: false, default: 'Not Assigned' })
      driverId ?: string;

}

export const OrderSchema = SchemaFactory.createForClass(Order)

