import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like } from './entity/like.entity';
import { Repository } from 'typeorm';
import { AllLikePost, LikeAddBodyDto, unLikeBodyDto } from 'src/models/like.models';
import { ArticleService } from 'src/article/article.service';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class LikeService {
    constructor(@InjectRepository(Like) private readonly likeRepository : Repository<Like>, private readonly articleService : ArticleService,private readonly userService: UsersService ){

    }

    async addLike(likeBody : LikeAddBodyDto, userJwtId : string){
        try {
            // Vérifie que l'article existe
            const article = await this.articleService.getArticle({ id_post: likeBody.id_post });
            if (!article) {
                throw new Error("L'article n'existe pas !");
            }

            // Récupère l'utilisateur
            const user = await this.userService.getUserById(userJwtId);
            if (!user) {
                throw new Error("Utilisateur non trouvé !");
            }

            // Vérifie si le like existe déjà
            const existingLike = await this.likeRepository.findOne({
                where: {
                    user_id_who_like: userJwtId,
                    article_id: likeBody.id_post
                }
            });

            if (existingLike) {
                throw new Error("Vous avez déjà liké cet article !");
            }

            const newLike = this.likeRepository.create({
                user_id_who_like: userJwtId,
                article_id: likeBody.id_post
            });

            await this.likeRepository.save(newLike);
            return "Like bien ajouté";
        } catch (error) {
            console.error('Erreur l\'ajout du like:', error); 
            throw new Error("Une erreur s'est produite au moment de l'ajout du like.");
        }
    }
    async unLikeService(unLikeBody : unLikeBodyDto, userJwtId : string){
        try {
            // Vérifie que l'article existe
            const article = await this.articleService.getArticle({ id_post: unLikeBody.id_post });
            if (!article) {
                throw new Error("L'article n'existe pas !");
            }

            // Récupère l'utilisateur
            const user = await this.userService.getUserById(userJwtId);
            if (!user) {
                throw new Error("Utilisateur non trouvé !");
            }

            // Vérifie si le like existe déjà
            const existingLike = await this.likeRepository.findOne({
                where: {
                    user_id_who_like: userJwtId,
                    article_id: unLikeBody.id_post
                }
            });

            if(!existingLike){
                throw new Error("Vous n'avez pas encore article !");
            }

            await this.likeRepository.delete({user_id_who_like: userJwtId,article_id: unLikeBody.id_post})
            return 'like supprimer'
        } catch (error) {
            console.error('Erreur de retrait de like:', error); 
            throw new Error("Une erreur s'est produite au moment du retrait du like.");
        }
    }

    async getAllLikeByPost(allLikePost: AllLikePost){
        // Vérifie que l'article existe
        const article = await this.articleService.getArticle({ id_post: allLikePost.id_post });
        if (!article) {
            throw new Error("L'article n'existe pas !");
        }
        const allLike = await this.likeRepository.find({
            where: {
                article_id: allLikePost.id_post
            },
            relations: ['user'],
        });
        console.log(allLike[0].user_id_who_like);
        

        return allLike

    }

}
