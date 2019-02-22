import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-paragraph-formatter',
  templateUrl: './paragraph-formatter.component.html',
  styleUrls: ['./paragraph-formatter.component.scss']
})
export class ParagraphFormatterComponent implements OnInit {

  @Input() line: string;

  fragments: {
    redacted: boolean;
    text: string;
  }[];

  constructor() { }

  ngOnInit() {
    this.fragments = [];
    let curr = {
      redacted: false,
      text: '',
    };
    for (let i = 0; i < this.line.length; i++) {
      const char = this.line.charAt(i);
      if (char === '~') {
        this.fragments.push(curr);
        curr = {
          redacted: !curr.redacted,
          text: '',
        };
      } else {
        curr.text += char;
      }
    }
    // todo handle mismatched ~s (with current impl, unclosed ~ means "redacted til end")
    this.fragments.push(curr);
  }

}
