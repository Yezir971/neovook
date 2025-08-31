import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  Post,
  Req,
} from '@nestjs/common';
import { ArticleService } from './article.service';
import { Article } from './entity/article.entity';
import { Public } from 'src/common/decorators/public.decorator';
import type {
  articleDeleteBodyDto,
  articleUpdateBodyDto,
  getArticle,
} from 'src/models/article.models';
import type { Request } from 'express';
import { log } from 'console';

@Controller('api/article')
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}

  @Get('get')
  async getAllArticle() {
    return await this.articleService.getallArticle();
  }
  @Get('user/get')
  async getArticleUser(@Req() request: Request) {
    const userJwt = request['user'];
    let idUser = userJwt.userId;
    return await this.articleService.getArticleUser(idUser);
  }

  @Post('create')
  async createArticle(@Body() article: Article, @Req() request: Request) {
    const userJwt = request['user'];
    article.id_user_who_post = userJwt.userId;
    return await this.articleService.createArtcile(article);
  }
  @Patch('update')
  async updateArticle(
    @Req() request: Request,
    @Body() articleUpdate: articleUpdateBodyDto,
  ) {
    const userJwt = request['user'];

    const article = await this.articleService.getArticleById(
      articleUpdate.id_post,
    );

    if (!article) {
      throw new Error("L'article n' existe pas !");
    }

    if (article.id_user_who_post.id_user !== userJwt.userId) {
      throw new Error(
        "Vous ne pouvez pas mettre à jour un article qui n'est pas le votre !",
      );
    }
    return await this.articleService.updateArticle(articleUpdate);
  }

  // route pour supprimer un article
  @Delete('delete')
  async deleteArticle(
    @Req() request: Request,
    @Body() articleBody: articleDeleteBodyDto,
  ) {
    const userJwt = request['user'];

    const article = await this.articleService.getArticleById(
      articleBody.id_post,
    );

    if (!article) {
      throw new Error("L'article n' existe pas !");
    }

    if (article.id_user_who_post.id_user !== userJwt.userId) {
      throw new Error(
        "Vous ne pouvez pas supprimer un article qui n'est pas le votre !",
      );
    }

    return await this.articleService.deleteArticle(articleBody);
  }
}
