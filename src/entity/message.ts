import { IsNotEmpty, IsString, ValidateNested } from "class-validator"
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToMany } from "typeorm"
import { Link } from "./link"
import { User } from "./user"
import { Type } from 'class-transformer'

@Entity()
export class Message {
  @PrimaryGeneratedColumn()
  id!: number

  @ManyToOne(type => User)
  @JoinColumn({ name: "sender_id", referencedColumnName: "id" })
  sender?: User

  @Column()
  @IsNotEmpty()
  @IsString()
  text?: string

  @ValidateNested({ each: true })
  @OneToMany(type => Link, link => link.message, { cascade: true })
  @Type(() => Link)
  links?: Link[]
}