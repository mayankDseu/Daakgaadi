import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-landauth-navbar',
  templateUrl: './landauth-navbar.component.html',
})
export class LandauthNavbarComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  navbarOpen = false;

  
  setNavbarOpen() {
    this.navbarOpen = !this.navbarOpen;
  }

}
