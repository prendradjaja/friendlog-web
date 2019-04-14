import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { Row } from "../backend.service";

@Component({
  selector: "app-event-card",
  templateUrl: "./event-card.component.html",
  styleUrls: ["./event-card.component.scss"]
})
export class EventCardComponent implements OnInit {
  @Input() row: Row;

  @Output() onClick: EventEmitter<string> = new EventEmitter<string>();

  when: string;

  constructor() {}

  ngOnInit() {
    this.when = formatDate(this.row.when || this.row.createdAt);
  }

  handleClick(who: string) {
    this.onClick.emit(who);
  }
}

// todo use moment
function formatDate(_d: string) {
  const d = new Date(_d);
  const t = d.getTime();
  const now = new Date();
  const endOfToday = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate(),
    23,
    59,
    59,
    99
  ).getTime();
  const DAY = 1000 * 60 * 60 * 24;
  const WEEK = DAY * 7;
  if (t > endOfToday) {
    return (
      "(Future) " + dayOfWeek(d) + " " + (d.getMonth() + 1) + "/" + d.getDate()
    );
  } else if (endOfToday - t < DAY) {
    return "Today";
  } else if (endOfToday - t < DAY * 2) {
    return "Yesterday";
  } else if (endOfToday - t < WEEK) {
    return dayOfWeek(d) + " " + (d.getMonth() + 1) + "/" + d.getDate();
  } else {
    return (
      d.getMonth() +
      1 +
      "/" +
      d.getDate() +
      "/" +
      d.getFullYear() +
      " (" +
      dayOfWeek(d) +
      ")"
    );
  }
}

function dayOfWeek(d: Date) {
  return [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ][d.getDay()];
}
