import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Article } from './entity/article.entity';
import { Repository } from 'typeorm';
import {
  articleDeleteBodyDto,
  articleUpdateBodyDto,
  getArticle,
} from 'src/models/article.models';

@Injectable()
export class ArticleService {
  constructor(
    @InjectRepository(Article)
    private readonly articleRepository: Repository<Article>,
  ) {}

  async getArticle(article: articleDeleteBodyDto) {
    return this.articleRepository.findOneBy({ ['id_post']: article.id_post });
  }
  async getArticleUser(idUser) {
    return this.articleRepository.find({
      where: { id_user_who_post: { id_user: idUser } },
    });
  }

  async createArtcile(article: Article) {
    try {
      const newArticle = this.articleRepository.create(article);
      await this.articleRepository.save(newArticle);
      return {
        statusCode: HttpStatus.CREATED,
        message: 'Article ajouté avec succès',
        data: newArticle,
      };
    } catch (error) {
      console.error("Erreur création de l' article:", error);
      throw new HttpException(
        "Une erreur s'est produite au niveau de la création de l\' article" +
          error,
        HttpStatus.NOT_FOUND,
      );
    }
  }

  async updateArticle(article: articleUpdateBodyDto) {
    try {
      const isExisteArticle = this.getArticleById(article.id_post);
      if (!isExisteArticle) {
        throw new Error("l'article n'existe pas");
      }
      await this.articleRepository.update(article.id_post, article);
      return {
        statusCode: HttpStatus.OK,
        message: 'article modifier avec succès',
      };
    } catch (error) {
      console.error("Erreur de la modification de l' article:", error);
      throw new HttpException(
        "Une erreur s'est produite au niveau de la modification de l\' article",
        HttpStatus.NOT_FOUND,
      );
    }
  }

  async deleteArticle(article: articleDeleteBodyDto) {
    try {
      await this.articleRepository.delete(article);
      return {
        statusCode: HttpStatus.OK,
        message: 'article supprimer avec succèss',
      };
    } catch (error) {
      console.error("Erreur lors de la suppression de l' article:", error);
      throw new HttpException(
        "Une erreur s'est produite au moment de la suppression de l\' article",
        HttpStatus.NOT_FOUND,
      );
    }
  }

  async getArticleById(articleId: string) {
    return this.articleRepository.findOneBy({ ['id_post']: articleId });
  }

  async getallArticle() {
    return this.articleRepository.find();
  }
}
