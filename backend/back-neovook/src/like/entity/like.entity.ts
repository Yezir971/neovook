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

    @ManyToOne(() => User)
    @JoinColumn({ name: 'user_id_who_like' })
    user: User;

    @Column()
    user_id_who_like: string;

    @ManyToOne(() => Article, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'article_id' })
    article: Article;

    @Column()
    article_id: string;

    // @ManyToOne(() => Article, (post) => post.likes, { onDelete: 'CASCADE' })
    // article: Article;

}
