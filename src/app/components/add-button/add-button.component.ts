import { Component, OnInit, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'app-add-button',
  templateUrl: './add-button.component.html',
  styleUrls: ['./add-button.component.scss']
})
export class AddButtonComponent implements OnInit {

  constructor() { }
  @Output('pressed') pressed = new EventEmitter();

  ngOnInit(): void {
  }

  toggleDropdown() { this.pressed.emit(); }
}
