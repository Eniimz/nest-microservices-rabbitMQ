import { NestFactory } from '@nestjs/core';
import { MenuModule } from './menu.module';

async function bootstrap() {
  const app = await NestFactory.create(MenuModule);
  await app.listen(3000);
}
bootstrap();
