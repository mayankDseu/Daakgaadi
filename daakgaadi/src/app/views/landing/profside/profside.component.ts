import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profside',
  templateUrl: './profside.component.html',
})
export class ProfsideComponent implements OnInit {

  collapseShow = "hidden";
  constructor() {}

  ngOnInit() {}
  toggleCollapseShow(classes) {
    this.collapseShow = classes;
  }
}
