import {
  Injectable,
  Inject,
  InternalServerErrorException,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { Users } from './user.model';
import * as bcrypt from 'bcrypt';
import { CreateUserDto, UpdateUserDto } from './dto.model';
import { userServiceErrorMessage, UserServiceLogTitle } from './user.domain';
import { MyLogger } from 'src/logger/logger';

@Injectable()
export class UsersService {
  public get usersRepository(): typeof Users {
    return this._usersRepository;
  }

  private readonly logger = new MyLogger();

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
    const result = await this.usersRepository.findAll({
      offset: offset,
      limit: limit,
    });

    if (result.length < 1) {
      this.logger.error(
        userServiceErrorMessage.GENERAL_ERROR,
        idLogTx,
        timestamp,
        UserServiceLogTitle.ERROR,
      );
      throw new InternalServerErrorException(
        userServiceErrorMessage.GENERAL_ERROR,
      );
    }

    return result;
  }

  async findOne(
    id: string,
    idLogTx: string,
    timestamp: string,
  ): Promise<Users> {
    const users = await this.usersRepository.findByPk(id);

    if (!users) {
      this.logger.error(
        userServiceErrorMessage.NOT_FOUND,
        idLogTx,
        timestamp,
        UserServiceLogTitle.INFO,
      );
      throw new NotFoundException(userServiceErrorMessage.NOT_FOUND);
    }

    return users;
  }

  async create(
    createUserDto: CreateUserDto,
    idLogTx: string,
    timestamp: string,
  ): Promise<Users> {
    const checkUser = await this.usersRepository.findByPk(createUserDto.id);

    if (checkUser) {
      this.logger.log(
        userServiceErrorMessage.ID_IN_USE,
        idLogTx,
        timestamp,
        UserServiceLogTitle.INFO,
      );
      throw new BadRequestException(userServiceErrorMessage.ID_IN_USE);
    }

    const newUser = await this.usersRepository.create({
      ...createUserDto,
      password: await bcrypt.hash(createUserDto.password, 15),
    });

    return newUser;
  }

  async update(
    id: string,
    idLogTx: string,
    timestamp: string,
    updateUserDto: UpdateUserDto,
  ): Promise<[number, Users[]]> {
    const findUser = await this.usersRepository.findByPk(id);

    if (!findUser) {
      this.logger.log(
        userServiceErrorMessage.NOT_FOUND,
        idLogTx,
        timestamp,
        UserServiceLogTitle.INFO,
      );
      throw new NotFoundException(userServiceErrorMessage.NOT_FOUND);
    }

    const updateUser = await this.usersRepository.update(updateUserDto, {
      where: { id },
      returning: true,
    });

    if (updateUser[0] === 0) {
      console.log('updateUser[0]');
      this.logger.log(
        userServiceErrorMessage.GENERAL_ERROR,
        idLogTx,
        timestamp,
        UserServiceLogTitle.ERROR,
      );
      throw new InternalServerErrorException(
        userServiceErrorMessage.GENERAL_ERROR,
      );
    }

    return updateUser;
  }

  async delete(id: string, idLogTx: string, timestamp: string): Promise<void> {
    const user = await this.usersRepository.findByPk(id);

    if (!user) {
      this.logger.log(
        userServiceErrorMessage.NOT_FOUND,
        idLogTx,
        timestamp,
        UserServiceLogTitle.INFO,
      );
      throw new NotFoundException(userServiceErrorMessage.NOT_FOUND);
    }

    await user.destroy();
  }
}
