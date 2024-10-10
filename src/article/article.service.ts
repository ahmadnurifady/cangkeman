import {
  Injectable,
  Inject,
  NotFoundException,
  InternalServerErrorException,
  BadRequestException,
} from '@nestjs/common';
import { Articles } from './article.model';
import { CreateArticleDto, UpdateArticleDto } from './dto.model';
import { Users } from 'src/user/user.model';
import {
  ArticleControllerLogTitle,
  articleServiceErrorMessage,
} from './article.domain';
import { MyLogger } from 'src/logger/logger';
import { Sequelize } from 'sequelize-typescript';
import { userServiceErrorMessage } from 'src/user/user.domain';

@Injectable()
export class ArticleService {
  private readonly logger = new MyLogger();

  constructor(
    @Inject('ARTICLE_REPOSITORY')
    private articleRepository: typeof Articles,
    @Inject('USERS_REPOSITORY')
    private usersRepository: typeof Users,
    @Inject('SEQUELIZE')
    private readonly sequelize: Sequelize,
  ) {}

  // Create Article
  async create(
    createArticleDto: CreateArticleDto,
    idLogTx: string,
    timestamp: string,
  ): Promise<Articles> {
    const findArticle = await this.articleRepository.findByPk(
      createArticleDto.id,
    );

    console.log(createArticleDto.userId);
    console.log(typeof createArticleDto.userId);

    if (createArticleDto.userId === null || createArticleDto.userId === '') {
      createArticleDto.userId = '';
    }

    if (findArticle) {
      this.logger.error(
        articleServiceErrorMessage.ID_IN_USE,
        idLogTx,
        timestamp,
        ArticleControllerLogTitle.ERROR,
      );

      throw new BadRequestException(
        'Article with ID ' + createArticleDto.id + ' already exists',
      );
    }

    const findUser = await this.usersRepository.findByPk(
      createArticleDto.userId,
    );

    if (findUser) {
      createArticleDto.userId = findUser.id;
    }

    // Pembuatan artikel
    const createArticle = await this.articleRepository.create({
      ...createArticleDto,
    });

    return createArticle;
  }

  // Find All Articles
  async findAll(
    offset: number,
    limit: number,
    idLogTx: string,
    timestamp: string,
  ): Promise<Articles[]> {
    const result = await this.articleRepository.findAll({
      offset: offset,
      limit: limit,
    });

    if (result.length < 1) {
      this.logger.error(
        articleServiceErrorMessage.GENERAL_ERROR,
        idLogTx,
        timestamp,
        ArticleControllerLogTitle.ERROR,
      );
      throw new InternalServerErrorException(
        articleServiceErrorMessage.GENERAL_ERROR,
      );
    }

    return result;
  }

  // Find One Article
  async findOne(id: string): Promise<Articles> {
    const article = await this.articleRepository.findByPk(id);

    if (!article) {
      throw new NotFoundException('Article not found');
    }
    return article;
  }

  async changeStatus(id: string): Promise<string> {
    const t = await this.sequelize.transaction();

    const article = await this.articleRepository.findByPk(id);

    if (!article) {
      throw new NotFoundException(articleServiceErrorMessage.NOT_FOUND);
    }

    article.status = !article.status;
    await article.save({ transaction: t });

    const findUser = await this.usersRepository.findOne({
      where: { username: article.userName },
    });

    if (!findUser) {
      await t.rollback();
      throw new NotFoundException(userServiceErrorMessage.NOT_FOUND);
    }

    findUser.totalCoin++;
    await findUser.save({ transaction: t });
    await t.commit();

    return 'Status article berhasil diubah';
  }

  // Update Article
  async update(
    id: string,
    idLogTx: string,
    timestamp: string,
    updateArticleDto: UpdateArticleDto,
  ): Promise<Articles> {
    const article = await this.articleRepository.findByPk(id);

    if (!article) {
      throw new NotFoundException(articleServiceErrorMessage.NOT_FOUND);
    }

    const updateArticle = await article.update(updateArticleDto);

    if (updateArticle[0] === 0) {
      this.logger.error(
        articleServiceErrorMessage.GENERAL_ERROR,
        idLogTx,
        timestamp,
        ArticleControllerLogTitle.ERROR,
      );
      throw new InternalServerErrorException(
        articleServiceErrorMessage.GENERAL_ERROR,
      );
    }
    return updateArticle;
  }

  // Delete Article
  async remove(id: string): Promise<string> {
    const article = await this.articleRepository.findByPk(id);

    if (!article) {
      throw new NotFoundException(articleServiceErrorMessage.NOT_FOUND);
    }

    await article.destroy();
    return 'Success Delete Article';
  }
}
