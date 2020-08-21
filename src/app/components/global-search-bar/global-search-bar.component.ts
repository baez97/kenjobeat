import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-global-search-bar',
  templateUrl: './global-search-bar.component.html',
  styleUrls: ['./global-search-bar.component.scss']
})
export class GlobalSearchBarComponent implements OnInit {

  @Output('filter') filter = new EventEmitter<any>();
  constructor() { }

  ngOnInit(): void {
  }

  setFilter(event) {
    this.filter.emit(event);
  }
}
