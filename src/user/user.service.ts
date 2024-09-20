import {
  Injectable,
  Inject,
  Logger,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { Users } from './user.model';
import * as bcrypt from 'bcrypt';
import { CreateUserDto, UpdateUserDto } from './dto.model';
import { userServiceErrorMessage } from './user.domain';

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
      throw new InternalServerErrorException(
        userServiceErrorMessage.GENERAL_ERROR + err.message,
      );
    }
  }

  async findOne(
    id: string,
    idLogTx: string,
    timestamp: string,
  ): Promise<Users> {
    try {
      const users = await this.usersRepository.findByPk(id);

      if (!users) {
        throw new NotFoundException(userServiceErrorMessage.NOT_FOUND);
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
      const checkUser = await this.findOne(
        createUserDto.id,
        idLogTx,
        timestamp,
      );

      if (checkUser) {
        throw new NotFoundException(userServiceErrorMessage.NOT_FOUND);
      }

      const newUser = await this.usersRepository.create({
        ...createUserDto,
        password: await bcrypt.hash(createUserDto.password, 15),
      });
      this.logger.log('find one user', idLogTx, timestamp);
      return newUser;
    } catch (err) {
      console.log(err);
      throw new InternalServerErrorException(
        userServiceErrorMessage.GENERAL_ERROR + err.message,
      );
    }
  }

  async update(
    id: string,
    idLogTx: string,
    timestamp: string,
    updateUserDto: UpdateUserDto,
  ): Promise<[number, Users[]]> {
    try {
      const findUser = await this.findOne(id, idLogTx, timestamp);
      if (!findUser) {
        throw new NotFoundException(userServiceErrorMessage.NOT_FOUND);
      }
      const updateUser = await this.usersRepository.update(updateUserDto, {
        where: { id },
        returning: true,
      });
      this.logger.log('update user', idLogTx, timestamp);

      return updateUser;
    } catch (err) {
      console.log(err);
      throw new InternalServerErrorException(
        userServiceErrorMessage.GENERAL_ERROR + err.message,
      );
    }
  }

  async delete(id: string, idLogTx: string, timestamp: string): Promise<void> {
    try {
      const user = await this.findOne(id, idLogTx, timestamp);
      if (!user) {
        throw new NotFoundException(userServiceErrorMessage.NOT_FOUND);
      }
      this.logger.log('delete user', idLogTx, timestamp);
      await user.destroy();
    } catch (err) {
      console.log(err);
      throw new InternalServerErrorException(
        userServiceErrorMessage.GENERAL_ERROR + err.message,
      );
    }
  }
}
