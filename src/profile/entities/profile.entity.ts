import { User } from "src/entities/User.entity";
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({name:"profiles"})
export class Profile {
    @PrimaryGeneratedColumn()
    id:number

    @Column()
    firstName:string;

    @Column()
    lastName:string
    
    @Column({default:"18"})
    age:number

    @Column()
    dob:string

}
