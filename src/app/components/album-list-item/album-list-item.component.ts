import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Album } from 'src/app/model/Album';

@Component({
  selector: 'app-album-list-item',
  templateUrl: './album-list-item.component.html',
  styleUrls: ['./album-list-item.component.scss']
})
export class AlbumListItemComponent implements OnInit {

  @Input('album') album: Album;
  @Output('pressed') pressedEvent = new EventEmitter<Album>();
  constructor() { }

  ngOnInit(): void {
  }

  pressed() {
    this.pressedEvent.emit(this.album);
  }

}
