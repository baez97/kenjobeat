import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-album-modal',
  templateUrl: './album-modal.component.html',
  styleUrls: ['./album-modal.component.scss']
})
export class AlbumModalComponent implements OnInit {

  @Input('album') album;
  constructor() { }

  ngOnInit(): void {
  }

}
