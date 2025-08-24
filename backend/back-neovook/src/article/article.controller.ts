import { Body, Controller, Delete, Patch, Post, Req } from '@nestjs/common';
import { ArticleService } from './article.service';
import { Article } from './entity/article.entity';
import { Public } from 'src/common/decorators/public.decorator';
import type { articleDeleteBodyDto } from 'src/models/article.models';
import type { Request } from 'express';

@Controller('api/article')
export class ArticleController {
    constructor(private readonly articleService: ArticleService){
    }
    // @Public()
    @Post("create")
    async createArticle(@Body() article : Article){
        return await this.articleService.createArtcile(article)
    }


    // route pour supprimer un article 
    // @Public()
    @Delete('delete')
    async deleteArticle(@Req() request: Request , @Body() articleBody : articleDeleteBodyDto){
        const userJwt = request['user']

        const article = await this.articleService.getArticleById(articleBody.id_post)

        if(!article){
            throw new Error('L\'article n\' existe pas !')
        }

        if(article.id_user_who_post.id_user !== userJwt.userId ){
            throw new Error('Vous ne pouvez pas supprimer un article qui n\'est pas le votre !')
        }
        
        return await this.articleService.deleteArticle(articleBody) 
    }
    
}
