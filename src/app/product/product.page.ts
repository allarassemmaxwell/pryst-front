import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';

import { ApiService } from 'src/app/services/api.service';
import { ModalController } from '@ionic/angular';
import { HttpClient} from '@angular/common/http';
import { ProductDetailPage } from '../product-detail/product-detail.page';

@Component({
  selector: 'app-product',
  templateUrl: './product.page.html',
  styleUrls: ['./product.page.scss'],
})
export class ProductPage implements OnInit {

    showSearch = false;
    products: any;
    public searchTerm: string = "";


    // CONSTRUCTOR
    constructor(private router: Router, public api: ApiService,
        public modalCtrl: ModalController, private http: HttpClient) {
            this.getProducts();
    }

    ngOnInit() { }


    // GET PRODUCT DATA
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


    // REFRESH PAGE
    doRefresh(event) {
        setTimeout(() => {
          this.getProducts();
          event.target.complete();
        }, 2000);
    }



    // SEARCH PRODUCT
  	searchProduct(){
        if(this.searchTerm != ''){
            let result = this.products.filter((product) => {
                return product.name.toLowerCase().indexOf(this.searchTerm.toLowerCase()) > -1
                || product.category.toLowerCase().indexOf(this.searchTerm.toLowerCase()) > -1 
                || product.brand.toLowerCase().indexOf(this.searchTerm.toLowerCase()) > -1
                || product.model.toLowerCase().indexOf(this.searchTerm.toLowerCase()) > -1;
            });
            this.products = result ;
        } else {
            this.ngOnInit();
        }
    }


    // HIDE AND SHOW SEARCH BAR
    showSearchBar(){
        if(this.showSearch == false){
          this.showSearch = true;
        }else{
          this.showSearch = false ;
        }
    }

    
    // MOVE TO PRODUCT DETAILS
    moveToProductDetail(product) {
        this.modalCtrl.create({
            component: ProductDetailPage,
            componentProps: {
                data: product
            }
        }).then(modal => modal.present());
    }




}
