import { Provider } from '@nestjs/common';
import { Users } from './user.model';

export const usersProvider: Array<Provider> = [
  {
    provide: 'USERS_REPOSITORY',
    useValue: Users,
  },
];
