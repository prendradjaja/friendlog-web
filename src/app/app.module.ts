import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from "@angular/common/http";

import { AppComponent } from './app.component';
import { EventCardComponent } from './event-card/event-card.component';
import { LongResponseFormatterComponent } from './long-response-formatter/long-response-formatter.component';
import { FirstNamePipe } from './first-name.pipe';
import { ParagraphFormatterComponent } from './paragraph-formatter/paragraph-formatter.component';

@NgModule({
  declarations: [
    AppComponent,
    EventCardComponent,
    LongResponseFormatterComponent,
    FirstNamePipe,
    ParagraphFormatterComponent
  ],
  imports: [
    BrowserModule,
    // import HttpClientModule after BrowserModule because that's what angular docs said
    // https://devdocs.io/angular/guide/http
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
