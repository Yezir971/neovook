import { Entity, Column, PrimaryGeneratedColumn, BeforeInsert, OneToMany, ManyToOne, JoinColumn } from 'typeorm';
import { Article } from 'src/article/entity/article.entity';
import { User } from 'src/users/entity/user.entity';

@Entity()
export class Like {
    @PrimaryGeneratedColumn('uuid')
    id_like: string;


    @Column({
        type:'timestamp',
        default: () => 'CURRENT_TIMESTAMP'
    })
    liked_at: Date

    @ManyToOne(() => User, user => user.id_user, { eager: true })
    @JoinColumn({ name: 'user_id_who_like' })
    user_id_who_like: User;

    @ManyToOne(() => Article, article => article.id_post, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'article_id' })
    article_id: Article;

    // @ManyToOne(() => Article, (post) => post.likes, { onDelete: 'CASCADE' })
    // article: Article;

}
