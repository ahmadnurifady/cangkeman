import { Sequelize } from 'sequelize-typescript';
import { Users } from 'src/user/user.model';

export const databaseProvider = [
  {
    provide: 'SEQUELIZE',
    useFactory: async () => {
      const sequelize = new Sequelize({
        dialect: 'postgres',
        host: process.env.DB_HOST || 'localhost',
        port: Number(process.env.DB_PORT) || 5432,
        username: process.env.DB_USERNAME || 'your-username',
        password: process.env.DB_PASSWORD || 'your-password',
        database: process.env.DB_NAME || 'your-database',
      });
      sequelize.addModels([Users]);
      await sequelize.sync();
      return sequelize;
    },
  },
];
