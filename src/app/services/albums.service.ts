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

  // baseUrl = 'http://localhost:3000'
  baseUrl = 'http://192.168.1.128:3000';

  async getAllAlbums(artists?: Array<Artist>): Promise<Array<Album>> {
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

    if ( !artists )
      return albums;

    const albumsWithArtist = this.mapArtistsIntoAlbums(artists, albums);
    return albumsWithArtist;
  }

  async getAlbumsFromArtist(id: string): Promise<Array<Album>> {
    const allAlbums = await this.getAllAlbums();
    const artistAlbums = allAlbums.filter(album => album.artistId === id);
    return artistAlbums;
  }

  async createAlbum(album: Album): Promise<Album> {
    const result = await this.http.post(this.baseUrl + '/album', album).toPromise();
    return result as Album;
  }

  async editAlbum(album: Album): Promise<Album> {
    delete album.artist;
    const result = await this.http.put(this.baseUrl + '/album/' + album._id, album).toPromise();
    return result as Album;
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
