import { Component } from '@angular/core';
import { Artist } from './model/artist';
import { Album, isAlbum } from './model/Album';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'kenjobeat';
  filter: string;
  modalOpened: boolean = false;

  openedArtist: Artist;
  openedAlbum: Album;

  setFilter(value) {
    this.filter = value;
  }

  openModal(item: Artist | Album) {
    if ( isAlbum(item) ) {
      this.openedAlbum = item;
      this.openedArtist = undefined;
    } else {
      this.openedArtist = item;
      this.openedAlbum = undefined;
    }

    this.modalOpened = true;
  }

  closeModal() {
    this.modalOpened = false;
  }

}
