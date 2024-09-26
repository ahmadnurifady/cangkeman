import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ArticleService } from './article.service';
import { CreateArticleDto, UpdateArticleDto } from './dto.model';
import { v4 } from 'uuid';
import { MyLogger } from 'src/logger/logger';
import { LOGTYPE } from 'src/logger/logger.domain';
import { ArticleControllerLogTitle } from './article.domain';

@Controller('articles')
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}
  private readonly logger = new MyLogger();

  // Create a new article
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createArticleDto: CreateArticleDto) {
    const idLogTx = v4();
    const timestamp = new Date().toISOString();

    const result = await this.articleService.create(
      createArticleDto,
      idLogTx,
      timestamp,
    );

    this.logger.log(
      LOGTYPE.SUCCESS,
      idLogTx,
      timestamp,
      ArticleControllerLogTitle.SUCCESS,
    );

    return result;
  }

  // Get all articles
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

    const result = await this.articleService.findAll(
      offset,
      appliedLimit,
      idLogTx,
      timestamp,
    );
    this.logger.log(
      LOGTYPE.SUCCESS,
      idLogTx,
      timestamp,
      ArticleControllerLogTitle.SUCCESS,
    );
    return result;
  }

  // Get one article by ID
  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async findOne(@Param('id') id: string) {
    const idLogTx = v4();
    const timestamp = new Date().toISOString();

    const result = await this.articleService.findOne(id);
    this.logger.log(
      LOGTYPE.SUCCESS,
      idLogTx,
      timestamp,
      ArticleControllerLogTitle.SUCCESS,
    );

    return result;
  }

  // Update an article by ID
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateArticleDto: UpdateArticleDto,
  ) {
    const idLogTx = v4();
    const timestamp = new Date().toISOString();

    const result = await this.articleService.update(
      id,
      idLogTx,
      timestamp,
      updateArticleDto,
    );

    this.logger.log(
      LOGTYPE.SUCCESS,
      idLogTx,
      timestamp,
      ArticleControllerLogTitle.SUCCESS,
    );

    return result;
  }

  // Delete an article by ID
  @Delete(':id')
  async remove(@Param('id') id: string) {
    const idLogTx = v4();
    const timestamp = new Date().toISOString();

    const result = await this.articleService.remove(id);
    this.logger.log(
      LOGTYPE.SUCCESS,
      idLogTx,
      timestamp,
      ArticleControllerLogTitle.SUCCESS,
    );

    return result;
  }
}
