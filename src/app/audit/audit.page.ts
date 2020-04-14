import { Component, OnInit, ɵConsole } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { Location } from '@angular/common';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';



@Component({
  selector: 'app-audit',
  templateUrl: './audit.page.html',
  styleUrls: ['./audit.page.scss'],
})
export class AuditPage implements OnInit {

    showSearch = false;
	showProducts = false;

	outletName: any ;
	productName: any ;
	price: number ;
	measure: number ;
	addBtn = true ;
	data = [] ;
	showList = false ;
	searchTerm ; 
	allOutlets ;
	allProducts ;
	showNone = false ;

	private user;
	outlets: any;
	products: any;

	constructor(private location: Location, public api: ApiService,
		private http: HttpClient) { 
		this.user = window.localStorage.getItem('userEmail');
  	}



  	ngOnInit() {
		this.getOutlets();
		this.getProducts();
	}
	  
	// GET OUTLETS REF TO USER
    getOutlets() {
		this.http.get(this.api.apiUrl+'/outlet/?userEmail='+this.user+'&format=json').subscribe(
			res => {
                console.log(res);
                this.outlets = res;
                this.api.presentLoadingDismiss();
	      	},
	      	err => {
                  console.log(err);
                  this.api.presentLoadingDismiss();
	    	}
        );

	}
	
	// GET PRODUCTS 
    getProducts() {
		this.http.get(this.api.apiUrl+'/product/?'+'&format=json').subscribe(
			rest => {
                console.log(rest);
                this.products = rest;
                this.api.presentLoadingDismiss();
	      	},
	      	err => {
                  console.log(err);
                  this.api.presentLoadingDismiss();
	    	}
        );
    }



  	show(){
	    if(this.showSearch == false){
	    	this.showSearch = true;
	    	this.showProducts = false ;
	    }else{
	      	this.showSearch = false ;
	    }
  	}	



  	showProduct() {
  		if(this.showProducts == false){
	    	this.showProducts = true;
	    	this.showSearch = false;
	    }else{
	      	this.showProducts = false ;
	    }
  	}


  	// SELECT OUTLET
  	selectOutlet(outlet){
    	this.outletName = outlet ;
    	this.addBtn = false ;
    	this.showSearch = false ;
  	}


  	// SELECT PRODUCT
  	selectProduct(product){
    	this.productName = product ;
    	this.addBtn = false ;
    	this.showProducts = false ;
  	}


  	// ADD PRODUCT
  	addProduct(){
	    if(this.price!= null && this.measure != null && this.productName != null && this.outletName != null){
		    let insert = {
		      	"outletName":this.outletName,
		      	"productName":this.productName,
		      	"price":this.price,
		      	"measure":this.measure
		    }
		    this.data.push(insert);
		    this.addBtn = true ;
		    this.measure  = null;
		    this.outletName = '';
		    this.productName = '';
		    this.price = null;
		    this.showNone = false;
	  	}else{
			this.api.presentAlert("Error", "All the fields are required", );
			console.log("error in validation");
	  	}
  	}


  	// DELETE ONE
  	delete(prod){
    	this.data.splice(prod,1);
  	}



  	// SEARCH OUTLET
  	searchOutlet(){
	  	if(this.searchTerm != ''){
	    	let result = this.outlets.filter(outlet => {
				return outlet.name.toLowerCase().indexOf(this.searchTerm.toLowerCase()) > -1 
				|| outlet.category.toLowerCase().indexOf(this.searchTerm.toLowerCase()) > -1 ;
	  		})
			this.outlets = result ;
	  	}else {
			this.ngOnInit();
	  	}
	}



	// SEARCH PRODUCT
	searchProduct(){
		console.log('Maxwell 1');
		if(this.searchTerm != ''){
		  let result = this.products.filter(product => {
			  return product.name.toLowerCase().indexOf(this.searchTerm.toLowerCase()) > -1 
			  || product.category.toLowerCase().indexOf(this.searchTerm.toLowerCase()) > -1 
			  || product.brand.toLowerCase().indexOf(this.searchTerm.toLowerCase()) > -1
			  || product.model.toLowerCase().indexOf(this.searchTerm.toLowerCase()) > -1;
			})
		  this.products = result ;
		}else {
			this.ngOnInit();
		}
  }


	// DELETE ALL OUTLET
	deleteAll() {
  		this.data.length = 0;
	}



	// UPLOAD DATA
	uploadData() {
		this.api.presentLoading();
		this.data.forEach(element => {
			this.http.get(this.api.apiUrl+'/audit/?outlet='+element.outletName+'&product='+element.productName+'&price='+element.price+'&measure='+element.measure+'&auditor='+this.user+'&format=json').subscribe(
				rest => {
					console.log(rest);
					this.products = rest;
					if(rest['result'] == '0') {
                        this.api.presentAlert("Error", rest['error']);
                        this.api.presentLoadingDismiss();
                    }
				},
				err => {
					console.log(err);
					this.api.presentLoadingDismiss();
				}
			);
		});
		this.data.length = 0;
		this.location.back();
		this.api.presentLoadingDismiss();
		this.api.presentToastTop("Data submitted successfully");
	}


}
