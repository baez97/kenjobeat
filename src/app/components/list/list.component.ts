import { Component, OnInit } from '@angular/core';
import { AlbumsService } from 'src/app/services/albums.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  constructor(private albumsService: AlbumsService) { }

  albums;

  ngOnInit(): void {
    this.albumsService.getAllAlbums().subscribe(result => {
      this.albums = result;
    })
  }

}
