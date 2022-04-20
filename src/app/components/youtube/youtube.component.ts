import {AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {YoutubeApiServiceService} from "../../services/youtube-api-service.service";
import {Subscription} from "rxjs";
import {YoutubeResponse} from "../../models/youtube-response";
import {Item} from "../../models/item";
import {debounceTime, distinctUntilChanged, filter, fromEvent, map} from "rxjs";

@Component({
  selector: 'app-youtube',
  templateUrl: './youtube.component.html',
  styleUrls: ['./youtube.component.css']
})
export class YoutubeComponent implements OnInit, OnDestroy, AfterViewInit {

  @ViewChild('input')
  input!: ElementRef;

  items: Item[] = [];

  getResultsSubscription = new Subscription;
  getVideoInfoSubscription = new Subscription;
  getAutoCompleteSubscription = new Subscription;

  constructor(private youtubeApiService: YoutubeApiServiceService) {

  }

  ngAfterViewInit(): void {
    const input: HTMLInputElement = this.input.nativeElement as HTMLInputElement;

    this.getAutoCompleteSubscription = fromEvent(input, 'input')
      .pipe(map((event: Event) => (event.target as HTMLInputElement).value),
        debounceTime(400),
        distinctUntilChanged())
      .subscribe((value:string) => {
        this.getResults(value)
      });
    }

  ngOnDestroy(): void {
    this.getResultsSubscription.unsubscribe();
    this.getVideoInfoSubscription.unsubscribe();
    this.getAutoCompleteSubscription.unsubscribe();
  }


  ngOnInit(): void {
  }

  getResults(input:string) {
    this.getResultsSubscription = this.youtubeApiService
      .getIdList(input)
      .subscribe((response: YoutubeResponse) => {
        const videoIds = response.items.map((item: Item) => item.id.videoId);
        this.getVideoInfo(videoIds)
      });
  }

  getVideoInfo(videoIds:string[]){
    this.getVideoInfoSubscription = this.youtubeApiService
      .getVideoInfo(videoIds)
      .subscribe((response: YoutubeResponse) => {
        this.items = response.items.map((item:Item)=> item);
      })
  }
}
