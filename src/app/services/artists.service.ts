import { Injectable } from '@angular/core';
import { Artist } from '../model/artist';
import { HttpClient } from '@angular/common/http';

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
      deathdate: res.deathdate
    }));

    return artists;
  }
}
