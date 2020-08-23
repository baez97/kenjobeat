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
    if ( value ) {
      this.artist = value;
      this.currentIsAlbum = false;
    }
  }

  album: Album;
  @Input('album') set setAlbum(value: Album) {
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
  @Output('editArtistPressed') editArtistPressedEvent = new EventEmitter<Artist>();
  @Output('editAlbumPressed') editAlbumPressedEvent = new EventEmitter<Album>();
  @Output('editAlbum') editAlbumEvent = new EventEmitter<Album>();
  @Output('editArtist') editArtistEvent = new EventEmitter<Artist>();
  
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

  editArtistPressed(artist: Artist) {
    this.editArtistPressedEvent.emit(artist)
  }

  editAlbumPressed(album: Album) {
    this.editAlbumPressedEvent.emit(album);
  }

  editAlbum(album: Album) {
    this.editAlbumEvent.emit(album)
  }

  editArtist(artist: Artist) {
    console.log('modal');
    this.editArtistEvent.emit(artist);
  }
}
