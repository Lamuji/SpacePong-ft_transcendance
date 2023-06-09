import { ChangeDetectorRef, Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DashboardService } from '../../services/dashboard-service/dashboard-service';
import { MessageI } from 'src/app/model/message.interface';
import { ChatService } from '../../services/chat-service/chat.service';
import { Observable, delay, tap } from 'rxjs';
import { RoomI } from 'src/app/model/room.interface';
import { Router } from '@angular/router';
import { Client } from 'colyseus.js';
import { room } from 'src/app/private/game/components/game.front/game.front.component';


@Component({
	selector: 'app-messages',
	templateUrl: './messages.component.html',
	styleUrls: ['./messages.component.scss']
})
export class MessagesComponent implements OnInit {

	message: string = '';
	ChannelName$: Observable<RoomI> = this.chatService.roomName$;

	messages$: Observable<MessageI[]> = this.chatService.messages$;

	isEditing = false;
	placeholderText: string = null;
	placeTmp: string;
	inputText: string = "";

	@ViewChild('messageList') messageList: ElementRef;
	@ViewChild('inputElement') inputElementRef: ElementRef;

	hostname: string = window.location.protocol + "//" + window.location.hostname + ":" + "3000/api/users/profile-image/";


	constructor(private formBuilder: FormBuilder, public dashService: DashboardService, private changeDetector: ChangeDetectorRef,
		private elementRef: ElementRef, public chatService: ChatService, private router : Router) {

		this.ChannelName$.subscribe(name =>{if(name){ this.placeholderText = name.name} else {this.placeholderText = null}});
	}

	@HostListener('document:click', ['$event'])
	onClick(event: MouseEvent) {
		if ((this.chatService.selectedRoomOwner || this.chatService.selectedRoomAdmin)&& !this.dashService.addUsers && this.elementRef.nativeElement.querySelector('.enableAddUser').contains(event.target)) {
			this.dashService.addUsers = true;
		}
		else if (this.chatService.selectedRoom !== null && this.dashService.addUsers && this.elementRef.nativeElement.querySelector('.addUser') && !this.elementRef.nativeElement.querySelector('.addUser').contains(event.target)) {
			this.dashService.addUsers = false;
		}
		if (this.dashService.changePass && this.elementRef.nativeElement.querySelector('.changePass') && !this.elementRef.nativeElement.querySelector('.changePass').contains(event.target)
		&& !this.elementRef.nativeElement.querySelector('.channelOption').contains(event.target)) {
			this.dashService.changePass = false;
		}
	}

	ngOnInit(): void {
		this.chatService.getMessages().subscribe();
		this.chatService.getAddedMessages().subscribe();
		this.ChannelName$.subscribe(name =>{ if(name){this.ajusterLargeurInput(this.inputElementRef.nativeElement, name.name)}});
		this.chatService.getSelectedRoom().subscribe();
		this.messages$.pipe(
			tap(() => {
				setTimeout(() => {
					this.scrollToBottom();
				});
			}),
			delay(500)
		)
			.subscribe();
	}

	ngAfterViewInit(): void {
		this.ajusterLargeurInput(this.inputElementRef.nativeElement, null)
	}

	addUserEnable() {
		this.dashService.addUsers = true;
	}

	onSubmit() {
		if (this.message) {
			
			this.chatService.sendMessage({ text: this.message, room: this.chatService.selectedRoom });
			this.message = '';
		}
		this.messages$.pipe(
			tap(() => {
				setTimeout(() => {
					this.scrollToBottom();
				});
			}),
			delay(500)
		)
			.subscribe();
	}

	scrollToBottom(): void {
		try {
			this.messageList.nativeElement.scrollTop = this.messageList.nativeElement.scrollHeight;
		} catch (err) { }
	}

	members() {
		this.dashService.members = !this.dashService.members;
		localStorage.setItem('members', JSON.stringify(this.dashService.members));
	}

	onFocus(): void {
		this.inputText = this.placeholderText;
		this.placeTmp = this.placeholderText;
		this.placeholderText = '';
		this.changeDetector.detectChanges();
	}

	validerPlaceholder(inputElement: HTMLInputElement): void {
		this.placeholderText = this.placeTmp;
		const tmp: string = this.inputText.trim();
		if (tmp !== '' && tmp != this.placeholderText && tmp.length < 20) {
			this.placeholderText = this.inputText;
			this.chatService.changeName(this.placeholderText, this.chatService.selectedRoom);
		}
		this.ajusterLargeurInput(inputElement, this.placeholderText);
		this.inputText = "";
		this.changeDetector.detectChanges();
	}

	validerPlaceholderEnter(inputElement: HTMLInputElement): void {
		inputElement.blur();
	}

	onInput(inputElement: HTMLInputElement): void {
		this.ajusterLargeurInput(inputElement, this.inputText);
	}

	ajusterLargeurInput(inputElement: HTMLInputElement, text: string): void {
		// Créez un élément span temporaire pour mesurer la largeur du texte
		if (text && text.length > 20)
			return
		const span = document.createElement('span');
		span.style.position = 'absolute';
		span.style.visibility = 'hidden';
		span.style.whiteSpace = 'pre';
		// span.textContent = inputElement.placeholder;
		span.textContent = text || inputElement.placeholder;

		// Copiez les propriétés de style pertinentes de l'input vers le span
		const inputStyle = getComputedStyle(inputElement);
		const propertiesToCopy = ['fontFamily', 'fontSize', 'fontWeight', 'fontStyle', 'letterSpacing'];
		for (const property of propertiesToCopy) {
			span.style[property] = inputStyle[property];
		}

		// Ajoutez le span au DOM, mesurez sa largeur et retirez-le du DOM
		document.body.appendChild(span);
		const textWidth = span.getBoundingClientRect().width;
		document.body.removeChild(span);

		// Ajoutez un peu d'espace supplémentaire pour éviter que le texte ne soit coupé
		const padding = 0;

		// Définissez la largeur de l'input en fonction de la largeur du texte mesurée
		inputElement.style.width = `${textWidth + padding}px`;
	}

	async checkRoomExists(roomId: string) 
	{
		let client = new Client("ws://" + location.hostname + ":3001");
		let rooms = await client.getAvailableRooms("my_room");
		if (rooms.length > 0)
		{
			for (let i : number = 0 ; i < rooms.length; i++)
			{
				if (rooms[i].roomId == roomId)
				{
					return true
				}
			}
			return false;
		}
		return false;
	}

	async joinGame(gameRoom: string) 
	{
		const roomExists = await this.checkRoomExists(gameRoom);
		if (roomExists)
			this.router.navigate(['private/game/invite'], { queryParams: { functionName: 'Join', room : gameRoom } });
		else
			window.alert('This link expired !');
	}

}
