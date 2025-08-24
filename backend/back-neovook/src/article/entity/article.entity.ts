import { Like } from 'src/like/entity/like.entity';
import { User } from 'src/users/entity/user.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToOne, JoinColumn } from 'typeorm';

@Entity()
export class Article {
  @PrimaryGeneratedColumn('uuid')
  id_post: string;

  @Column({
    type: 'varchar',
    nullable: false,
  })
  title: string;

  @Column({
    type: 'text',
    nullable: false,
  })
  body: string;


  @Column({
    type: 'date',
    nullable: false
  })
  create_at: Date

  @Column({
    type:'date',
    nullable: true
  })
  edit_at: Date

  @Column({
    type: 'varchar',
    nullable: false
  })


  @ManyToOne(() => User, (user) => user.id_user, { eager: true })
  @JoinColumn({ name: 'id_user_who_post' }) 
  id_user_who_post: User; 


  // @OneToMany(() => Like, (like) => like.id_like, { eager: true })
  // likes: Array<Like>;

}
