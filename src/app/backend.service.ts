import { Injectable } from '@angular/core';

import { HttpClient } from "@angular/common/http";

const READ_CACHE = false;
const WRITE_CACHE = false;  // READ_CACHE must be false for this to matter

@Injectable({
  providedIn: 'root'
})
export class BackendService {

  private parser = new Parser();

  constructor(private http: HttpClient) { }

  private getAsPromise(url) {
    const key = 'friendlog/temp-offline/' + url;
    if (!READ_CACHE) {
      return this.http.get(url).toPromise().then(x => {
        if (WRITE_CACHE) {
          localStorage.setItem(key, JSON.stringify(x));
        }
        return x;
      });
    } else {
      const cached = localStorage.getItem(key);
      if (cached) {
        return Promise.resolve(JSON.parse(cached));
      } else {
        return Promise.reject();
      }
    }
  }

  // todo get rid of duped code in getFriendGroups
  public get() {
    const API_KEY=localStorage.getItem('friendlog/google-api-key');
    if (API_KEY) {
      const RANGE='A1:G500';
      const SPREADSHEET_ID='1_NXaTShS4WSieqo7CrJQJWjhuJZIkYzE9ZS3KSfj_-c';
      const url=`https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}/values/${RANGE}?key=${API_KEY}`;
      return this.getAsPromise(url).then(
        res => this.parser.parse(res['values'] as string[][]),
        err => {
          window.alert('Error fetching from db');
          return [];
        }
      );
    } else {
      return Promise.reject();
    }
  }

  public getFriendGroups() {
    const API_KEY=localStorage.getItem('friendlog/google-api-key');
    if (API_KEY) {
      const RANGE='FriendGroups!A1:G500';
      const SPREADSHEET_ID='1_NXaTShS4WSieqo7CrJQJWjhuJZIkYzE9ZS3KSfj_-c';
      const url=`https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}/values/${RANGE}?key=${API_KEY}`;
      return this.getAsPromise(url).then(
        res => this.parser.parseFriendGroups(res['values'] as string[][]),
        err => {
          return [];
        }
      );
    } else {
      return Promise.reject();
    }
  }
}

export class Row {
  // Changing columns requires changes in three places:
  // - Row.headers
  // - Row's attributes
  // - Parser.parseRow
  static headers = ["Timestamp","Who","When","What","Notes"];
  createdAt: string;  // When was the entry recorded?
  who: string;
  when: string;  // When was the hangout?
  what: string;
  notes: string;
}

class Parser {
  

  parse(rows: string[][]): Row[] {
    if (! this.headerEqualsExpected(rows)) {
      window.alert("Schema changed")
      return null;
    }
    const ret = [];
    rows.slice(1).forEach(row => {
      ret.push(this.parseRow(row));
    });
    return ret;
  }
  parseRow(row: string[]): Row {
    const [A,B,C,D,E,F,G] = [0,1,2,3,4,5,6];

    const ret = new Row();
    ret.createdAt = row[A];
    ret.who = row[B];
    ret.when = row[C];
    ret.what = row[D];
    ret.notes = row[E];
    return ret;
  }

  parseFriendGroups(rows: string[][]): string[][] {
    const ret = [[]];
    rows.forEach(row => {
      const cell = row[0];
      if (!cell) {
        ret.push([]);
      } else {
        ret[ret.length - 1].push(cell);
      }
    });
    return ret;
  }

  private headerEqualsExpected(rows: string[][]): boolean {
    // todo array comparison using lodash or something?
    return JSON.stringify(rows[0]) === JSON.stringify(Row.headers);
  }
}