import {Component, OnInit, OnDestroy} from '@angular/core';
import {Item, Items} from "../../models/item";
import {ListSize} from "../../models/list-size";
import {BreakpointObserver, BreakpointState} from "@angular/cdk/layout";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent implements OnInit, OnDestroy {

  items: Item[] = Items;
  currentPageItems!: Item[];
  listSize!: ListSize;
  currentPage = 0;

  getBreakPointSubscription = new Subscription;

  constructor(public breakpointObserver: BreakpointObserver) {

  }

  ngOnInit(): void {
    this.getBreakPointSubscription = this.breakpointObserver
      .observe(['(min-width: 640px)', '(min-width: 960px)', '(min-width: 1280px)'])
      .subscribe((state: BreakpointState) => {
        if (state.breakpoints['(min-width: 1280px)'])
          this.listSize = ListSize.FOUR_ITEMS_SIZE;
        else if (state.breakpoints['(min-width: 960px)'])
          this.listSize = ListSize.THREE_ITEMS_SIZE;
        else if (state.breakpoints['(min-width: 640px)'])
          this.listSize = ListSize.TWO_ITEMS_SIZE;
        else
          this.listSize = ListSize.ONE_ITEM_SIZE;
        this.currentPageItems = this.items.slice(this.currentPage * this.listSize, (this.currentPage + 1) * this.listSize);


      })
  }

  ngOnDestroy(): void {
    this.getBreakPointSubscription.unsubscribe();
  }
}
