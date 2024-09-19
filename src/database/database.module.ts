import { Module } from '@nestjs/common';
import { databaseProvider } from './connection';

@Module({
  providers: [...databaseProvider],
  exports: [...databaseProvider],
})
export class DatabaseModule {}
