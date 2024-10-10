import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
  Query,
} from '@nestjs/common';
import { v4 } from 'uuid';
import { CoinTransactionService } from './coin.tx.service';
import { CreateCoinTxDto } from 'src/utils/dto.model';
import { MyLogger } from 'src/logger/logger';
import { CoinTxControllerLogTitle } from './coin.tx.domain';
import { LOGTYPE } from 'src/logger/logger.domain';

@Controller('coins')
export class CoinTransactionController {
  constructor(
    private readonly coinTransactionService: CoinTransactionService,
  ) {}

  private readonly logger = new MyLogger();

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createCoinTxDto: CreateCoinTxDto) {
    const idLogTx = v4();
    const timestamp = new Date().toISOString();

    const result = await this.coinTransactionService.create(
      createCoinTxDto,
      idLogTx,
      timestamp,
    );

    this.logger.log(
      LOGTYPE.SUCCESS,
      idLogTx,
      timestamp,
      CoinTxControllerLogTitle.SUCCESS,
    );

    return result;
  }

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

    const result = await this.coinTransactionService.findAll(
      offset,
      appliedLimit,
      idLogTx,
      timestamp,
    );

    this.logger.log(
      LOGTYPE.SUCCESS,
      idLogTx,
      timestamp,
      CoinTxControllerLogTitle.SUCCESS,
    );

    return result;
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async findOne(@Param('id') id: string) {
    const idLogTx = v4();
    const timestamp = new Date().toISOString();

    const result = await this.coinTransactionService.findOne(id);
    this.logger.log(
      LOGTYPE.SUCCESS,
      idLogTx,
      timestamp,
      CoinTxControllerLogTitle.SUCCESS,
    );

    return result;
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  async remove(@Param('id') id: string) {
    const idLogTx = v4();
    const timestamp = new Date().toISOString();

    const result = await this.coinTransactionService.remove(id);
    this.logger.log(
      LOGTYPE.SUCCESS,
      idLogTx,
      timestamp,
      CoinTxControllerLogTitle.SUCCESS,
    );

    return result;
  }
}
