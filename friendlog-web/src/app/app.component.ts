import { Component, OnInit } from '@angular/core';
import { BackendService, Row } from './backend.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'friendlog-web';
  rows: Row[] = [];

  constructor (private backendService: BackendService) {}

  ngOnInit() {
    this.backendService.get().then(rows => {
      const tail = rows.slice(rows.length - 5);
      this.rows = tail;
      console.log(tail);
    })
  }
}
