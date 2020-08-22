import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Output('filter') filter = new EventEmitter<string>();
  constructor() { }

  ngOnInit(): void {
    document.documentElement.scrollTop = 0;
    // window.onscroll = this.onScrollFn;
  }

  dropdownOpened = false;
  
  onScrollFn() {
    const scrollTop = document.documentElement.scrollTop;
    if ( scrollTop < 250 ) {
      (<HTMLElement>document.getElementsByClassName('green-curved-header')[0])
        .style.height = 350 - scrollTop + 'px';
    }

    if ( scrollTop < 200 )
      document.getElementsByClassName('header-content')[0].classList.remove('shrink');
    else
      document.getElementsByClassName('header-content')[0].classList.add('shrink');

  }

  toggleDropdown() {
    this.dropdownOpened = !this.dropdownOpened;
  }

  setFilter(filter) {
    this.filter.emit(filter);
  }
}
