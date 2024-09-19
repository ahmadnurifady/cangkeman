import { SequelizeModuleOptions } from '@nestjs/sequelize';

export const databaseConfig: SequelizeModuleOptions = {
  dialect: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: Number(process.env.DB_PORT) || 5432,
  username: process.env.DB_USERNAME || 'your-username',
  password: process.env.DB_PASSWORD || 'your-password',
  database: process.env.DB_NAME || 'your-database',
  autoLoadModels: true,
};
