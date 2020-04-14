import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { NavParams, ModalController } from '@ionic/angular';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.page.html',
  styleUrls: ['./product-detail.page.scss'],
})
export class ProductDetailPage implements OnInit {

  data: any;
    constructor(public location: Location, private navParams: NavParams, private modalController: ModalController) { }

    ngOnInit() { 
        this.data = this.navParams.get('data');
        console.log(this.data);
    }

    // CLOSE MODEL
    close() {
        this.modalController.dismiss();
    }

}
