import {Component, OnDestroy, OnInit} from '@angular/core';
import {YoutubeApiServiceService} from "../../services/youtube-api-service.service";
import {Subscription} from "rxjs";
import {YoutubeResponse} from "../../models/youtube-response";
import {Item} from "../../models/item";
import {ListSize} from "../../models/list-size";
import {HttpErrorResponse} from "@angular/common/http";
import {Subject} from "rxjs";


@Component({
  selector: 'app-youtube',
  templateUrl: './youtube.component.html',
  styleUrls: ['./youtube.component.css']
})
export class YoutubeComponent implements OnInit, OnDestroy {


  items: Item[] = [];
  listSize!: ListSize;
  currentPage: number = 0;
  moveBackEnabled = false;
  moveForwardEnabled = true;
  paginationPanelEnabled = false;
  pageButtons: number[] = [1, 2, 3, 4];
  isButtonsDisabled = false;

  refreshPage = new Subject();

  getResultsSubscription = new Subscription;
  getVideoInfoSubscription = new Subscription;
  getAutoCompleteSubscription = new Subscription;

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
        this.isButtonsDisabled = false;
      })
  }

  addVideoInfo(videoIds: string[]) {
    this.getVideoInfoSubscription = this.youtubeApiService
      .getVideoInfo(videoIds)
      .subscribe((response: YoutubeResponse) => {
        this.items = this.items.concat(response.items.map((item: Item) => item));
        this.isButtonsDisabled = false;
      })
  }

  addResults(nextPageToken: string) {
    this.isButtonsDisabled = true;
    this.getVideoInfoSubscription = this.youtubeApiService
      .getIdListByToken(nextPageToken)
      .subscribe((response: YoutubeResponse) => {
          const videoIds = response.items.map((item: Item) => item.id.videoId);
          this.nextPageToken = response.nextPageToken;
          this.addVideoInfo(videoIds);
        }, (error: HttpErrorResponse) => {
          alert('Status: ' + error.status + '. Message: ' + error.message);
        }
      );
  }

  addResultsIfNecessary() {
    if ((this.currentPage + 1) * this.listSize > this.items.length)
      this.addResults(this.nextPageToken);
  }

  getResultsByInputValue($event: string){
      this.isButtonsDisabled = true;
      this.getResultsSubscription = this.youtubeApiService
        .getIdList($event)
        .subscribe((response: YoutubeResponse) => {
            const videoIds = response.items.map((item: Item) => item.id.videoId);
            this.nextPageToken = response.nextPageToken;
            this.getVideoInfo(videoIds);
            this.refreshPage.next(0);
          }, (error: HttpErrorResponse) => {
            if (error.status === 403)
              alert('Exception 403. Reason: quotaExceeded. ' +
                '\nПревышена квота запросов с данного ключа, можно сменить ключ или подождать до завтра =)');
            else
              alert('Status: ' + error.status + '. Message: ' + error.message);
          }
        );
  }
}

