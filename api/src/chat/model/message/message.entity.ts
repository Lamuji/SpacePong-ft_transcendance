import { UserEntity } from "src/user/model/user.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, JoinTable, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { RoomEntity } from "../room/room.entity";

@Entity()
export class MessageEntity {
	
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	text: string;

	@ManyToOne(() => UserEntity, user => user.messages)
	@JoinColumn()
	user: UserEntity;

	@ManyToOne(() => RoomEntity, room => room.messages)
	@JoinColumn()
	room: RoomEntity; 

	@Column({nullable: true, default: null})
	gameRoom: string;

	@CreateDateColumn()
	created_at: Date;

	@UpdateDateColumn()
	updated_at: Date;
}