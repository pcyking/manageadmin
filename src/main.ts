import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from 'libs/filters/http-exception.filter';
// import { TransformInterceptor } from 'libs/interceptor/transform.interceptor';
const PORT = process.env.SERVE_PORT || 3000;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new HttpExceptionFilter());
  // app.useGlobalInterceptors(new TransformInterceptor());
  await app.listen(PORT);
}
bootstrap();
