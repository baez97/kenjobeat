import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    window.onscroll = this.onScrollFn;
  }

  onScrollFn() {
    if (  document.documentElement.scrollTop > 80) {
      document.getElementsByClassName('header-content')[0].id = 'compressed-header-content';
      document.getElementsByClassName('green-curved-header')[0].id = 'compressed-header';
    } else {
      document.getElementsByClassName('header-content')[0].id = '';
      document.getElementsByClassName('green-curved-header')[0].id = '';
    }
  }
}
