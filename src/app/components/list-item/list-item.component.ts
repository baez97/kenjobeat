import { Component, OnInit, Input } from '@angular/core';

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
  
  ngOnInit(): void { }

}
