import { Component, OnInit, HostListener } from "@angular/core";
import { BackendService, Row } from "./backend.service";
import { SecretsService } from "./secrets.service";
import * as moment from "moment";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent implements OnInit {
  rows: Row[] = [];

  showFilters = false;
  friendGroups: string[][];
  allFriendGroups: string[][];
  mergeGroups = false;

  newEntryUrl: string;
  sheetUrl: string;

  exampleRowFull: Row;

  activeFilter: string;

  // Only fetched once. Copy, don't mutate.
  private allRows: Row[];

  constructor(
    private backendService: BackendService,
    private secretsService: SecretsService
  ) {}

  ngOnInit() {
    this.backendService.getFriendGroups().then(x => {
      this.allFriendGroups = x;
      this.updateFriendGroups();
    });
    this.backendService.get().then(
      allRows => this.onRowsReceived(allRows),
      err => {
        // const key = window.prompt('Set key (leave blank for no action)');
        // if (key) {
        //   localStorage.setItem('friendlog/google-api-key', key);
        //   location.reload();
        // }
      }
    );

    const formId = this.secretsService.getFormId();
    this.newEntryUrl = `https://docs.google.com/forms/d/e/${formId}/viewform`;

    this.exampleRowFull = new Row();
    this.exampleRowFull.who = "Jane Doe";
    this.exampleRowFull.when = "asdf";
    this.exampleRowFull.what = "Coffee";
    this.exampleRowFull.notes = "Some notes";

    const sheetId = this.secretsService.getSheetId();
    this.sheetUrl = `https://docs.google.com/spreadsheets/d/${sheetId}/edit`;
  }

  private updateFriendGroups() {
    const x = this.allFriendGroups.slice();
    if (this.mergeGroups) {
      // The silly logic behind the naming is... no-underscore is the flag, and with-underscore is the method
      this.friendGroups = this._mergeGroups(x);
    } else {
      this.friendGroups = x;
    }
  }

  /*
   * Returns a new array. Does not mutate original.
   */
  private _mergeGroups(groups: string[][]) {
    let friends = [];
    for (let g of groups) {
      friends = friends.concat(g);
    }
    friends.sort();
    return [friends];
  }

  private onRowsReceived(allRows: Row[]) {
    this.allRows = allRows;
    this.reset();
  }

  public filterByWho(who: string) {
    this.activeFilter = who;
    this.rows = this.rows.filter(
      x => x.who === who || (x.whoMultiple && x.whoMultiple.includes(who))
    );
  }

  public filterByPhone() {
    this.activeFilter = "Phone";
    this.rows = this.rows.filter(x => {
      const text = `${x.what} ${x.notes}`;
      if (text.toLowerCase().indexOf("phone") !== -1) {
        return true;
      } else {
        return false;
      }
    });
  }

  public filterByTodo() {
    this.activeFilter = "Todo";
    this.rows = this.rows.filter(x => {
      if (x.what && x.what.indexOf("TODO") !== -1) {
        return true;
      } else {
        return false;
      }
    });
  }

  public filterByDate(d: Date) {
    this.reset();
    this.rows = this.rows.filter(x => stos(x.when) === dtos(d));
  }

  toggleFilters() {
    this.showFilters = !this.showFilters;
  }

  toggleMerge() {
    this.mergeGroups = !this.mergeGroups;
    this.updateFriendGroups();
  }

  public reset() {
    this.activeFilter = null;
    this.rows = this.allRows
      .slice()
      // .slice(allRows.length - 5)
      .filter(isNonEmpty);
    this.rows.sort(rowComparator);
  }

  @HostListener("document:keypress", ["$event"])
  handleKeyboardEvent(event: KeyboardEvent) {
    const C = 99;
    if (event.keyCode === C) {
      window.location.href = this.newEntryUrl;
    }
  }
}

function isNonEmpty(row: Row): boolean {
  return [row.when, row.who, row.what, row.notes].some(x => !!x);
}

function toTimestamp(d: string): number {
  return new Date(d).getTime();
}

/**
 * Assuming x !== y
 */
function compare(x, y) {
  if (x < y) {
    return 1;
  } else {
    // x > y because of x !== y
    return -1;
  }
}

/**
 * Todo: Why does this seem to work correctly for things missing .when entirely (instead of just having .when equal to each other) even though I didn't write anything special for that?
 */
function rowComparator(a: Row, b: Row): number {
  const aDate = toTimestamp(a.when);
  const bDate = toTimestamp(b.when);
  if (aDate !== bDate) {
    return compare(aDate, bDate);
  } else {
    const aCreatedDate = toTimestamp(a.createdAt);
    const bCreatedDate = toTimestamp(b.createdAt);

    // I'm potentially breaking the x !== y rule, but timestamps should never be equal anyway...
    return compare(aCreatedDate, bCreatedDate);
  }
}

// todo dedupe these
// todo real tz handling? moment?
function dtos(d: Date) {
  // return d.toISOString().split('T')[0];
  const Y = d.getFullYear();
  const M = d.getMonth() + 1;
  const D = d.getDate();
  return `${M}/${D}/${Y}`;
}

function stod(s: string) {
  const temp = new Date(s);
  // todo discard time portion? how does this work with tzs?
  return temp;
}

function stos(s: string) {
  return dtos(stod(s));
}
// more here
