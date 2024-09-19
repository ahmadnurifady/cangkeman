import { Injectable, Inject, Logger } from '@nestjs/common';
import { Users } from './user.model';
import * as bcrypt from 'bcrypt';
import { CreateUserDto, UpdateUserDto } from './dto.model';

@Injectable()
export class UsersService {
  private readonly logger = new Logger(UsersService.name);

  constructor(
    @Inject('USERS_REPOSITORY')
    private usersRepository: typeof Users,
  ) {}

  async findAll(): Promise<Users[]> {
    return this.usersRepository.findAll();
  }

  async findOne(id: string): Promise<Users> {
    this.logger.log('Mantappp Jiwaa');
    return this.usersRepository.findOne({ where: { id } });
  }

  async create(createUserDto: CreateUserDto): Promise<Users> {
    try {
      const checkUser = await Users.findOne({
        where: { id: createUserDto.id },
      });

      if (checkUser) {
        throw new Error(`User ${createUserDto.id} already exists`);
      }

      const newUser = await this.usersRepository.create({
        ...createUserDto,
        password: await bcrypt.hash(createUserDto.password, 15),
      });
      return newUser;
    } catch (err) {
      console.log(err);
    }
  }

  async update(
    id: string,
    updateUserDto: UpdateUserDto,
  ): Promise<[number, Users[]]> {
    return this.usersRepository.update(updateUserDto, {
      where: { id },
      returning: true,
    });
  }

  async delete(id: string): Promise<void> {
    const user = await this.findOne(id);
    await user.destroy();
  }
}
