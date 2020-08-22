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

  @Input('album') album;
  @Input('mode') mode: 'create' | 'edit' | 'read';
  @Output('toggle') toggleEvent = new EventEmitter<Album>();
  @Output('createAlbum') createAlbumEvent = new EventEmitter<Album>();
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
      }
      else {
        this.artistIsValid = false;
      } 
      this.album = { ... albumValues, artistId: artist };
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

  createAlbum() {
    this.createAlbumEvent.emit(this.album);
  }
}
