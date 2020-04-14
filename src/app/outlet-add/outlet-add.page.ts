import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { FormBuilder, Validators } from "@angular/forms";
import { Location } from '@angular/common';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';


@Component({
  selector: 'app-outlet-add',
  templateUrl: './outlet-add.page.html',
  styleUrls: ['./outlet-add.page.scss'],
})
export class OutletAddPage implements OnInit {
  private user;
  outletCategories: any;

  registrationForm = this.formBuilder.group({
      category: [],
      name:  [
    '', [Validators.required, Validators.maxLength(50)]
      ],
  });
  
  public errorMessages = {
  name: [
      { type: 'required', message: 'Name is required' },
      { type: 'maxlength', message: 'Name cant be longer than 50 characters' }
      ],
};

  constructor(private api: ApiService, private formBuilder: FormBuilder,
      public location: Location, private http: HttpClient) {
      this.user = window.localStorage.getItem('userEmail');
      this.getOutletCategory();
   }

  ngOnInit() {
  }

  get name() {
  return this.registrationForm.get("name");
  }


  // GET OUTLET CATEGORIES
  getOutletCategory() {
      this.http.get(this.api.apiUrl+'/outlet/category/?'+'&format=json').subscribe(
    res => {
              console.log(res);
      this.outletCategories = res;
    }, error => {
              console.log(error);
    }
  );
  }


  

  // CREATE NEW OUTLET
  public submit() {
      this.api.presentLoading();
      var name = this.registrationForm.value.name;
      var category = this.registrationForm.value.category;
      if (category == null) {
          this.api.presentLoadingDismiss();
          this.api.presentAlert("Error", "Please select a category to proceed.");
      } else {
          this.http.get(this.api.apiUrl+'/outlet/add/?userEmail='+this.user+'&name='+name+'&category='+category+'&format=json').subscribe(
              res => {
                  console.log(res);
                  if(res['result'] == '0') {
                      this.api.presentAlert("Error", res['error']);
                      this.api.presentLoadingDismiss();
                  } else {
                      this.location.back();
                      this.api.presentToastTop(res['success']);
                      this.api.presentLoadingDismiss();
                  }
              }, error => {
                  console.log(error);
                  this.api.presentLoadingDismiss();
              }
          );
      }
  }
  

}
