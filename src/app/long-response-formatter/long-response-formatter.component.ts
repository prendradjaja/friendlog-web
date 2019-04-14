import { Component, OnInit, Input } from "@angular/core";
import { text } from "@angular/core/src/render3";
import { LineToLineMappedSource } from "webpack-sources";

@Component({
  selector: "app-long-response-formatter",
  templateUrl: "./long-response-formatter.component.html",
  styleUrls: ["./long-response-formatter.component.scss"]
})
export class LongResponseFormatterComponent implements OnInit {
  @Input() text;

  lines;
  maxLines = 3;
  showMore = false;

  constructor() {}

  ngOnInit() {
    this.lines = this.text.split("\n\n");
  }

  toggleShowMore() {
    this.showMore = !this.showMore;
  }
}
