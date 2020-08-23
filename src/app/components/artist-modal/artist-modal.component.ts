import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AlbumsService } from 'src/app/services/albums.service';
import { Artist } from 'src/app/model/artist';
import { Album } from 'src/app/model/Album';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ArtistsService } from 'src/app/services/artists.service';

@Component({
  selector: 'app-artist-modal',
  templateUrl: './artist-modal.component.html',
  styleUrls: ['./artist-modal.component.scss']
})
export class ArtistModalComponent implements OnInit {
  artist: Artist;
  @Input('artist') set setArtist(value: Artist) {
    this.artist = value;
    
    this.albumsService.getAlbumsFromArtist(this.artist._id)
      .then(result => this.albums = result);

    if ( this.artistForm )
      this.artistForm.setValue({
        name: this.artist.name,
        photoUrl: this.artist.photoUrl,
        birthdate: this.getDateString(this.artist.birthdate),
        deathDate: this.getDateString(this.artist.deathDate)
      });
  }

  @Input('mode') mode: 'create' | 'edit' | 'read';
  @Output('toggle') toggleEvent = new EventEmitter<Album>();
  @Output('createArtist') createArtistEvent = new EventEmitter<Artist>();
  @Output('editArtist') editArtistEvent = new EventEmitter<Artist>();
  @Output('editPressed') editArtistPressedEvent = new EventEmitter<Artist>();

  artistForm: FormGroup;
  albums: Array<Album>;

  constructor(private formBuilder: FormBuilder,
    private albumsService: AlbumsService) { }

  ngOnInit() {
    this.artistForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      photoUrl: ['', [Validators.required]],
      birthdate: ['', [Validators.required]],
      deathDate: ''
    });

    if ( this.artist ) {
      this.artistForm.setValue({
        name: this.artist.name,
        photoUrl: this.artist.photoUrl,
        birthdate: this.getDateString(this.artist.birthdate),
        deathDate: this.getDateString(this.artist.deathDate)
      });
    }

    this.artistForm.valueChanges.subscribe(artistValues => {
      this.artist = { ...this.artist, ...artistValues };
    });
  }

  getDateString(rawDate: string) {
    if ( !rawDate ) return '';

    let date = new Date(rawDate);

    let dayNum = date.getDate();
    let monthNum = date.getMonth() + 1;
    let year = date.getFullYear();
    
    let day = dayNum < 10 ? `0${dayNum}` : `${dayNum}`;
    let month = monthNum < 10 ? `0${monthNum}` : `${monthNum}`;
    
    return `${year}-${month}-${day}`;
  }

  toggle(album: Album) {
    this.toggleEvent.emit(album);
  }

  submit() {
    if ( this.mode === 'create' )
      this.createArtist();
    else  if ( this.mode === 'edit' )
      this.editArtist();
  }

  createArtist() {
    this.createArtistEvent.emit(this.artist);
  }

  editArtist() {
    console.log('artist-modal');
    this.editArtistEvent.emit(this.artist);
  }

  editPressed() {
    this.editArtistPressedEvent.emit(this.artist);
  }
}
