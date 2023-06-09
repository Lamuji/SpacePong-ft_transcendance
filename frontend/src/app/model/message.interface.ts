import { Meta } from "@angular/platform-browser";
import { RoomI } from "./room.interface";
import { UserI } from "./user.interface";

export interface MessageI {
	id?: number;
	text: string;
	user?: UserI;
	room: RoomI;
	gameRoom?: string;
	created_at?: Date;
	updated_at?: Date;
}

export interface MessagePaginatedI {
	items: MessageI[];
	meta: Meta;
}