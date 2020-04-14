import { Component, OnInit } from '@angular/core';

// import { AuthenticationService } from './../../services/authentication.service';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { AlertController } from '@ionic/angular';

import { FormBuilder, Validators } from "@angular/forms";

import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { async } from 'rxjs/internal/scheduler/async';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

    public userLoginData: any;
	
	registrationForm = this.formBuilder.group({
		password:  [
			'', [Validators.required, Validators.maxLength(100)]
		],
		username: [ 
			'', [ Validators.required, Validators.pattern('^[a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,4}$')]
		],
		// phone: [
		//   '', [ Validators.required, Validators.pattern('^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-s./0-9]*$')]
		// ],
	});




	public errorMessages = {
		password: [
		  	{ type: 'required', message: 'Password is required' },
		  	{ type: 'maxlength', message: 'Password cant be longer than 100 characters' }
		],
		username: [
		  	{ type: 'required', message: 'Email is required' },
		  	{ type: 'pattern', message: 'Please enter a valid email address' }
		],
		// phone: [
		//   	{ type: 'required', message: 'Phone number is required' },
		//   	{ type: 'pattern', message: 'Please enter a valid phone number' }
		// ]
	};

	constructor(private router: Router, private http: HttpClient, 
    private api: ApiService, public alertController: AlertController, private formBuilder: FormBuilder,
    public authenticationService: AuthenticationService) { }

  	ngOnInit() {
	}
	  

	get password() {
		return this.registrationForm.get("password");
	}
	  
	get username() {
		return this.registrationForm.get("username");
	}



	// USER LOGIN
	public submit() {
		this.api.presentLoading();
		var email 	 = this.registrationForm.value.username;
        var password = this.registrationForm.value.password;
        // this.authenticationService.login(email, password).subscribe(
        //     data => {
        //         this.api.presentAlert("YES","Logged In");
        //     },
        //     error => {
        //       console.log(error);
        //     },
        //     () => {
        //         this.api.presentLoadingDismiss();
        //       this.router.navigate(['/home']);
        //     }
        // );
        
		this.http.get(this.api.apiUrl+'/login/?username='+email+'&password='+password+'&format=json').subscribe(
			userLoginData => {
				console.log(userLoginData);
				if(userLoginData['result'] == '0'){
					this.api.presentAlert('Error', userLoginData['error']);
				  	this.api.presentLoadingDismiss();
				} else {
					// window.localStorage.setItem('userIsLogged', 'Yes');
					window.localStorage.setItem('userEmail', userLoginData['userEmail']);
                    this.authenticationService.login();
					this.api.presentLoadingDismiss();
				}
				this.userLoginData = userLoginData;
			}, error => {
				console.log(error);
			}
		);

	  
	}


	// FORGOT PASSWORD
	async presentAlertForgotPassword() {
		const alert = await this.alertController.create({
		  	header: 'Forgot Password?',
		  	message: 'Enter your email address to request a password reset.',
		  	inputs: [
				{
					name: 'userEmail',
					type: 'email',
					placeholder: 'Enter your email address'
				}
		  	],
		  	buttons: [
				{
					text: 'Cancel',
					role: 'cancel',
					cssClass: 'secondary',
					handler: () => {
						console.log('Confirm Cancel');
					}
				}, {
					text: 'Ok',
					handler: (data) => {
						console.log(data.userEmail);
						// this.authService.forgotPassword(data.userEmail);
					}
				}
		  	]
		});
		await alert.present();
	}

}
