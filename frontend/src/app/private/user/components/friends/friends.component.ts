import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PlayerService } from '../../services/player.service';
import { Friend, UserI } from 'src/app/model/user.interface';
import { Observable, catchError } from 'rxjs';
import { AuthService } from 'src/app/public/services/auth-service/auth.service';
import { ChatService } from 'src/app/private/chat/services/chat-service/chat.service';
import { HttpHeaders } from '@angular/common/http';
import { Client } from 'colyseus.js';

@Component({
  selector: 'app-friends',
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.scss']
})
export class FriendsComponent implements OnInit {

  users: UserI[] = [];
  user$ : Observable<UserI>;
  filteredUsers: UserI[] = [];
  searchTerm: string = '';
  message: string;
  showContextMenu: boolean;
  contextMenuTop: number;
  contextMenuLeft: number;
  isMyFriend: boolean = true;
  selectedUser: UserI;
  user : UserI = this.authService.getLoggedInUser();
  friends: Friend[] = [];
  isBlocked: boolean = null;
  data: any;

  hostname: string = window.location.protocol + "//" + window.location.hostname + ":" + "3000/api/users/profile-image/";

  constructor(private cdr: ChangeDetectorRef, private route : Router, private playerService: PlayerService, private authService: AuthService, private chatService: ChatService) { }

  ngOnInit(): void {
    setTimeout(()=> {
    this.chatService.getInGame().subscribe (players => {
      if (this.filteredUsers) {
        for (const user of this.filteredUsers) {
          if (user.id === players[0] || user.id == players[1]) {
            user.inGame = true;
          }
        }
        for (const user of this.friends) {
          if (user.id === players[0] || user.id == players[1]) {
            user.inGame = true;
          }
        }
      }
    })

    this.chatService.getEndGame().subscribe (players => {
      if (this.filteredUsers) {
        for (const user of this.filteredUsers) {
          if (user.id === players[0] || user.id == players[1]) {
            user.inGame = false;
          }
        }
        for (const user of this.friends) {
          if (user.id === players[0] || user.id == players[1]) {
            user.inGame = false;
          }
        }
      }
    })

	  this.chatService.getConnected().subscribe(val => {
		  if (this.filteredUsers) {
			  for (let i = 0; i < this.filteredUsers.length; i++) {
				  this.filteredUsers[i].isConnected = false;
				}
				for (const user of this.filteredUsers) {
					for (const valUser of val) {
						if (valUser.id === user.id) {
							user.isConnected = true;
						}
					}
				}
			}
			if (this.friends) {
				for (let i = 0; i < this.friends.length; i++) {
					this.friends[i].isConnected = false;
				}
				for (const user of this.friends) {
					for (const valUser of val) {
						if (valUser.id === user.id) {
							user.isConnected = true;
						}
					}
				}
			}
		})
		this.chatService.getIfBlocked().subscribe(toto => this.isBlocked = toto);
		this.user$ = this.playerService.getUser();
		this.user$.subscribe((user: UserI) => {
			this.friends = user.friends;
		});
		this.playerService.getUserList().subscribe(users => {
			this.filteredUsers = users; // affichera les utilisateurs selon l'input
			this.users = users; // tout les users.
			this.users = this.users.filter(users => users.id !== this.user.id);
			this.filteredUsers = this.filteredUsers.filter(users => users.id !== this.user.id);
			this.chatService.connected();
			this.printAllRoomWithPlayer();
      //this.setMessage();
		});
    },100);
	}

	sendMessage(user: UserI) {
		this.chatService.joinAndRpivateMessage(user);
	}

	searchUsers() {
    if (this.searchTerm.trim() !== '') {
      this.filteredUsers = this.users.filter((user: UserI) => {
        return user.username.toLowerCase().startsWith(this.searchTerm.toLowerCase());
      });
    } else
      this.filteredUsers = this.users;
  }

  onContextMenu(event: MouseEvent, user: UserI){
    this.checkIfFriend(user);
	  this.chatService.checkIfBlocked(user);
    event.preventDefault();
    this.showContextMenu = true;
    this.contextMenuTop = event.clientY;
    this.contextMenuLeft = event.clientX;
    this.selectedUser = user; // le profil sur lequel on a fait clic droit.
  }

  closeContextMenu(){
    this.showContextMenu = false;
  }

  removeFriend(id: number, friend: UserI) {
    this.playerService.removeFriend(id, friend)
      .subscribe(response => {
        this.user$.subscribe((user: UserI) => {
          const friendIndex = this.friends.findIndex(f => f.id === friend.id);
          this.friends.splice(friendIndex, 1);
          //this.setMessage()
        });
		this.chatService.connected();
      });
      this.showContextMenu = false;
      if (this.friends.length === 0)
        this.message = "Liste d'amis vide !";
    }

    addFriend(userId: number, selectedUser: UserI){
      this.playerService.addFriend(userId, selectedUser).subscribe({
        next: (response: UserI) => {
          this.user$.subscribe((user: UserI) => {
            this.friends = user.friends;
            this.chatService.connected();
          });
          this.showContextMenu = false;
          console.log('Ami ajouté avec succès !');
        },
        error: (error) => {
          console.error('Erreur lors de l\'ajout d\'ami:', error);
          this.showContextMenu = false;
          // Ici on pourrait ajouter une notification d'erreur
        }
      });
    }

    selectUser(user: UserI) {
      this.selectedUser = user;
  }

  goToProfileOf(user: UserI) {
    this.playerService.goToProfileOf(user);
  }

  // private setMessage() {
  //   if (this.friends.length === 0) {
  //     this.message = "Liste d'amis vide !";
  //   } else {
  //     this.message = "";
  //   }
  // }

  block(user: UserI) {
	this.chatService.blockUser(user, null);
	this.showContextMenu = false;
  }

  unblock(user: UserI) {
	this.chatService.unBlockUser(user, null);
	this.showContextMenu = false;
  }

  getImageUrl(user: UserI): string {
    const userToken = localStorage.getItem('token'); // récupère le token depuis le local storage
    const headers = new HttpHeaders({
      Authorization: `Bearer ${userToken}` // ajoute le token dans l'en-tête de la requête
    });
    return `http://localhost:3000/api/users/profile-image/${user.profilPic}`;
  }

  checkIfFriend(user: UserI) {
    this.isMyFriend = false; // remise à false à chaque fois qu'on appelle la fonction
    for (const friend of this.friends) {
      if (friend.id === user.id) { // si l'ami a le même id que l'utilisateur
        this.isMyFriend = true; // utilisateur trouvé dans le tableau
        break;
      }
    }
  }

  async printAllRoomWithPlayer()
  {

	  let myClient = new Client("ws://" + location.hostname + ":3001");
	  const rooms = await myClient.getAvailableRooms("my_room");
	  if(rooms.length > 0)
	  {
		  for (let i : number = 0 ; i < rooms.length; i++)
		  {
			  const metadata = rooms[i].metadata;
				for (let i = 0; i < this.filteredUsers.length; i++) {
				if (this.filteredUsers[i].id === metadata.player_left || this.filteredUsers[i].id == metadata.player_right) {
					this.filteredUsers[i].inGame = true;
				}
				else
					this.filteredUsers[i].inGame = false;
			}
			for (let i = 0; i < this.friends.length; i++) {
				if (this.friends[i].id === metadata.player_left || this.friends[i].id == metadata.player_right) {
					this.friends[i].inGame = true;
				}
				else
					this.friends[i].inGame = false;
			}
		}
	}
  }

}
