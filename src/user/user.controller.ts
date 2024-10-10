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
  Query,
} from '@nestjs/common';
import { UsersService } from './user.service';
import { CreateUserDto, UpdateUserDto } from './dto.model';
import { v4 } from 'uuid';
import { LOGTYPE } from 'src/logger/logger.domain';
import { MyLogger } from 'src/logger/logger';
import { UserControllerLogTitle } from './user.domain';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  private readonly logger = new MyLogger();

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

    this.logger.log(
      LOGTYPE.SUCCESS,
      idLogTx,
      timestamp,
      UserControllerLogTitle.SUCCESS,
    );

    return {
      page: page,
      limit: appliedLimit,
      users: users,
    };
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async findOne(@Param('id') id: string) {
    const idLogTx = v4();
    const timestamp = new Date().toISOString();

    const result = await this.usersService.findOne(id, idLogTx, timestamp);
    this.logger.log(
      LOGTYPE.SUCCESS,
      idLogTx,
      timestamp,
      UserControllerLogTitle.SUCCESS,
    );
    return result;
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createUserDto: CreateUserDto) {
    const idLogTx = v4();
    const timestamp = new Date().toISOString();

    const result = await this.usersService.create(
      createUserDto,
      idLogTx,
      timestamp,
    );

    this.logger.log(
      LOGTYPE.SUCCESS,
      idLogTx,
      timestamp,
      UserControllerLogTitle.SUCCESS,
    );

    return result;
  }

  @Put('coin/:id')
  @HttpCode(HttpStatus.OK)
  async addCoinUser(@Param('id') id: string) {
    const idLogTx = v4();
    const timestamp = new Date().toISOString();

    const result = await this.usersService.addCoinUser(id);

    this.logger.log(
      LOGTYPE.SUCCESS,
      idLogTx,
      timestamp,
      UserControllerLogTitle.SUCCESS,
    );

    return result;
  }

  @Put('new/password/:id')
  @HttpCode(HttpStatus.OK)
  async changePassword(
    @Param('id') id: string,
    @Body('newPassword') newPassword: string,
  ) {
    const idLogTx = v4();
    const timestamp = new Date().toISOString();

    const changePassword = await this.usersService.changePassword(
      id,
      newPassword,
      idLogTx,
      timestamp,
    );

    this.logger.log(
      LOGTYPE.SUCCESS,
      idLogTx,
      timestamp,
      UserControllerLogTitle.SUCCESS,
    );

    return changePassword;
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    const idLogTx = v4();
    const timestamp = new Date().toISOString();

    const updatedUser = await this.usersService.update(
      id,
      idLogTx,
      timestamp,
      updateUserDto,
    );

    this.logger.log(
      LOGTYPE.SUCCESS,
      idLogTx,
      timestamp,
      UserControllerLogTitle.SUCCESS,
    );

    return updatedUser;
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Param('id') id: string) {
    const idLogTx = v4();
    const timestamp = new Date().toISOString();

    const result = await this.usersService.delete(id, idLogTx, timestamp);

    this.logger.log(
      LOGTYPE.SUCCESS,
      idLogTx,
      timestamp,
      UserControllerLogTitle.SUCCESS,
    );

    return result;
  }
}
