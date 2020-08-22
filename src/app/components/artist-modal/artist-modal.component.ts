import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AlbumsService } from 'src/app/services/albums.service';
import { Artist } from 'src/app/model/artist';
import { Album } from 'src/app/model/Album';

@Component({
  selector: 'app-artist-modal',
  templateUrl: './artist-modal.component.html',
  styleUrls: ['./artist-modal.component.scss']
})
export class ArtistModalComponent {
  artist: Artist;
  @Input('artist') set setArtist(value: Artist) {
    this.artist = value;
    this.albumsService.getAlbumsFromArtist(this.artist._id)
      .then(result => this.albums = result);
  }
  @Output('toggle') toggleEvent = new EventEmitter<Album>();
  albums: Array<Album>
  constructor(private albumsService: AlbumsService) { }

  toggle(album: Album) {
    this.toggleEvent.emit(album);
  }
}
