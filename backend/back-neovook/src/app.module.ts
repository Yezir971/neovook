import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/entity/user.entity';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ArticleModule } from './article/article.module';
import { Article } from './article/entity/article.entity';
import { ConfigModule } from '@nestjs/config';
import { LikeModule } from './like/like.module';
import { Like } from './like/entity/like.entity';


@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'neovook',
      entities: [User, Article, Like],
      synchronize: true,
    }),
    UsersModule,
    AuthModule,
    ArticleModule,
    LikeModule,
  ],
})
export class AppModule {}
