import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Article } from './entity/article.entity';
import { Repository } from 'typeorm';
import { articleDeleteBodyDto, articleUpdateBodyDto } from 'src/models/article.models';

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

            return "article ajouter avec succès"
        } catch (error) {
            console.error('Erreur création de l\' article:', error); 
            throw new Error("Une erreur s'est produite au niveau de la création de l\' article");
        }
    }

    async updateArticle(article : articleUpdateBodyDto) : Promise<String>{
        try {
            const isExisteArticle = this.getArticleById(article.id_post)
            if(!isExisteArticle){
                throw new Error('l\'article n\'existe pas')
            }
            await this.articleRepository.update(article.id_post, article)
            return "article modifier avec succès"
        } catch (error) {
            console.error('Erreur de la modification de l\' article:', error); 
            throw new Error("Une erreur s'est produite au niveau de la modification de l\' article");
            
        }
    }

    async deleteArticle(article : articleDeleteBodyDto) : Promise<String>{
        try {
            await this.articleRepository.delete(article)
            return "article supprimer avec succèss"
        } catch (error) {
            console.error('Erreur lors de la suppression de l\' article:', error); 
            throw new Error("Une erreur s'est produite au moment de la suppression de l\' article");
        }
    }

    async getArticleById(articleId : string){
        return this.articleRepository.findOneBy({['id_post'] : articleId})

    }


}
