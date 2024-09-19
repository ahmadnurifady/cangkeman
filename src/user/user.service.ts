import { Injectable, Inject, Logger } from '@nestjs/common';
import { Users } from './user.model';
import * as bcrypt from 'bcrypt';
import { CreateUserDto, UpdateUserDto } from './dto.model';

@Injectable()
export class UsersService {
  public get usersRepository(): typeof Users {
    return this._usersRepository;
  }

  private readonly logger = new Logger(UsersService.name);

  constructor(
    @Inject('USERS_REPOSITORY')
    private _usersRepository: typeof Users,
  ) {}

  async findAll(
    offset: number,
    limit: number,
    idLogTx: string,
    timestamp: string,
  ): Promise<Users[]> {
    try {
      this.logger.log('find all user', idLogTx, timestamp);
      return this.usersRepository.findAll({ offset: offset, limit: limit });
    } catch (err) {
      console.log(err);
    }
  }

  async findOne(
    id: string,
    idLogTx: string,
    timestamp: string,
  ): Promise<Users> {
    try {
      const users = await this.usersRepository.findOne({ where: { id: id } });

      if (!users) {
        return null;
      }
      this.logger.log('find one user', idLogTx, timestamp);
      return users;
    } catch (err) {
      console.log(err);
    }
  }

  async create(
    createUserDto: CreateUserDto,
    idLogTx: string,
    timestamp: string,
  ): Promise<Users> {
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
      this.logger.log('find one user', idLogTx, timestamp);
      return newUser;
    } catch (err) {
      console.log(err);
    }
  }

  async update(
    id: string,
    idLogTx: string,
    timestamp: string,
    updateUserDto: UpdateUserDto,
  ): Promise<[number, Users[]]> {
    try {
      this.logger.log('update user', idLogTx, timestamp);
      const findUser = await this.findOne(id, idLogTx, timestamp);
      if (!findUser) {
        console.log('user not found');
      }
      const updateUser = await this.usersRepository.update(updateUserDto, {
        where: { id },
        returning: true,
      });

      return updateUser;
    } catch (err) {
      console.log(err);
    }
  }

  async delete(id: string, idLogTx: string, timestamp: string): Promise<void> {
    try {
      this.logger.log('update user', idLogTx, timestamp);
      const user = await this.usersRepository.findOne({ where: { id: id } });
      await user.destroy();
    } catch (err) {
      console.log(err);
    }
  }
}
