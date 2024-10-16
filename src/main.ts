import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { MyLogger } from './logger/logger';
// import { Intercept } from './middleware/intercept';
import { TransformInterceptor } from './middleware/response.mapping';
// import { TransformInterceptor } from './middleware/response.mapping';
import { JwtAuthGuard } from './auth/guards/jwt.guard';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: new MyLogger(),
  });
  const configService = new ConfigService();

  console.log(configService.get<string>('JWT_SECRET'));
  console.log(configService.get<string>('PUBLIC_KEY'));
  // app.useGlobalInterceptors(new Intercept());
  app.useGlobalGuards(
    new JwtAuthGuard(app.get(Reflector), app.get(JwtService)),
  );
  app.useGlobalInterceptors(new TransformInterceptor());
  await app.listen(3000);
}
bootstrap();
