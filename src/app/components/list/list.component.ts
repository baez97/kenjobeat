import { Component, OnInit, Input } from '@angular/core';
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

  filteredAlbums: Array<Album>;
  filteredArtists: Array<Artist>;

  filter: string;

  @Input('filter') set setFilter(filter: string) {
    this.filter = filter;
    if ( !this.albums || !this.artists )
      return;
    console.log('setting it!', filter);
    this.filteredAlbums = this.albums.filter(album => {
      return album.title.includes(filter) || album.artist.name.includes(filter);
    });

    this.filteredArtists = this.artists.filter(artist => {
      return artist.name.includes(filter);
    });
  }

  async ngOnInit() {
    this.artists = await this.artistsService.getAllArtists();
    this.albums = await this.albumsService.getAllAlbums(this.artists);
    this.filteredAlbums = JSON.parse(JSON.stringify(this.albums));
    this.filteredArtists = JSON.parse(JSON.stringify(this.artists));
    console.log(this.albums);
  }
}
