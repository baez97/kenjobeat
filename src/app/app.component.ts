import { Component, OnInit } from '@angular/core';
import { Artist } from './model/artist';
import { Album, isAlbum } from './model/Album';
import { ArtistsService } from './services/artists.service';
import { AlbumsService } from './services/albums.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'kenjobeat';
  albums: Array<Album>;
  artists: Array<Artist>;
  filter: string;
  modalOpened: boolean = false;
  mode: 'read' | 'edit' | 'create';
  openedArtist: Artist;
  openedAlbum: Album;

  constructor(private artistsService: ArtistsService,
    private albumsService: AlbumsService) { }

  ngOnInit() {
    this.retrieveData();
  }

  async retrieveData() {
    this.artists = await this.artistsService.getAllArtists();
    this.albums = await this.albumsService.getAllAlbums(this.artists);
  }

  setFilter(value) {
    this.filter = value;
  }

  openModal(item: Artist | Album) {
    if ( isAlbum(item) ) {
      this.openedAlbum = item;
      this.openedArtist = undefined;
    } else {
      this.openedArtist = item;
      this.openedAlbum = undefined;
    }
    this.mode = 'read';
    this.modalOpened = true;
  }

  openCreationModal(itemType: 'album' | 'artist') {
    this.mode = 'create';
    if ( itemType === 'album' )
      this.openedAlbum = { genre: '', year: 0, coverUrl: '', title: '', _id: '' };
    else
      this.openedArtist = { _id: '', birthdate: '', deathdate: '', name: '', photoUrl: '' };
    this.modalOpened = true;
  }

  closeModal() {
    this.openedAlbum = undefined;
    this.openedArtist = undefined;
    this.modalOpened = false;
  }

  toggleToAlbum(item: Album) {
    this.openModal(item);
  }

  async toggleToArtist(item: Album) {
    const artist = await this.artistsService.findArtistById(item.artistId);
    this.openModal(artist);
  }

  createAlbumPressed() {
    this.openCreationModal('album')
  }

  createArtistPressed() {
    this.openCreationModal('artist')
  }

  async createAlbum(album) {
    await this.albumsService.createAlbum(album);
    this.retrieveData();
    this.closeModal();
  }

  createArtist(artist) {
    console.log(artist);
    this.closeModal();
  }
}
