import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-outlet',
  templateUrl: './outlet.page.html',
  styleUrls: ['./outlet.page.scss'],
})
export class OutletPage implements OnInit {

    public searchTerm: string = "";
    showSearch = false;
    private user;
    outlets: any = [];

    // CONSTRUCTOR
    constructor(private router: Router, private api: ApiService, private http: HttpClient) { 
        this.user = window.localStorage.getItem('userEmail');
        this.getOutlets();
    }

    ngOnInit() {

    }


    ionViewWillEnter(){
        this.getOutlets();
    }


    // REFRESH PAGE
    doRefresh(event) {
        setTimeout(() => {
          this.getOutlets();
          event.target.complete();
        }, 2000);
    }


    
    // HIDE AND SHOW SEARCH BAR
    showSearchBar(){
        if(this.showSearch == false){
          this.showSearch = true;
        }else{
          this.showSearch = false ;
        }
    }


    // GET OUTLETS REF TO USER
    getOutlets() {
        this.api.presentLoading();
        this.http.get(this.api.apiUrl+'/outlet/?userEmail='+this.user+'&format=json').subscribe(
			outlets => {
                console.log(outlets);
                this.outlets = outlets;
                this.api.presentLoadingDismiss();
	      	},
	      	err => {
                console.log(err);
                this.api.presentLoadingDismiss();
	    	}
        );
    }




    // SEARCH OUTLET
  	search(){
        if(this.searchTerm != ''){
            let result = this.outlets.filter((location) => {
                return location.name.toLowerCase().indexOf(this.searchTerm.toLowerCase()) > -1 
                || location.category.toLowerCase().indexOf(this.searchTerm.toLowerCase()) > -1;
            });
            this.outlets = result ;
            // console.log(result);
        } else {
            this.getOutlets();
        }
    }



    // CREATE NEW OULET
    async moveToCreateOutlet() {
        this.router.navigate(['home', 'outlet', 'add']);
    }


    // MOVE TO ADD GPS
    moveToAddGPS() {
        this.router.navigate(['home', 'outlet', 'map']);
    }



}


