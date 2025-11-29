import { NestFactory } from '@nestjs/core';
import * as dotenv from 'dotenv';
import * as YAML from 'yamljs';
import { SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  dotenv.config();
  const app = await NestFactory.create(AppModule);

  const port = process.env.PORT || 4000;

  const swaggerDocument = YAML.load('./doc/api.yaml');
  SwaggerModule.setup('doc', app, swaggerDocument);

  await app.listen(port);
}
bootstrap();
