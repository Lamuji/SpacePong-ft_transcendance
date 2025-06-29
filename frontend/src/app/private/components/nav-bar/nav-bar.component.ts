import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/public/services/auth-service/auth.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit 
{
	currentUrl: string;
	isSmallScreen: boolean;
	isMobileMenuOpen: boolean = false;

	// Navigation items for mobile menu
	navItems = [
		{ route: '/private/game/spacepong', label: 'Play', icon: '../../../../assets/images/rocket.png' },
		{ route: '/private/user/profile', label: 'Profile', icon: '../../../../assets/images/utilisateur-astronaute_1.png' },
		{ route: '/private/chat/dashboard', label: 'Chat', icon: '../../../../assets/images/transmitter_1.png' },
		{ route: '/private/game/live', label: 'Live', icon: '../../../../assets/images/satellite_1.png' },
		{ route: '/private/user/friends', label: 'Friends', icon: '../../../../assets/images/src.png' },
		{ route: '/private/user/settings', label: 'Settings', icon: '../../../../assets/images/technical-support_1.png' }
	];

	constructor(private router: Router, private auth : AuthService) 
	{
	}
	
	

	ngOnInit() 
	{
		this.currentUrl = this.router.url;
		
		// Listen to route changes
		this.router.events.subscribe(() => {
			this.currentUrl = this.router.url;
		});
	}

	deconnection() 
	{
		localStorage.removeItem('access_token');
		location.reload();
	}
	
	toggleMobileMenu(): void {
		this.isMobileMenuOpen = !this.isMobileMenuOpen;
	}

	closeMobileMenu(): void {
		this.isMobileMenuOpen = false;
	}
}