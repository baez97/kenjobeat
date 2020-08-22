import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Album } from 'src/app/model/Album';

@Component({
  selector: 'app-album-list',
  templateUrl: './album-list.component.html',
  styleUrls: ['./album-list.component.scss']
})
export class AlbumListComponent implements OnInit {

  @Input('albums') albums: Array<Album>;
  @Output('itemPressed') itemPressedEvent = new EventEmitter<Album>();
  constructor() { }

  ngOnInit(): void {
  }

  itemPressed(album: Album) {
    this.itemPressedEvent.emit(album);
  }
}
