import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OutletAddPageRoutingModule } from './outlet-add-routing.module';

import { OutletAddPage } from './outlet-add.page';

import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    OutletAddPageRoutingModule
  ],
  declarations: [OutletAddPage]
})
export class OutletAddPageModule {}
