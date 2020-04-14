import { Injectable } from '@angular/core';
import { LoadingController, ToastController, AlertController} from '@ionic/angular';




@Injectable({
  providedIn: 'root'
})
export class ApiService {

  // public apiUrl = 'http://127.0.0.1:8000/api';
	public apiUrl = 'https://cors-anywhere.herokuapp.com/https://prystins.herokuapp.com/api';
	isLoading= false;
	public emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";
	public namePattern  = "[\s]"; 
	public phonePattern = "^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-s./0-9]*$";

  	constructor(public loadingController: LoadingController,
	public toastController: ToastController, private alertCtrl: AlertController) { }


	// PRESENT LOADING
	async presentLoading() {
		this.isLoading = true;
		return await this.loadingController.create({
			message: 'Please wait...'
		}).then(a => {
		  	a.present().then(() => {
				console.log('presented');
				if (!this.isLoading) {
					a.dismiss().then(() => 
					  	console.log('abort presenting')
					);
				}
		  	});
		});
	}
	
	//   DISMISS LOADING
	async presentLoadingDismiss() {
		this.isLoading = false;
		return await this.loadingController.dismiss().then(() => 
			console.log('dismissed')
		);
	}



	// PRESENT TOAST TOP
	async presentToastTop(toastMessage: string) {
		const toast = await this.toastController.create({
		 	message: toastMessage,
		  	duration: 3000,
			position: 'top'
			// cssClass: toastColor
		});
		toast.present();
	}


	// PRESENT TOAST BOTTOM
	async presentToastBottom(toastMessage: string, toastColor: string) {
		const toast = await this.toastController.create({
		 	message: toastMessage,
		  	duration: 3000,
			position: 'bottom',
			cssClass: toastColor
		});
		toast.present();
	}


	// PRESENT ALERT
	async presentAlert(alertTitle: string, alertMsg: string) {
    	const alert = await this.alertCtrl.create({
      		header: ''+alertTitle+'',
      		message: ''+alertMsg+'',
      		buttons: ['OK']
    	});
    	await alert.present();
  	}
}
