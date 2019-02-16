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
  newEntryUrl = 'https://docs.google.com/forms/d/e/1FAIpQLSfrEoQFScVs_hleOQ9TU0-vev62_UK8mwYgEYOLC1sPwUK4dw/viewform';

  constructor (private backendService: BackendService) {}

  ngOnInit() {
    this.backendService.get().then(allRows => {
      this.rows = allRows.slice(allRows.length - 5);
    });
  }
}
