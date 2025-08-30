import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import cookieParser from 'cookie-parser';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { writeFileSync } from 'fs';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = new DocumentBuilder()
    .setTitle('Api neovook')
    .setDescription('Enssembles des routes de neovook')
    .setVersion('1.0')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);

  const document = SwaggerModule.createDocument(app, config);

  // Sert l’UI Swagger (optionnel si tu veux seulement le fichier)
  SwaggerModule.setup('api/docs', app, document);

  // --- Sauvegarde en fichier JSON ---
  writeFileSync('./swagger.json', JSON.stringify(document, null, 2), {
    encoding: 'utf8',
  });

  app.use(cookieParser());
  app.enableCors();
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
