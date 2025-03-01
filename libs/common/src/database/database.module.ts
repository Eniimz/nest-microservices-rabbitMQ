import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forRootAsync({ // tells nestjs to wait for some data before setting up this module
      
      useFactory: (configService: ConfigService) => ({ //once the data(config service) is ready, hers how you should set up the module
        uri: configService.get<string>('MONGODB_URI'),   
      }), 
      inject: [ConfigService],
    }),
  ],
})
export class DatabaseModule {}