import {Component, OnDestroy, OnInit} from '@angular/core';
import {YoutubeApiServiceService} from "../../services/youtube-api-service.service";
import {Subscription} from "rxjs";
import {YoutubeResponse} from "../../models/youtube-response";

@Component({
  selector: 'app-youtube',
  templateUrl: './youtube.component.html',
  styleUrls: ['./youtube.component.css']
})
export class YoutubeComponent implements OnInit,OnDestroy {

  results: YoutubeResponse [] = [];
  stringRes: string[] = [];
  input = 'dog';

  getResultsSubscription = new Subscription;

  constructor(private youtubeApiService: YoutubeApiServiceService) { }

  ngOnDestroy(): void {
        this.getResultsSubscription.unsubscribe();
    }

  ngOnInit(): void {
  }

  getResults(){
    this.getResultsSubscription = this.youtubeApiService
      .getList(this.input)
      .subscribe((res:YoutubeResponse[])=>{
        this.results = res});
    this.stringRes = this.results.map(value => value.items.toString())
  }
}
