import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Article } from './entity/article.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ArticleService {
    constructor(@InjectRepository(Article) private readonly articleRepository: Repository<Article> ){

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


}
