import { Component, Injectable, Input } from '@angular/core';
import { EmailValidator, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth-service/auth.service';
import { Router } from '@angular/router';
import { tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { UserService } from '../../services/user-service/user.service';
import { ValidationErrors } from '@angular/forms';
import { AbstractControl } from '@angular/forms';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.scss'],
	animations: [
	  trigger('testAnimation', [
		state('true', style({
		  opacity: 1,
		  'margin-top': 0
		})),
		state('false', style({
		  opacity: 0,
		  'margin-top': '-60px'
		})),
		transition('false => true', animate('300ms ease-in')),
		transition('true => false', animate('300ms ease-out'))
	  ])]
  })
  export class LoginComponent {
  
	  form: FormGroup = new FormGroup({
		  email: new FormControl(null, [Validators.required, Validators.email, this.emailDomainValidator]),
		  password: new FormControl(null, [Validators.required])
	  });

	  emailDomainValidator(control: AbstractControl): ValidationErrors | null {
		const email = control.value;
		const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.(com|fr)$/;
	  
		if (emailPattern.test(email)) {
		  return null;
		} else {
		  return { emailDomain: true };
		}
	  }

	  mail: string;
	  showPasswordField: boolean = false;
	  isLoading: boolean = false; // Add loading state
  
	  constructor(private authService: AuthService, private router: Router, private http: HttpClient, private user: UserService) {}

	  ngOnInit() {
		  // add event listener to reset password field and hide it when email changes
		  this.form.get('email').valueChanges.subscribe(() => {
			  this.form.get('password').reset();
			  this.showPasswordField = false;
		  });
	  }

	  login() {
		  if (this.form.valid)
		  this.authService.login({
			  email: this.email.value,
			  password: this.password.value
		  });
	  }
  
	  get email(): FormControl {
		  return this.form.get('email') as FormControl;
	  }
  
	  get password(): FormControl {
		  return this.form.get('password') as FormControl;
	  }
  
	  checkEmail() {
		  if (this.form.get('email').valid) {
			  this.user.mail = this.form.get('email').value;
			  this.http.get(`api/users/check-email?mail=${this.user.mail}`)
			  .subscribe(res => {
				  if (res) {
					  // email exists, show password field
					  this.showPasswordField = true;
				  } else {
					  // email does not exist, redirect to registration page
					  this.router.navigate(['public/register']);
				  }
			  }
			  );
		  }else {
			  // email is not valid, reset password field and hide it
			  this.form.get('password').reset();
			  this.showPasswordField = false;
		  }
	  }
  }