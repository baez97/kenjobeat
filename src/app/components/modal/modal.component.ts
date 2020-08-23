import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Artist } from 'src/app/model/artist';
import { Album } from 'src/app/model/Album';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent {
  /**
   * Boolean variable that stands if the modal should be opened or not
   */
  @Input('open') open: boolean;

  /**
   * Depending on the mode (create, edit or read), the modal will display 
   * an empty form, an already filled form or just information, respectively.
   */
  @Input('mode') mode: 'create' | 'edit' | 'read';

  /**
   * Stands wether the displayed page of the modal should be the album
   * page or the artist page.
   */
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

  /**
   * Event that tells the parent that the user has pressed outside of the
   * modal, so that it should be closed (parent should set the 'open' input
   * to false)
   */
  @Output('close') close = new EventEmitter();

  // Toggle events
  @Output('toggleToArtist') toggleToArtistEvent = new EventEmitter<Album>();
  @Output('toggleToAlbum') toggleToAlbumEvent = new EventEmitter<Album>();

  // Interaction events
  /** Event triggered when the edit button is pressed in the artist page */
  @Output('editArtistPressed') editArtistPressedEvent = new EventEmitter<Artist>();
  /** Event triggered when the edit button is pressed in the album page */
  @Output('editAlbumPressed') editAlbumPressedEvent = new EventEmitter<Album>();
  /** Event triggered when the delete button is pressed in the album page */
  @Output('deleteAlbumPressed') deleteAlbumPressedEvent = new EventEmitter<Album>();
  /** Event triggered when the delete button is pressed in the artist page */
  @Output('deleteArtistPressed') deleteArtistPressedEvent = new EventEmitter<Artist>();

  // Submit events
  /** Event triggered when the creation form has been submitted in the artist page */
  @Output('createArtist') createArtistEvent = new EventEmitter<Artist>();
  /** Event triggered when the creation form has been submitted in the album page */
  @Output('createAlbum') createAlbumEvent = new EventEmitter<Album>();
  /** Event triggered when the edition form has been submitted in the artist page */
  @Output('editArtist') editArtistEvent = new EventEmitter<Artist>();
  /** Event triggered when the edition form has been submitted in the album page */
  @Output('editAlbum') editAlbumEvent = new EventEmitter<Album>();

  constructor() { }

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
    this.editArtistEvent.emit(artist);
  }

  deleteAlbumPressed(album: Album) {
    this.deleteAlbumPressedEvent.emit(album);
  }

  deleteArtistPressed(artist: Artist) {
    this.deleteArtistPressedEvent.emit(artist);
  }
}
