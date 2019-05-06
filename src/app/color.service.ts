import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ColorService {

  constructor() { }

  /**
   * Adapted from https://stackoverflow.com/a/16348977
   */
  public getColor(book: string): string {
    var hash = 0;
    for (var i = 0; i < book.length; i++) {
      hash = book.charCodeAt(i) + ((hash << 5) - hash);
    }
    var colour = '#';
    for (var i = 0; i < 3; i++) {
      var value = (hash >> (i * 8)) & 0xFF;
      colour += ('00' + value.toString(16)).substr(-2);
    }
    return colour;
  }
}
