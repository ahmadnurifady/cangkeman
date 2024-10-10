import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { Users } from 'src/user/user.model';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/user/dto.model';

@Injectable()
export class AuthService {
  constructor(
    @Inject('USERS_REPOSITORY')
    private userRepo: typeof Users,
    private jwtService: JwtService,
  ) {}

  async GenerateToken(username: string, passwordUser: string) {
    const findUser = await this.userRepo.findOne({
      where: { username: username },
    });
    if (!findUser) {
      return null;
    }
    const isMatch = bcrypt.compareSync(passwordUser, findUser.password);
    if (!isMatch) {
      throw new BadRequestException('password salah');
    }

    return this.jwtService.sign({ userId: findUser.id });
  }

  async RegisterUser(payload: CreateUserDto): Promise<Users> {
    const isExist = await this.userRepo.findOne({
      where: { username: payload.userName },
    });
    if (isExist) {
      throw new BadRequestException(
        'Username sudah ada, silahkan gunakan username lainnya',
      );
    }

    const createUser = await this.userRepo.create({
      password: bcrypt.hash(payload.password, 15),
      ...payload,
    });

    return createUser;
  }
}
