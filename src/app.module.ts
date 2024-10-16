import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './user/user.module';
import { DatabaseModule } from './database/database.module';
import { ArticleModule } from './article/article.module';
import { CoinTransactionModule } from './coin-transaction/coin.tx.module';
import { AuthModule } from './auth/auth.module';
// import { APP_GUARD } from '@nestjs/core';
// import { JwtAuthGuard } from './auth/guards/jwt.guard';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    UsersModule,
    ArticleModule,
    DatabaseModule,
    CoinTransactionModule,
    AuthModule,
  ],
})
export class AppModule {}
