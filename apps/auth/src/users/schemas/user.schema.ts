import { AbstractDocument } from "@app/common";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";


export enum UserRole {
    ADMIN = 'admin',
    CUSTOMER = 'customer',
    DRIVER = 'driver',
}

@Schema({ versionKey: false })
export class User extends AbstractDocument {

    @Prop()
    email: string

    @Prop()
    password: string

    @Prop({
        type: String,
        enum: UserRole,
        default: UserRole.CUSTOMER  
    })
    role: UserRole
}



export const UserSchema = SchemaFactory.createForClass(User)