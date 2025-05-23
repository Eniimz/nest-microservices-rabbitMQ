import { Module } from '@nestjs/common';
import { MenuController } from './menu.controller';
import { MenuService } from './menu.service';
import { MenuRepositry } from './menu.repositry.controller';
import { DatabaseModule } from '@app/common/database/database.module';
import { MongooseModule } from '@nestjs/mongoose';
import { MenuItem, MenuItemSchema } from '../schemas/menu-item.schema';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        MONGODB_URI: Joi.string().required(),
    }),
      envFilePath: './apps/menu/.env',
    }), 
    DatabaseModule, //for connecting to the database
    MongooseModule.forFeature([{ name: MenuItem.name, schema: MenuItemSchema }]), //for registering the model schema
  ],
  controllers: [MenuController],
  providers: [MenuService, MenuRepositry],
})
export class MenuModule {}
