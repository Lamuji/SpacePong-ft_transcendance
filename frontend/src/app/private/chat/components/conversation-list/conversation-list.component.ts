import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../../services/dashboard-service/dashboard-service';
import { RoomI } from 'src/app/model/room.interface';
import { ChatService } from '../../services/chat-service/chat.service';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/public/services/auth-service/auth.service';
import { UserI } from 'src/app/model/user.interface';

@Component({
  selector: 'app-conversation-list',
  templateUrl: './conversation-list.component.html',
  styleUrls: ['./conversation-list.component.scss']
})
export class ConversationListComponent implements OnInit {
	isClicked = false;

	rooms$: Observable<any[]>= this.chatService.getMyRooms();
	rooms: any[] = [];
	currentUser: UserI = this.authService.getLoggedInUser();

	hostname: string = window.location.protocol + "//" + window.location.hostname + ":" + "3000/api/users/profile-image/";

  constructor(public dashService: DashboardService, public chatService: ChatService, private authService: AuthService){ }

  ngOnInit() {
	  this.chatService.getConnected().subscribe(users => {
		for (let i = 0; i < this.rooms.length; i++) {
			this.rooms[i].isConnected = false;
		}
		for (const room of this.rooms) {
			if (room.privateMessage) {
				for (const user of users) {
					for (const roomUser of room.users) {
						if (roomUser.id !== this.currentUser.id && roomUser.id === user.id) {
							room.isConnected = true;
						}
					}
				}
			}
		}
	})
	this.chatService.emitPaginateRooms();
	this.rooms$.subscribe(val =>{ this.rooms = val;

		this.chatService.connected();
	});
	const storedData = localStorage.getItem('room');
		  if (storedData) {
			  const myData = JSON.parse(storedData);
			  this.chatService.joinRoom(myData);
		  }
}

	ngOnDestroy() {
		this.chatService.leaveRoom();
	}

  message(room: RoomI) {
		this.chatService.joinRoom(room.id);
	}

	// Add missing methods for new template functionality
	trackByRoomId(index: number, room: any): any {
		return room?.id || index;
	}

	selectConversation(room: any): void {
		if (room) {
			this.message(room); // Use the existing logic
		}
	}

	formatTime(timeInput: any): string {
		if (!timeInput) {
			return '';
		}
		
		// Handle both direct date/string and message object with created_at
		const dateValue = timeInput.created_at || timeInput;
		const date = new Date(dateValue);
		
		if (isNaN(date.getTime())) {
			return '';
		}
		
		const now = new Date();
		const diffMs = now.getTime() - date.getTime();
		const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
		
		if (diffDays === 0) {
			// Today - show time
			return date.toLocaleTimeString('fr-FR', { 
				hour: '2-digit', 
				minute: '2-digit' 
			});
		} else if (diffDays === 1) {
			// Yesterday
			return 'Hier';
		} else if (diffDays < 7) {
			// This week - show day name
			return date.toLocaleDateString('fr-FR', { weekday: 'short' });
		} else {
			// Older - show date
			return date.toLocaleDateString('fr-FR', { 
				day: '2-digit', 
				month: '2-digit' 
			});
		}
	}

	getConversationName(room: any): string {
		if (!room) return '';
		
		if (room.privateMessage && room.users?.length > 0) {
			// Private message - show other user's name
			const otherUser = room.users.find((user: any) => user.id !== this.currentUser.id);
			return otherUser?.username || 'Utilisateur inconnu';
		}
		
		// Group room - show room name
		return room.name || 'Conversation';
	}

	getLastMessagePreview(room: any): string {
		// Use simple preview for now since we don't have lastMessage in the interface
		if (room.privateMessage) {
			return 'Message privé';
		}
		return 'Canal de discussion';
	}

	hasUnreadMessages(room: any): boolean {
		// Simple implementation - can be enhanced later
		return false;
	}

	getUnreadCount(room: any): number {
		// Simple implementation - can be enhanced later
		return 0;
	}

	isRoomActive(room: any): boolean {
		return this.chatService.selectedRoomId === room?.id;
	}

	getUserAvatar(room: any): string {
		if (room?.privateMessage && room.users?.length > 0) {
			const otherUser = room.users.find((user: any) => user.id !== this.currentUser.id);
			if (otherUser?.profilPic) {
				return this.hostname + otherUser.profilPic;
			}
		}
		return this.hostname + 'astronaut.png';
	}

	isUserOnline(room: any): boolean {
		if (!room?.privateMessage || !room.users) return false;
		
		const otherUser = room.users.find((user: any) => user.id !== this.currentUser.id);
		return room.isConnected || false;
	}

	openActionMenu(event: Event, room: any): void {
		event.stopPropagation();
		// Implement action menu logic here
		console.log('Open action menu for room:', room);
	}

	getOtherUser(room: any): any {
		if (!room?.privateMessage || !room.users?.length) {
			return null;
		}
		
		return room.users.find((user: any) => user.id !== this.currentUser.id);
	}

}
