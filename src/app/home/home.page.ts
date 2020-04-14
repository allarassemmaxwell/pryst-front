import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';



@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  userEmail: string;

  constructor(private router: Router, public authenticationService: AuthenticationService) { 
      this.userEmail = window.localStorage.getItem('userEmail');
  }

  ngOnInit() {
  }

  logout() {
      this.authenticationService.logout();
  }

  moveToAudit() {
      this.router.navigate(['home', 'audit']);
  }

  moveToOutlet() {
      this.router.navigate(['home', 'outlet']);
  }

  moveToProduct() {
      this.router.navigate(['home', 'product']);
  }

}
