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
  @Input('album') set setAlbum(value: Album) {
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
  
  /**
   * Depending on the mode (create, edit or read), the modal will display 
   * an empty form, an already filled form or just information, respectively.
   */
  @Input('mode') mode: 'create' | 'edit' | 'read';

  @Output('toggle') toggleEvent = new EventEmitter<Album>();

  // Interaction events
  /** Event triggered when the edit button is pressed */
  @Output('editPressed') editPressedEvent = new EventEmitter<Album>();
  /** Event triggered when the delete button is pressed */
  @Output('deletePressed') deletePressedEvent = new EventEmitter<Album>();

  // Submit events
  /** Event triggered when the creation form has been submitted */
  @Output('createAlbum') createAlbumEvent = new EventEmitter<Album>();
  /** Event triggered when the edition form has been submitted */
  @Output('editAlbum') editAlbumEvent = new EventEmitter<Album>();

  albumForm: FormGroup;

  // Artist autocompletion variables
  /** List of all possible values for the artist field */
  artistList: Array<Artist>;
  /** List of the artists that will appear as autocomplete options */
  filteredArtists: Array<Artist>;
  /** Stands wether the current value of the artist field corresponds to an artist */
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

  /**
   * Emits the toggle event
   */
  toggle() {
    this.toggleEvent.emit(this.album);
  }

  /**
   * Updates the filteredArtist variable with the artists in the artistList 
   * whose name contains the given filter. It does not take into 
   * account capital letters.
   * @param filter The string filter to be applied
   */
  applyFilter(filter: string) {
    if ( filter === '' )
      return this.filteredArtists = [];
    this.filteredArtists = this.artistList.filter(artist => 
      artist.name.toLocaleLowerCase().includes(filter.toLocaleLowerCase()));
  }

  /**
   * Looks for the artist with the given name in the artistList and 
   * returns its '_id'
   * @param name The name of the artist
   */
  getArtistIdByName(name: string): string {
    name = name ? name.toLowerCase() : '';
    const artist = this.artistList.find(artist => artist.name.toLowerCase() === name);
    return artist ? artist._id : undefined;
  }

  /**
   * Calls to the creation or edition method depending on the value of the
   * mode variable.
   */
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

  deletePressed() {
    this.deletePressedEvent.emit(this.album);
  }
}
