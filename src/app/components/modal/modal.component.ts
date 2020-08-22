import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Artist } from 'src/app/model/artist';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {

  @Input('open') open;

  currentIsAlbum: boolean;

  artist: Artist;
  @Input('artist') set setArtist(value) {
    if ( value ) {
      this.currentIsAlbum = false;
      this.artist = value;
      console.log(this.currentIsAlbum);
    }
  }

  album: Artist;
  @Input('album') set setAlbum(value) {
    if ( value ) {
      this.currentIsAlbum = true;
      this.album = value;
      console.log(this.currentIsAlbum);
    }
  }

  @Output('close') close = new EventEmitter();
  
  constructor() { }

  ngOnInit(): void {
  }

  closeModal() {
    this.close.emit();
  }

  toggle() {
    this.currentIsAlbum = !this.currentIsAlbum;
  }

  toggleToAlbum(album) {
    this.album = album;
    this.toggle();
  }
}
