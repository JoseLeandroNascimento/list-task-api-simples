import { ValidationPipe} from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as fs from 'fs';
import { join } from 'path';

const options = {
  key: fs.readFileSync(join('./','certificado.key')),
  cert: fs.readFileSync(join('./',"certificado.cert"))
};

async function bootstrap() {


  const app = await NestFactory.create(AppModule,{httpsOptions:options});
  
  app.enableCors()

  app.useGlobalPipes(new ValidationPipe({

    whitelist:true,
    forbidNonWhitelisted:true,
    transform: true
  }))
  await app.listen(3040);
}
bootstrap();
