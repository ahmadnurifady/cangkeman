import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { MyLogger } from './logger/logger';
import { TransformInterceptor } from './middleware/response.mapping';
import { JwtAuthGuard } from './auth/guards/jwt.guard';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: new MyLogger(),
  });
  app.useGlobalInterceptors(new TransformInterceptor());
  app.useGlobalGuards(new JwtAuthGuard(app.get(Reflector)));
  await app.listen(3000);
}
bootstrap();
