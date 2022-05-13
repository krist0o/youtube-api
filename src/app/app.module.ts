import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {YoutubeComponent} from './components/youtube/youtube.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {LayoutModule} from "@angular/cdk/layout";
import {HttpClientModule} from "@angular/common/http";
import {CutTextPipe} from './pipes/cut-text.pipe';
import {FormatNumberPipe} from './pipes/format-number.pipe';
import { ItemComponent } from './components/item/item.component';
import { PaginationComponent } from './components/pagination/pagination.component';
import { CutTitlePipe } from './pipes/cut-title.pipe';
import { InputComponent } from './components/input/input.component';

@NgModule({
  declarations: [
    AppComponent,
    YoutubeComponent,
    CutTextPipe,
    FormatNumberPipe,
    ItemComponent,
    PaginationComponent,
    CutTitlePipe,
    InputComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    LayoutModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
