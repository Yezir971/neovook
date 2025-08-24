import { Body, Controller, Delete, Get, Put, Req } from '@nestjs/common';
import { LikeService } from './like.service';
import type { LikeAddBodyDto } from 'src/models/like.models';

@Controller('api/like')
export class LikeController {
    constructor(private readonly likeService : LikeService){}

    @Get('all')
    async getAllLikeByPost(){

    }

    @Put('add')
    async addLike(@Body() likeBody : LikeAddBodyDto, @Req() request: Request ){
        const userJwtId = request['user'].userId
        
        return await this.likeService.addLike(likeBody, userJwtId)
    }

    @Delete('remove')
    async removeLike(){

    }

}
