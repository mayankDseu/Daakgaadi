import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { createPopper } from "@popperjs/core";
import {Emitter} from '..//..//..//emitters/emitter';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-landauthpage-dropdown',
  templateUrl: './landauthpage-dropdown.component.html',
})
export class LandauthpageDropdownComponent implements OnInit {
  authenticated = false;

  dropdownPopoverShow = false;
  @ViewChild("btnDropdownRef", { static: false }) btnDropdownRef: ElementRef;
  @ViewChild("popoverDropdownRef", { static: false })
  popoverDropdownRef: ElementRef;
  constructor(private http: HttpClient) {
  }
  ngOnInit(): void {
    Emitter.authEmitter.subscribe(
      (auth: boolean) => {
        this.authenticated = auth;
      }
    );
  }
  toggleDropdown(event) {
    event.preventDefault();
    if (this.dropdownPopoverShow) {
      this.dropdownPopoverShow = false;
    } else {
      this.dropdownPopoverShow = true;
      this.createPoppper();
    }
  }
  createPoppper() {
    createPopper(
      this.btnDropdownRef.nativeElement,
      this.popoverDropdownRef.nativeElement,
      {
        placement: "bottom-start",
      }
    );
  }
  logout(): void {
    this.http.post('https://logistwork.onrender.com/api/logout', {}, {withCredentials: true})
      .subscribe(() => this.authenticated = false);
  }


}
