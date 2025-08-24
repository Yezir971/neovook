import { Module } from '@nestjs/common';
import { LikeController } from './like.controller';
import { LikeService } from './like.service';
import { ArticleService } from 'src/article/article.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Like } from './entity/like.entity';
import { Article } from 'src/article/entity/article.entity';
import { User } from 'src/users/entity/user.entity';
import { UsersService } from 'src/users/users.service';

@Module({
  imports: [TypeOrmModule.forFeature([Like, User, Article])], 
  controllers: [LikeController],
  providers: [LikeService, ArticleService, UsersService]
})
export class LikeModule {}
