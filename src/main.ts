import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  if (process.env.NODE_ENV === 'development') {
    const config = new DocumentBuilder()
      .setTitle('Nestjs boilerplate')
      .setDescription('The nestjs boilerplate description')
      .setVersion('1.0')
      .addTag('nestjs')
      .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, document, {
      explorer: true,
      swaggerOptions: {
        persistAuthorization: true,
      },
    });
  }

  await app
    .listen(process.env.SERVICE_PORT, process.env.SERVICE_HOST)
    .then(() => {
      console.info(
        `Server is running on ${process.env.SERVICE_HOST}:${process.env.SERVICE_PORT}`,
      );
    });
}
bootstrap();
