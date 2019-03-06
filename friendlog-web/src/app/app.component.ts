import { Component, OnInit } from '@angular/core';
import { BackendService, Row } from './backend.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  rows: Row[] = [];

  showFilters = false;
  friendGroups: string[][];
  allFriendGroups: string[][];
  mergeGroups = false;

  newEntryUrl = 'https://docs.google.com/forms/d/e/1FAIpQLSfrEoQFScVs_hleOQ9TU0-vev62_UK8mwYgEYOLC1sPwUK4dw/viewform';
  newCombinedEntryUrl = 'https://docs.google.com/forms/d/e/1FAIpQLSfrEoQFScVs_hleOQ9TU0-vev62_UK8mwYgEYOLC1sPwUK4dw/viewform?usp=pp_url&entry.891050226=Yes';

  exampleRowFull: Row;

  activeFilter: string;

  private lastRow: Row;
  // Only fetched once. Copy, don't mutate.
  private allRows: Row[];

  constructor (private backendService: BackendService) {}

  ngOnInit() {
    this.backendService.getFriendGroups().then(x => {
      this.allFriendGroups = x;
      this.updateFriendGroups();
    });
    this.backendService.get().then(
      allRows => this.onRowsReceived(allRows),
      err => {
        const key = window.prompt('Set key (leave blank for no action)');
        if (key) {
          localStorage.setItem('friendlog/google-api-key', key);
          location.reload();
        }
      }
    );

    this.exampleRowFull = new Row();
    this.exampleRowFull.who = 'Jane Doe';
    this.exampleRowFull.combine = false;
    this.exampleRowFull.when = 'asdf';
    this.exampleRowFull.what = 'Coffee';
    this.exampleRowFull.notes = 'Some notes';
    this.exampleRowFull.other = 'Other stuff';
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
    this.lastRow = allRows[allRows.length - 1];
    this.allRows = allRows;
    this.reset();
  }

  public filterByWho(who: string) {
    this.activeFilter = who;
    this.rows = this.rows.filter(x => x.who === who);
  }

  public filterByPhone() {
    this.activeFilter = 'Phone';
    this.rows = this.rows.filter(x => {
      const text = `${x.what} ${x.notes} ${x.other}`;
      if (text.toLowerCase().indexOf('phone') !== -1) {
        return true;
      } else {
        return false;
      }
    });
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
    this.rows = (
      this.allRows.slice()
      // .slice(allRows.length - 5)
      .filter(isNonEmpty)
    );
    this.rows.sort(rowComparator);
  }

  public lastEntrySummary(): string {
    const last = this.lastRow;
    if (last) {
      return ellipsify(
        [last.combine ? 'combine' : null, last.when, last.who, last.what, hideRedactions(last.notes), hideRedactions(last.other)]
        .filter(x => x).join(', ')
      );
    } else {
      return '...';
    }
  }
}

function hideRedactions(x: string) {
  if (x && x.indexOf('~') !== -1) {
    return '[contains redaction]';
  } else {
    return x;
  }
}

function ellipsify(s: string, maxLength = 50): string {
  if (s.length > maxLength) {
    return s.substring(0, maxLength) + '...';
  }
  return s;
}

function isNonEmpty(row: Row): boolean {
  return [row.when, row.who, row.what, row.notes, row.other].some(x => !!x);
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
  } else { // x > y because of x !== y
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
