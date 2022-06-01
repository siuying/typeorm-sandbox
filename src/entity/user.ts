import { IsString, MinLength } from "class-validator"
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm"
import { Message } from "./message"

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id!: number

  @Column()
  @IsString()
  @MinLength(5)
  name?: string

  @OneToMany(type => Message, message => message.sender)
  messages?: Message[]
}