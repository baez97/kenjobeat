import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ArtistsService } from './artists.service';
import { Artist } from '../model/artist';
import { Album } from '../model/Album';

@Injectable({
  providedIn: 'root'
})
export class AlbumsService {

  constructor(private http: HttpClient, private artistsService: ArtistsService) { }

  baseUrl = 'http://localhost:3000'

  async getAllAlbums(artists: Array<Artist>): Promise<Array<Album>> {
    const albumsResponse = await this.http.get(this.baseUrl + '/albums/all').toPromise();
    const albums: Array<Album> = (albumsResponse as Array<any>).map(res => ({
      _id: res._id,
      artistId: res.artistId,
      coverUrl: res.coverUrl,
      genre: res.genre,
      title: res.title,
      year: res.year,
      artist: res.artist
    }));

    const albumsWithArtist = this.mapArtistsIntoAlbums(artists, albums);
    return albumsWithArtist;
  }

  mapArtistsIntoAlbums(artists, albums) {
    const artistsMap = {};
    artists.forEach(artist => artistsMap[artist._id] = artist);

    albums.forEach(album => {
      album.artist = artistsMap[album.artistId];
    });

    return albums;
  }
}
