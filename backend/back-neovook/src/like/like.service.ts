import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
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
                throw new HttpException("L'article n'existe pas !", HttpStatus.NOT_FOUND);
            }

            // Récupère l'utilisateur
            const user = await this.userService.getUserById(userJwtId);
            if (!user) {
                throw new HttpException("Utilisateur non trouvé !", HttpStatus.NOT_FOUND);

            }

            // Vérifie si le like existe déjà
            const existingLike = await this.likeRepository.findOne({
                where: {
                    user_id_who_like: userJwtId,
                    article_id: likeBody.id_post
                }
            });

            if (existingLike) {
                throw new HttpException("Vous avez déjà liké cet article !", HttpStatus.NOT_FOUND);
            }

            const newLike = this.likeRepository.create({
                user_id_who_like: userJwtId,
                article_id: likeBody.id_post
            });

            await this.likeRepository.save(newLike);
            return {
                statusCode: HttpStatus.OK,
                message: 'like bien ajouté',
            };

        } catch (error) {
            throw new HttpException("Une erreur s'est produite au moment de l'ajout du like.", HttpStatus.BAD_REQUEST);

        }
    }
    async unLikeService(unLikeBody : unLikeBodyDto, userJwtId : string){
        try {
            // Vérifie que l'article existe
            const article = await this.articleService.getArticle({ id_post: unLikeBody.id_post });
            if (!article) {
                throw new HttpException("L'article n'existe pas !", HttpStatus.NOT_FOUND);

            }

            // Récupère l'utilisateur
            const user = await this.userService.getUserById(userJwtId);
            if (!user) {
                throw new HttpException("Utilisateur non trouvé !", HttpStatus.NOT_FOUND);
            }

            // Vérifie si le like existe déjà
            const existingLike = await this.likeRepository.findOne({
                where: {
                    user_id_who_like: userJwtId,
                    article_id: unLikeBody.id_post
                }
            });

            if(!existingLike){
                throw new HttpException("Vous n'avez pas like l'article !", HttpStatus.NOT_FOUND);

            }

            await this.likeRepository.delete({user_id_who_like: userJwtId,article_id: unLikeBody.id_post})
            return {
                statusCode: HttpStatus.OK,
                message: 'like supprimer',
            };
        } catch (error) {
            throw new HttpException("Une erreur s'est produite au moment du retrait du like.", HttpStatus.BAD_REQUEST);
            
        }
    }

    async getAllLikeByPost(allLikePost: AllLikePost){
        // Vérifie que l'article existe
        const article = await this.articleService.getArticle({ id_post: allLikePost.id_post });
        if (!article) {
            throw new HttpException("L'article n'existe pas !", HttpStatus.NOT_FOUND);
        }
        const allLike = await this.likeRepository.find({
            where: {
                article_id: allLikePost.id_post
            },
            relations: ['user'],
        });
        return {
            message : allLike,
            status : HttpStatus.OK
        }
    }

}
