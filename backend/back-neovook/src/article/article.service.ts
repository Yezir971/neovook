import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Article } from './entity/article.entity';
import { Repository } from 'typeorm';
import { articleDeleteBodyDto, articleUpdateBodyDto, getArticle } from 'src/models/article.models';

@Injectable()
export class ArticleService {
    constructor(@InjectRepository(Article) private readonly articleRepository: Repository<Article> ){

    }

    async getArticle(article : articleDeleteBodyDto) {
        return this.articleRepository.findOneBy({['id_post'] : article.id_post})
    }
    async createArtcile(article : Article) : Promise<String>{
        try {
            const newArticle = this.articleRepository.create(article); 
            await this.articleRepository.save(newArticle);
            throw new HttpException('article ajouter avec succès', HttpStatus.CREATED);

        } catch (error) {
            console.error('Erreur création de l\' article:', error); 
            throw new HttpException("Une erreur s'est produite au niveau de la création de l\' article", HttpStatus.NOT_FOUND);
        }
    }

    async updateArticle(article : articleUpdateBodyDto) : Promise<HttpStatus>{
        try {
            const isExisteArticle = this.getArticleById(article.id_post)
            if(!isExisteArticle){
                throw new Error('l\'article n\'existe pas')
            }
            await this.articleRepository.update(article.id_post, article)
            throw new HttpException('article modifier avec succès', HttpStatus.OK);
        } catch (error) {
            console.error('Erreur de la modification de l\' article:', error); 
            throw new HttpException("Une erreur s'est produite au niveau de la modification de l\' article", HttpStatus.NOT_FOUND);
        }
    }

    async deleteArticle(article : articleDeleteBodyDto) : Promise<HttpStatus>{
        try {
            await this.articleRepository.delete(article)
            throw new HttpException("article supprimer avec succèss", HttpStatus.OK);
        } catch (error) {
            console.error('Erreur lors de la suppression de l\' article:', error); 
            throw new HttpException("Une erreur s'est produite au moment de la suppression de l\' article", HttpStatus.NOT_FOUND);
        }
    }

    async getArticleById(articleId : string){
        return this.articleRepository.findOneBy({['id_post'] : articleId})
    }

    async getallArticle() {
        return this.articleRepository.find()
    }


}
