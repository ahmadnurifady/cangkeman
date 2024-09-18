import { Users } from "./user.model";

export const usersProvider = [
    {
        provide : 'USERS_REPOSITORY',
        useValue : Users,
    }
]