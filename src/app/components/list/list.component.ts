import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { AlbumsService } from 'src/app/services/albums.service';
import { Album } from 'src/app/model/Album';
import { Artist } from 'src/app/model/artist';
import { ArtistsService } from 'src/app/services/artists.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  constructor(private albumsService: AlbumsService, private artistsService: ArtistsService) { }
  albums: Array<Album>;
  artists: Array<Artist>;
  @Input('albums') set setAlbums(value: Array<Album>) {
    this.albums = value || [];
    this.filteredAlbums = JSON.parse(JSON.stringify(this.albums));
  }
  @Input('artists') set setArtists(value: Array<Artist>) {
    this.artists = value || [];
    this.filteredArtists = JSON.parse(JSON.stringify(this.artists));
  }

  filteredAlbums: Array<Album> = [];
  filteredArtists: Array<Artist> = [];

  filter: string;

  @Input('filter') set setFilter(filter: string) {
    this.filter = filter ? filter.toLowerCase() : '';
    if ( !this.albums || !this.artists )
      return;
    this.filteredAlbums = this.albums.filter(album => {
      return album.title.toLowerCase().includes(this.filter) || 
             album.artist.name.toLowerCase().includes(this.filter);
    });

    this.filteredArtists = this.artists.filter(artist => {
      return artist.name.toLowerCase().includes(this.filter);
    });
  }

  @Output('openModal') openModalEvent = new EventEmitter<Artist | Album>();

  ngOnInit() {
    this.retrieveAlbums();
  }
  
  retrieveAlbums() {
    // this.artists = await this.artistsService.getAllArtists();
    // this.albums = await this.albumsService.getAllAlbums(this.artists);
    this.filteredAlbums = JSON.parse(JSON.stringify(this.albums));
    this.filteredArtists = JSON.parse(JSON.stringify(this.artists));
  }

  openModal(item: Artist | Album) {
    this.openModalEvent.emit(item);
  }
}
