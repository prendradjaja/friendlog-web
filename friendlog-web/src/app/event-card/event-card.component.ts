import { Component, OnInit, Input } from '@angular/core';
import { Row } from '../backend.service';

@Component({
  selector: 'app-event-card',
  templateUrl: './event-card.component.html',
  styleUrls: ['./event-card.component.scss']
})
export class EventCardComponent implements OnInit {

  @Input() row: Row;

  constructor() { }

  ngOnInit() {
  }

}
