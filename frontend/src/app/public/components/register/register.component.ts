import { Component, ElementRef, Injectable, Input, ViewChild, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgModel, Validators } from '@angular/forms';
import { CustomValidators } from '../../_helpers/custom-validators';
import { UserService } from '../../services/user-service/user.service';
import { Router } from '@angular/router';
import { catchError, map, of, tap } from 'rxjs';
import { AuthService } from '../../services/auth-service/auth.service';
import { LoginComponent } from '../login/login.component';
import { PlayerService } from 'src/app/private/user/services/player.service';
import { HttpErrorResponse, HttpEventType } from '@angular/common/http';
import { UserI } from 'src/app/model/user.interface';
import { ValidationErrors } from '@angular/forms';
import { AbstractControl } from '@angular/forms';

export interface File {
  data: any;
  progress: number;
  inProgress: boolean;
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})

export class RegisterComponent {

  isLoading: boolean = false;

  @ViewChild("fileUpload", {static: false}) fileUpload: ElementRef;

  file: File = {
    data: null,
    inProgress: false,
    progress: 0
  }

	form: FormGroup = new FormGroup ({
		email: new FormControl(null, [Validators.required, Validators.email, this.emailDomainValidator]),
		username: new FormControl(null, [Validators.required]),
		password: new FormControl(null, [Validators.required]),
		passwordConfirm: new FormControl(null, [Validators.required]),
    profilPic: new FormControl(null)
	},
		{ validators: CustomValidators.passwordsMatching }
	);

	emailDomainValidator(control: AbstractControl): ValidationErrors | null {
		const email = control.value;
		const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.(com|fr)$/;
	  
		if (emailPattern.test(email)) {
		  return null;
		} else {
		  return { emailDomain: true };
		}
	  }

  mail : string | undefined = this.userService.mail;

	constructor(private playerService: PlayerService, private userService: UserService, private router: Router, private authService: AuthService) {}

  onFileSelected(){
    this.file = {
      data: this.fileUpload.nativeElement.files[0],
      inProgress: false,
      progress: 0
    };
    (this.fileUpload.nativeElement as HTMLInputElement).nextElementSibling.textContent = this.file.data.name;
  }
  
  uploadFile(id: number) {
    const formData = new FormData();
    formData.append('file', this.file.data);
    this.file.inProgress = true;

    this.playerService.uploadProfilePic(formData, id).pipe(
      map((event) => {
        switch (event.type) {
          case HttpEventType.UploadProgress:
            this.file.progress = Math.round(event.loaded * 100 / event.total);
            break;
          case HttpEventType.Response:
            return event;
        }
      }),
      catchError((error: HttpErrorResponse) => {
        this.file.inProgress = false;
        return of('Upload failed');
      })).subscribe((event: any) => {
        if(typeof (event) === 'object') {
          this.form.patchValue({profileImage: event.body.profileImage});
        }
      })
  }

  register() {
    this.isLoading = true;
		if (this.form.valid) {
      if (!this.file.data && this.form.get('profilPic').value === null) {
        const defaultImageURL = '../../../assets/images/astronaut.png';
      fetch(defaultImageURL)
        .then(response => response.arrayBuffer())
        .then(buffer => {
          this.file = {
          data : new File([buffer], 'astronaut.png', { type: 'image/png' }),
          inProgress: false,
          progress: 0,
        }});
      }
			this.userService.create({
				email: this.email.value,
				password: this.password.value,
				username: this.username.value,
			}).subscribe((createdUser : UserI) => {
			if (createdUser !== null) {
				this.authService.login({
					email: this.email.value,
					password: this.password.value
				})
			  if (this.file.data) {
				this.uploadFile(createdUser.id);
			  }
			}
        });
			}
    this.isLoading = false;
	}

	get	email(): FormControl {
		return this.form.get('email') as FormControl;
	}

	get username(): FormControl {
		return this.form.get('username') as FormControl;
	}

	get password(): FormControl {
		return this.form.get('password') as FormControl;
	}

	get passwordConfirm(): FormControl {
		return this.form.get('passwordConfirm') as FormControl;
	}
}
