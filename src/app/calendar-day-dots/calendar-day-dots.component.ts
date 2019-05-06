import { Component, OnInit, Input } from "@angular/core";

@Component({
  selector: "calendar-day-dots",
  templateUrl: "./calendar-day-dots.component.html",
  styleUrls: ["./calendar-day-dots.component.scss"]
})
export class CalendarDayDotsComponent implements OnInit {
  @Input() n: number;
  nThings: any[];

  constructor() {}

  ngOnInit() {
    this.nThings = new Array(this.n);
  }
}
