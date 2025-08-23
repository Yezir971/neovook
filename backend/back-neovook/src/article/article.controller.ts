import { Body, Controller, Post } from '@nestjs/common';
import { ArticleService } from './article.service';
import { Article } from './entity/article.entity';

@Controller('api/article')
export class ArticleController {
    constructor(private readonly articleService: ArticleService){
    }
    @Post("create")
    async createArticle(@Body() article : Article){
        return await this.articleService.createArtcile(article)

    }
    
}
