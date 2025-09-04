import { Body, Controller, Delete, Get, Put, Req } from '@nestjs/common';
import { LikeService } from './like.service';
import type { AllLikePost, LikeAddBodyDto, unLikeBodyDto } from 'src/models/like.models';

@Controller('api/like')
export class LikeController {
    constructor(private readonly likeService : LikeService){}

    @Get('all')
    async getAllLikeByPost(@Body() allLikePost: AllLikePost){
        return this.likeService.getAllLikeByPost(allLikePost)


    }

    @Put('add')
    async addLike(@Body() likeBody : LikeAddBodyDto, @Req() request: Request ){
        const userJwtId = request['user'].userId
        return await this.likeService.addLike(likeBody, userJwtId)
    }

    @Delete('remove')
    async removeLike(@Body() unLikeBody : unLikeBodyDto, @Req() request : Request){
        const userJwtId = request['user'].userId
        return await this.likeService.unLikeService(unLikeBody, userJwtId)

    }

}
