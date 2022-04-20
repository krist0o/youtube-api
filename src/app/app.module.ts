import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { YoutubeComponent } from './components/youtube/youtube.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import { CutTextPipe } from './pipes/cut-text.pipe';
import { FormatNumberPipe } from './pipes/format-number.pipe';

@NgModule({
  declarations: [
    AppComponent,
    YoutubeComponent,
    CutTextPipe,
    FormatNumberPipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
