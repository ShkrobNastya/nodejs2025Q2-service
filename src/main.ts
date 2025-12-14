import { NestFactory } from '@nestjs/core';
import * as dotenv from 'dotenv';
import * as YAML from 'yamljs';
import { SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { AppDataSource } from './data-source';
import { LoggingService } from './common/services/logging.service';
import { LoggingLevel } from './common/helpers/enums';

async function bootstrap() {
  dotenv.config();

  try {
    await AppDataSource.initialize();
    await AppDataSource.runMigrations();
    console.log('Database migrations completed successfully!');
  } catch (error) {
    console.error('Error during database initialization or migration:', error);
    process.exit(1);
  }

  const app = await NestFactory.create(AppModule);

  const loggerService = app.get(LoggingService);

  process.on('uncaughtException', (err) => {
    loggerService.logMessage(
      LoggingLevel.ERROR,
      `uncaughtException: ${err.stack}`,
    );
    process.exit(1);
  });

  process.on('unhandledRejection', (reason) => {
    loggerService.logMessage(
      LoggingLevel.ERROR,
      `unhandledRejection: ${reason}`,
    );
  });

  const port = process.env.PORT || 4000;

  const swaggerDocument = YAML.load('./doc/api.yaml');
  SwaggerModule.setup('doc', app, swaggerDocument);

  await app.listen(port);
}
bootstrap();
