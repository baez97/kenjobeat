import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-snack',
  templateUrl: './snack.component.html',
  styleUrls: ['./snack.component.scss']
})
export class SnackComponent implements OnInit {

  @Input('message') message: string;
  @Input('opened') opened: boolean;
  @Input('error') error: boolean;
  @Input('yesNo') yesNo: boolean;
  @Output('close') closeEvent = new EventEmitter();
  @Output('accept') acceptEvent = new EventEmitter();
  constructor() { }

  ngOnInit(): void {
  }

  closePressed() {
    this.closeEvent.emit();
  }

  acceptPressed() {
    this.acceptEvent.emit();
  }
}
