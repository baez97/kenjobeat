import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Album } from 'src/app/model/Album';
import { Artist } from 'src/app/model/artist';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ArtistsService } from 'src/app/services/artists.service';

@Component({
  selector: 'app-album-modal',
  templateUrl: './album-modal.component.html',
  styleUrls: ['./album-modal.component.scss']
})
export class AlbumModalComponent implements OnInit {

  album: Album;
  @Input('album') set setAlbum(value) {
    this.album = value;

    if (!this.albumForm || !this.album) return;

    this.artistIsValid = true;
    this.albumForm.setValue({
      title: this.album.title,
      artistId: this.album.artist?.name || '',
      coverUrl: this.album.coverUrl,
      year: this.album.year || '',
      genre: this.album.genre
    });
  };
  @Input('mode') mode: 'create' | 'edit' | 'read';
  @Output('toggle') toggleEvent = new EventEmitter<Album>();
  @Output('createAlbum') createAlbumEvent = new EventEmitter<Album>();
  @Output('editAlbum') editAlbumEvent = new EventEmitter<Album>();
  @Output('editPressed') editPressedEvent = new EventEmitter<Album>();
  
  albumForm: FormGroup;

  artistList: Array<Artist>;
  filteredArtists: Array<Artist>;
  artistIsValid: boolean;

  constructor(private formBuilder: FormBuilder, private artistsService: ArtistsService) { }

  ngOnInit(): void {
    const currentYear = new Date().getFullYear();
    this.albumForm = this.formBuilder.group({
      title: ['', [Validators.required]],
      artistId: ['', [Validators.required]],
      coverUrl: ['', [Validators.required]],
      year: ['', [Validators.required, Validators.min(1000), Validators.max(currentYear)]],
      genre: ['', [Validators.required]]
    });

    this.albumForm.valueChanges.subscribe(albumValues => {
      const artist = this.getArtistIdByName(albumValues.artistId);
      if ( artist ) {
        this.artistIsValid = true;
        this.album = { ...this.album, ... albumValues, artistId: artist };
      }
      else {
        this.artistIsValid = false;
      } 
    });

    this.artistsService.getAllArtists().then(artists => this.artistList = artists);
  }

  toggle() {
    this.toggleEvent.emit(this.album);
  }

  applyFilter(filter) {
    if ( filter === '' )
      return this.filteredArtists = [];
    this.filteredArtists = this.artistList.filter(artist => 
      artist.name.toLocaleLowerCase().includes(filter.toLocaleLowerCase()));
  }

  getArtistIdByName(name: string): string {
    name = name ? name.toLowerCase() : '';
    const artist = this.artistList.find(artist => artist.name.toLowerCase() === name);
    return artist ? artist._id : undefined;
  }

  submit() {
    if ( this.mode === 'create' )
      this.createAlbum();
    else if ( this.mode === 'edit' )
      this.editAlbum();
  }

  createAlbum() {
    this.createAlbumEvent.emit(this.album);
  }

  editPressed() {
    this.editPressedEvent.emit(this.album);
  }

  editAlbum() {
    this.editAlbumEvent.emit(this.album);
  }
}
