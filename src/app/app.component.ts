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

  snackOpened: boolean = false;
  snackMessage: string = '';
  snackError: boolean = false;

  confirmationOpened: boolean = false;
  confirmationMessage: string = '';
  itemToDelete: Album | Artist;

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
      this.openedArtist = { _id: '', birthdate: '', deathDate: '', name: '', photoUrl: '' };
    this.modalOpened = true;
  }

  closeModal() {
    this.openedAlbum = undefined;
    this.openedArtist = undefined;
    this.modalOpened = false;
  }

  async toggleToAlbum(item: Album) {
    this.openModal(item);
  }

  async toggleToArtist(item: Album) {
    const artist = await this.artistsService.findArtistById(item.artistId);
    this.openModal(artist);
  }

  createAlbumPressed() {
    this.openCreationModal('album')
  }

  editAlbumPressed(album: Album) {
    this.openedAlbum = this.albums.find(al => al._id === album._id);
    this.mode = 'edit';
  }

  createArtistPressed() {
    this.openCreationModal('artist')
  }

  editArtistPressed(artist: Artist) {
    this.openedArtist = artist;
    this.mode = 'edit';
  }

  deleteAlbumPressed(album: Album) {
    this.confirmationOpened = true;
    this.itemToDelete = album;
    this.confirmationMessage = '¿Eliminar el álbum?';
  }

  deleteArtistPressed(artist: Artist) {
    this.confirmationOpened = true;
    this.itemToDelete = artist;
    this.confirmationMessage = '¿Eliminar el artista?';
  }

  hideConfirmation() {
    this.confirmationOpened = false;
  }

  deleteConfirmed() {
    if ( isAlbum(this.itemToDelete) )
      this.deleteAlbum(this.itemToDelete);
    else
      this.deleteArtist(this.itemToDelete);
  }

  async createAlbum(album) {
    try {
      await this.albumsService.createAlbum(album);
      this.retrieveData();
      this.closeModal();
      this.showSnack('Álbum creado correctamente', false);
    } catch(e) {
      this.showSnack('Error al crear el álbum', true);
    }
  }

  async createArtist(artist) {
    try {
      await this.artistsService.createArtist(artist);
      this.retrieveData();
      this.closeModal();
      this.showSnack('Artista creado correctamente', false);
    } catch(_) {
      this.showSnack('Error al crear el artista', true);
    }
  }

  async editAlbum(album: Album) {
    try {
      await this.albumsService.editAlbum(album);
      this.retrieveData();
      this.closeModal();
      this.showSnack('Álbum editado correctamente', false);
    } catch(_) {
      this.showSnack('Error al editar el álbum', true);
    }
  }

  async editArtist(artist: Artist) {
    try {
      await this.artistsService.editArtist(artist);
      this.retrieveData();
      this.closeModal();
      this.showSnack('Artista editado correctamente', false);
    } catch(_) {
      this.showSnack('Error al editar el artista', true);
    }
  }

  async deleteArtist(artist: Artist) { 
    this.hideConfirmation();
    try {
      await this.albumsService.deleteAlbumsFromArtist(artist._id);
      await this.artistsService.deleteArtist(artist);
      this.retrieveData();
      this.closeModal();
      this.showSnack('Artista eliminado correctamente', false);
    } catch(_) {
      this.showSnack('Error al eliminar el artista', true);
    } 
  }
  async deleteAlbum(album: Album) { 
    this.hideConfirmation();
    try {
      await this.albumsService.deleteAlbum(album);
      this.retrieveData();
      this.closeModal();
      this.showSnack('Álbum eliminado correctamente', false);
    } catch(_) {
      this.showSnack('Error al eliminar el álbum', true);
    }
  }

  showSnack(message: string, error: boolean) {
    this.snackMessage = message;
    this.snackError = error;
    this.snackOpened = true;
  }

  hideSnack() {
    this.snackOpened = false;
  }

}
