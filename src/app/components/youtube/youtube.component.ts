import {Component, OnDestroy, OnInit} from '@angular/core';
import {YoutubeApiServiceService} from "../../services/youtube-api-service.service";
import {Subscription} from "rxjs";
import {YoutubeResponse} from "../../models/youtube-response";
import {Item} from "../../models/item";
import {HttpErrorResponse} from "@angular/common/http";


@Component({
  selector: 'app-youtube',
  templateUrl: './youtube.component.html',
  styleUrls: ['./youtube.component.css']
})
export class YoutubeComponent implements OnInit, OnDestroy {


  items: Item[] = [];

  getResultsSubscription = new Subscription;
  getVideoInfoSubscription = new Subscription;

  nextPageToken = '';

  constructor(private youtubeApiService: YoutubeApiServiceService) {

  }

  ngOnDestroy(): void {
    this.getResultsSubscription.unsubscribe();
    this.getVideoInfoSubscription.unsubscribe();
  }

  ngOnInit(): void {
  }

  getVideoInfo(videoIds: string[]) {
    this.getVideoInfoSubscription = this.youtubeApiService
      .getVideoInfo(videoIds)
      .subscribe((response: YoutubeResponse) => {
        this.items = response.items.map((item: Item) => item);

      })
  }

  addVideoInfo(videoIds: string[]) {
    this.getVideoInfoSubscription = this.youtubeApiService
      .getVideoInfo(videoIds)
      .subscribe((response: YoutubeResponse) => {
        this.items = this.items.concat(response.items.map((item: Item) => item));

      })
  }

  addResults($event: void) {
    this.getVideoInfoSubscription = this.youtubeApiService
      .getIdListByToken(this.nextPageToken)
      .subscribe(
        (response: YoutubeResponse) => {
          const videoIds = response.items.map((item: Item) => item.id.videoId);
          this.nextPageToken = response.nextPageToken;
          this.addVideoInfo(videoIds);
        },
        (error: HttpErrorResponse) =>
        this.getAlert(error));
  }

  getResultsByInputValue($event: string) {
    this.getResultsSubscription = this.youtubeApiService
      .getIdList($event)
      .subscribe(
        (response: YoutubeResponse) => {
          const videoIds = response.items.map((item: Item) => item.id.videoId);
          this.nextPageToken = response.nextPageToken;
          this.getVideoInfo(videoIds);
        },
        (error: HttpErrorResponse) =>
          this.getAlert(error));
  }

  getAlert(error: HttpErrorResponse) {
    if (error.status === 403)
      alert('Exception 403. Reason: quotaExceeded. ' +
        '\nПревышена квота запросов с данного ключа, можно сменить ключ или подождать до завтра =)');
    else
      alert('Status: ' + error.status + '. Message: ' + error.message);
  }
}

