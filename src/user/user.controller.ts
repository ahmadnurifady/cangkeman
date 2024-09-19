import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  HttpCode,
  HttpStatus,
  NotFoundException,
  InternalServerErrorException,
  Query,
  Logger,
} from '@nestjs/common';
import { UsersService } from './user.service';
import { CreateUserDto, UpdateUserDto } from './dto.model';
import { v4 } from 'uuid';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  private readonly logger = new Logger(UsersController.name);

  @Get()
  @HttpCode(HttpStatus.OK)
  async findAll(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
  ) {
    const maxLimit = 50;
    const appliedLimit = limit > maxLimit ? maxLimit : limit;
    const offset = (page - 1) * appliedLimit;
    const idLogTx = v4();
    const timestamp = new Date().toISOString();
    const users = await this.usersService.findAll(
      offset,
      appliedLimit,
      idLogTx,
      timestamp,
    );
    this.logger.log('find all user', idLogTx, timestamp);

    return {
      page: page,
      limit: appliedLimit,
      users: users,
    };
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async findOne(@Param('id') id: string) {
    try {
      const idLogTx = v4();
      const timestamp = new Date().toISOString();
      const user = await this.usersService.findOne(id, idLogTx, timestamp);
      if (!user) {
        throw new NotFoundException(`User with ID ${id} not found`);
      }
      this.logger.log('find one user', idLogTx, timestamp);
      return user;
    } catch (err) {
      throw new InternalServerErrorException(
        'Internal server error: ' + err.message,
      );
    }
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createUserDto: CreateUserDto) {
    try {
      const idLogTx = v4();
      const timestamp = new Date().toISOString();
      this.logger.log('create user', idLogTx, timestamp);
      return await this.usersService.create(createUserDto, idLogTx, timestamp);
    } catch (err) {
      throw new InternalServerErrorException(
        'Internal server error: ' + err.message,
      );
    }
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    try {
      const idLogTx = v4();
      const timestamp = new Date().toISOString();
      const updatedUser = await this.usersService.update(
        id,
        idLogTx,
        timestamp,
        updateUserDto,
      );
      if (!updatedUser) {
        throw new NotFoundException(`User with ID ${id} not found`);
      }
      this.logger.log('update user', idLogTx, timestamp);
      return updatedUser;
    } catch (err) {
      throw new InternalServerErrorException(
        'Internal server error: ' + err.message,
      );
    }
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Param('id') id: string) {
    try {
      const idLogTx = v4();
      const timestamp = new Date().toISOString();
      const result = await this.usersService.delete(id, idLogTx, timestamp);
      if (result === undefined) {
        throw new NotFoundException(`User with ID ${id} not found`);
      }
      this.logger.log('delete user', idLogTx, timestamp);
    } catch (err) {
      console.error(err);
    }
  }
}
