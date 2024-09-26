import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { ArticleController } from './article.controller';
import { ArticleService } from './article.service';
import { articlesProvider } from './article.provider';
import { usersProvider } from 'src/user/user.providers';

@Module({
  imports: [DatabaseModule],
  controllers: [ArticleController],
  providers: [ArticleService, ...articlesProvider, ...usersProvider],
})
export class ArticleModule {}
