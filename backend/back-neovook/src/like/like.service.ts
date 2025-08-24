import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like } from './entity/like.entity';
import { Repository } from 'typeorm';
import { LikeAddBodyDto } from 'src/models/like.models';
import { ArticleService } from 'src/article/article.service';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class LikeService {
    constructor(@InjectRepository(Like) private readonly likeRepository : Repository<Like>, private readonly articleService : ArticleService,private readonly userService: UsersService ){

    }

    async addLike(likeBody : LikeAddBodyDto, userJwtId : string){
        try {
                // Vérifie que l'article existe
            const article_id = await this.articleService.getArticle({ id_post: likeBody.id_post });
            if (!article_id) {
                throw new Error("L'article n'existe pas !");
            }

            // Récupère l'utilisateur
            const user_id_who_like = await this.userService.getUserById( userJwtId);
            if (!user_id_who_like) {
                throw new Error("Utilisateur non trouvé !");
            }
            
            const newLike = this.likeRepository.create({ article_id, user_id_who_like })
            await this.likeRepository.save(newLike)
            return "like bien ajouter"
        } catch (error) {
            console.error('Erreur l\'ajout du like:', error); 
            throw new Error("Une erreur s'est produite au moment de l\'ajout du like.");
        }
    }

}
