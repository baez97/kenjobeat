import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-add-dropdown',
  templateUrl: './add-dropdown.component.html',
  styleUrls: ['./add-dropdown.component.scss']
})
export class AddDropdownComponent implements OnInit {

  constructor() { }

  @Input('opened') opened;
  @Output() close = new EventEmitter();
  @Output('createAlbum') createAlbumEvent = new EventEmitter();
  @Output('createArtist') createArtistEvent = new EventEmitter();
  ngOnInit(): void {
  }

  closeDropdown() { this.close.emit(); }

  createAlbum() {
    this.createAlbumEvent.emit();
  }

  createArtist() {
    this.createArtistEvent.emit();
  }
}
