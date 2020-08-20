import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-add-dropdown',
  templateUrl: './add-dropdown.component.html',
  styleUrls: ['./add-dropdown.component.scss']
})
export class AddDropdownComponent implements OnInit {

  constructor() { }

  @Input('opened') opened;
  @Output() close = new EventEmitter();
  ngOnInit(): void {
  }

  closeDropdown() { this.close.emit(); }

}
