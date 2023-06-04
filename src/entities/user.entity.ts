import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from 'typeorm';
import {} from 'class-validator';
import { Profile } from 'src/profile/entities/profile.entity';
import { profile } from 'console';
@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ name: 'user_name', type: 'varchar', nullable: false, unique: true })
  username: string;

  @Column()
  password: string;

  @Column({ default: true })
  isActive: boolean;

  @Column({ type: 'datetime', default: () => 'NOW()' })
  createdAt: Date;

  @Column({ name: 'auth_strategy', nullable: true })
  authStrategy: string;

  @OneToOne(()=>Profile,{cascade:true})
  @JoinColumn()
  profile:Profile
}
