import {Component, OnDestroy, OnInit} from '@angular/core';
import {YoutubeApiServiceService} from "../../services/youtube-api-service.service";
import {Subscription} from "rxjs";
import {YoutubeResponse} from "../../models/youtube-response";
import {Item} from "../../models/item";
import {StatisticsResponse} from "../../models/statistics-response";

@Component({
  selector: 'app-youtube',
  templateUrl: './youtube.component.html',
  styleUrls: ['./youtube.component.css']
})
export class YoutubeComponent implements OnInit, OnDestroy {

  itemRes: Item[] = [];
  input = "соба";
  maxResults = 3;
  statistics: StatisticsResponse[] = [];

  getResultsSubscription = new Subscription;
  getStatisticsSubscription = new Subscription;

  constructor(private youtubeApiService: YoutubeApiServiceService) {
  }

  ngOnDestroy(): void {
    this.getResultsSubscription.unsubscribe();
    this.getStatisticsSubscription.unsubscribe();
  }

  ngOnInit(): void {
  }

  getResults() {
    this.getResultsSubscription = this.youtubeApiService
      .getList(this.input, this.maxResults)
      .subscribe((res: YoutubeResponse) => {
        this.itemRes = res.items;
        const videoIds = this.itemRes.map((item: Item) => item.id.videoId);
        this.getStatistics(videoIds)
      });
  }

  getStatistics(videoIds:string[]){
    this.getStatisticsSubscription = this.youtubeApiService
      .getStatistics(videoIds)
      .subscribe((res: YoutubeResponse) => {
        this.statistics = res.items.map((item:Item)=> item.statistics);
      })
  }

  // getCountById(videoId: string) {
  //   this.statistics.forEach(value => value.)
  // }
}
