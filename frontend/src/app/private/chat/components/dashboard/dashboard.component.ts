import { AfterViewInit, Component, ElementRef, HostListener, OnInit } from '@angular/core';
import { ChatService } from '../../services/chat-service/chat.service';
import { MatSelectionListChange } from '@angular/material/list';
import { PageEvent } from '@angular/material/paginator';
import { Observable } from 'rxjs';
import { UserI } from 'src/app/model/user.interface';
import { AuthService } from 'src/app/public/services/auth-service/auth.service';
import { DashboardService } from '../../services/dashboard-service/dashboard-service';

@Component({
	selector: 'app-dashboard',
	templateUrl: './dashboard.component.html',
	styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit{

	constructor(public dashService: DashboardService, private elementRef: ElementRef, private chatService: ChatService) { }

	@HostListener('document:click', ['$event'])
	onClick(event: MouseEvent) {
		if (!this.dashService.find && this.elementRef.nativeElement.querySelector('.search-container') && this.elementRef.nativeElement.querySelector('.search-container').contains(event.target)) {
			this.dashService.find = true;
		}
		else if (this.dashService.find && this.elementRef.nativeElement.querySelector('.search-container') && !this.elementRef.nativeElement.querySelector('.findChannel').contains(event.target)) {
			this.dashService.find = false;
		}
		if (this.dashService.checkPass && this.elementRef.nativeElement.querySelector('.search-container') && !this.elementRef.nativeElement.querySelector('.checkPass').contains(event.target)) {
				this.dashService.checkPass = false;
		}
		if (!this.dashService.create && this.elementRef.nativeElement.querySelector('.create-container') && this.elementRef.nativeElement.querySelector('.create-container').contains(event.target)) {
			this.dashService.create = true;
		}
		else if (this.dashService.create && this.elementRef.nativeElement.querySelector('.create-container') && !this.elementRef.nativeElement.querySelector('.createChannel').contains(event.target)) {
			this.dashService.create = false;
		}
	}

	ngOnInit(): void {
		const storedData = localStorage.getItem('members');
		if (storedData) {
			const myData = JSON.parse(storedData);
			this.dashService.members = myData;
		}
		this.chatService.getIfCheckPass().subscribe((value) =>{ this.dashService.checkPass = true; this.chatService.roomToCheck = value});
		this.chatService.getConfirmPass().subscribe(() => this.dashService.checkPass = false);
	}

	closeModals(): void {
		this.dashService.find = false;
		this.dashService.checkPass = false;
		this.dashService.create = false;
	}

}
