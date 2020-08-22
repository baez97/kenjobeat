import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AlbumsService } from 'src/app/services/albums.service';
import { Artist } from 'src/app/model/artist';
import { Album } from 'src/app/model/Album';

@Component({
  selector: 'app-artist-modal',
  templateUrl: './artist-modal.component.html',
  styleUrls: ['./artist-modal.component.scss']
})
export class ArtistModalComponent implements OnInit {
  @Input('artist') artist: Artist;
  @Output('toggle') toggleEvent = new EventEmitter<Album>();
  albums: Array<Album>
  constructor(private albumsService: AlbumsService) { }

  async ngOnInit() {
    this.albums = await this.albumsService.getAllAlbums([]);
  }

  toggle(album: Album) {
    this.toggleEvent.emit(album);
  }
}
