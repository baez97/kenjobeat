import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Artist } from 'src/app/model/artist';
import { Album } from 'src/app/model/Album';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {
  @Input('open') open: boolean;
  @Input('mode') mode: 'create' | 'edit' | 'read';
  currentIsAlbum: boolean;

  artist: Artist;
  @Input('artist') set setArtist(value: Artist) {
    console.log('You are setting the artist!', value);
    if ( value ) {
      this.artist = value;
      this.currentIsAlbum = false;
    }
  }

  album: Album;
  @Input('album') set setAlbum(value: Album) {
    console.log('You are setting the album!', value);
    if ( value ) {
      this.album = value;
      this.currentIsAlbum = true;
    }
  }

  @Output('close') close = new EventEmitter();
  @Output('toggleToArtist') toggleToArtistEvent = new EventEmitter<Album>();
  @Output('toggleToAlbum') toggleToAlbumEvent = new EventEmitter<Album>();
  @Output('createArtist') createArtistEvent = new EventEmitter<Artist>();
  @Output('createAlbum') createAlbumEvent = new EventEmitter<Album>();
  constructor() { }

  ngOnInit(): void {
  }

  closeModal() {
    this.close.emit();
  }

  toggleToAlbum(album) {
    this.toggleToAlbumEvent.emit(album);
  }

  toggleToArtist(album) {
    this.toggleToArtistEvent.emit(album);
  }

  createArtist(artist: Artist) {
    this.createArtistEvent.emit(artist)
  }

  createAlbum(album: Album) {
    this.createAlbumEvent.emit(album)
  }
}
