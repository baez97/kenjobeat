import { Injectable } from '@angular/core';
import { Artist } from '../model/artist';
import { HttpClient } from '@angular/common/http';
import { AlbumsService } from './albums.service';

@Injectable({
  providedIn: 'root'
})
export class ArtistsService {

  baseUrl = 'http://localhost:3000'

  constructor(private httpClient: HttpClient) { }

  async getAllArtists(): Promise<Array<Artist>> { 
    const result = await this.httpClient.get(this.baseUrl + '/artists/all').toPromise();
    const artists: Array<Artist> = (result as Array<any>).map(res => ({
      _id: res._id,
      name: res.name,
      photoUrl: res.photoUrl,
      birthdate: res.birthdate,
      deathDate: res.deathDate
    }));

    return artists;
  }

  async findArtistById(id: string): Promise<Artist> {
    const result = await this.httpClient.get(this.baseUrl + '/artist/' + id).toPromise();
    return result as Artist;
  }

  async createArtist(artist: Artist): Promise<Artist> {
    const result = await this.httpClient.post(this.baseUrl + '/artist', artist).toPromise();
    return result as Artist;
  }

  async editArtist(artist: Artist): Promise<Artist> {
    const result = await this.httpClient.put(this.baseUrl + '/artist/' + artist._id, artist).toPromise();
    return result as Artist;
  }

  async deleteArtist(artist: Artist): Promise<Artist> {
    const result = await this.httpClient.delete(this.baseUrl + '/artist/' + artist._id).toPromise();
    return result as Artist;
  }
}
