import { AbstractDocument } from "@app/common";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema({ timestamps: true })
export class MenuItem extends AbstractDocument {

  @Prop({ required: true, unique: true })
  name: string;          

  @Prop({ required: true, min: 0 })
  price: number;       

  @Prop({ default: true })
  isAvailable: boolean;  

  @Prop({ type: [String], default: [] })
  tags: string[];        // e.g., ["vegetarian", "spicy"]
}
export const MenuItemSchema = SchemaFactory.createForClass(MenuItem);