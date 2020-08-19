import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AlbumsService {

  constructor(private http: HttpClient) { }

  baseUrl = 'http://localhost:3000'

  getAllAlbums() {
    return this.http.get(this.baseUrl + '/albums/all');
  }
}
