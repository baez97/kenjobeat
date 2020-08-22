import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Artist } from '../../model/artist';
import { Album } from '../../model/Album';

@Component({
  selector: 'app-list-item',
  templateUrl: './list-item.component.html',
  styleUrls: ['./list-item.component.scss']
})
export class ListItemComponent implements OnInit {

  constructor() { }

  @Input('title') title: string;
  @Input('subtitle') subtitle: string;
  @Input('photoUrl') photoUrl: string;
  @Output('openModal') openModalEvent = new EventEmitter<Artist | Album>();

  ngOnInit(): void { }

  openModal(item: Artist | Album) {
    this.openModalEvent.emit(item);
  }
}
