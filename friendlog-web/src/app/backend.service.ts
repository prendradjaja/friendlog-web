import { Injectable } from '@angular/core';

import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class BackendService {

  private parser = new Parser();

  constructor(private http: HttpClient) { }

  public get() {
    const API_KEY=localStorage.getItem('friendlog/google-api-key');
    if (API_KEY) {
      const RANGE='A1:G500';
      const SPREADSHEET_ID='1_NXaTShS4WSieqo7CrJQJWjhuJZIkYzE9ZS3KSfj_-c';
      const url=`https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}/values/${RANGE}?key=${API_KEY}`;
      return this.http.get(url).toPromise().then(
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
}

export class Row {
  // Changing columns requires changes in three places:
  // - Row.headers
  // - Row's attributes
  // - Parser.parseRow
  static headers = ["Timestamp","Who","Combine with previous entry?","When","What","Notes","Other"];
  createdAt: string;  // When was the entry recorded?
  who: string;
  combine: boolean;
  when: string;  // When was the hangout?
  what: string;
  notes: string;
  other: string;
}

class Parser {
  

  parse(rows: string[][]): Row[] {
    if (! this.headerEqualsExpected(rows)) {
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
    ret.combine = !!row[C];
    ret.when = row[D];
    ret.what = row[E];
    ret.notes = row[F];
    ret.other = row[G];
    return ret;
  }

  private headerEqualsExpected(rows: string[][]): boolean {
    // todo array comparison using lodash or something?
    return JSON.stringify(rows[0]) === JSON.stringify(Row.headers);
  }
}