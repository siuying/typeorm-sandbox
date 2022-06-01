import { IsUrl } from "class-validator"
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm"
import { Message } from "./message"

@Entity()
export class Link {
  @PrimaryGeneratedColumn()
  id!: number

  @Column()
  @IsUrl()
  url?: string

  @ManyToOne(type => Message)
  @JoinColumn({ name: "message_id", referencedColumnName: "id" })
  message?: Message
}