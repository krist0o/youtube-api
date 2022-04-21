import {AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {YoutubeApiServiceService} from "../../services/youtube-api-service.service";
import {debounceTime, distinctUntilChanged, fromEvent, map, Subscription} from "rxjs";
import {YoutubeResponse} from "../../models/youtube-response";
import {Item} from "../../models/item";
import {BreakpointObserver, BreakpointState} from '@angular/cdk/layout';
import {ListSize} from "../../models/list-size";


@Component({
  selector: 'app-youtube',
  templateUrl: './youtube.component.html',
  styleUrls: ['./youtube.component.css']
})
export class YoutubeComponent implements OnInit, OnDestroy, AfterViewInit {

  @ViewChild('input')
  input!: ElementRef;

  items: Item[] = [];
  listSize!: ListSize;

  getResultsSubscription = new Subscription;
  getVideoInfoSubscription = new Subscription;
  getAutoCompleteSubscription = new Subscription;
  getBreakPointSubscription = new Subscription;

  constructor(private youtubeApiService: YoutubeApiServiceService, public breakpointObserver: BreakpointObserver) {

  }

  ngAfterViewInit(): void {
    const input: HTMLInputElement = this.input.nativeElement as HTMLInputElement;

    this.getAutoCompleteSubscription = fromEvent(input, 'input')
      .pipe(map((event: Event) => (event.target as HTMLInputElement).value),
        debounceTime(400),
        distinctUntilChanged())
      .subscribe((value: string) => {
        this.getResults(value)
      });
  }

  ngOnDestroy(): void {
    this.getResultsSubscription.unsubscribe();
    this.getVideoInfoSubscription.unsubscribe();
    this.getAutoCompleteSubscription.unsubscribe();
    this.getBreakPointSubscription.unsubscribe();
  }

  ngOnInit(): void {
    this.getBreakPointSubscription = this.breakpointObserver
      .observe(['(min-width: 640px)','(min-width: 960px)','(min-width: 1280px)'])
      .subscribe((state: BreakpointState) => {
        if (state.breakpoints['(min-width: 1280px)'])
          this.listSize = ListSize.FOUR_ITEMS_SIZE;
        else if (state.breakpoints['(min-width: 960px)'])
          this.listSize = ListSize.THREE_ITEMS_SIZE;
        else if (state.breakpoints['(min-width: 640px)'])
          this.listSize = ListSize.TWO_ITEMS_SIZE;
        else
          this.listSize = ListSize.ONE_ITEM_SIZE;
      });
  }

  getResults(input: string) {
    this.getResultsSubscription = this.youtubeApiService
      .getIdList(input)
      .subscribe((response: YoutubeResponse) => {
        const videoIds = response.items.map((item: Item) => item.id.videoId);
        this.getVideoInfo(videoIds)
      });
  }

  getVideoInfo(videoIds: string[]) {
    this.getVideoInfoSubscription = this.youtubeApiService
      .getVideoInfo(videoIds)
      .subscribe((response: YoutubeResponse) => {
        this.items = response.items.map((item: Item) => item);
      })
  }
}
