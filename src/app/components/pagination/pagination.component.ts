import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Item} from "../../models/item";
import {ListSize} from "../../models/list-size";
import {BreakpointObserver, BreakpointState} from "@angular/cdk/layout";
import {Subject, Subscription} from "rxjs";

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent implements OnInit, OnDestroy {

  // items: Item[] = Items;
  currentPageItems!: Item[];
  listSize!: ListSize;
  currentPage = 0;
  previousPageSize: ListSize = ListSize.ONE_ITEM_SIZE;
  isPaginationPanelEnabled = true;
  isMoveBackEnabled = false;
  isMoveForwardEnabled = true;
  pageButtons: number[] = [1, 2, 3, 4];

  @Input()
  isButtonsDisabled = false;
  @Input()
  items!: Item[];
  @Input()
  refreshPage = new Subject();

  private nextPageToken = '';

  getBreakPointSubscription = new Subscription;
  refreshPageSubscription = new Subscription;

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
        this.setCurrentPageItems();
        this.correctPageNumbersWhenChangeScale();
      })

    this.refreshPageSubscription = this.refreshPage
      .subscribe(() => {
          this.currentPage = 0;
          this.refreshPageButtonPanel();
          this.setCurrentPageItems();
        }
      )
  }

  ngOnDestroy(): void {
    this.getBreakPointSubscription.unsubscribe();
    this.refreshPageSubscription.unsubscribe();
  }

  moveCurrentPage(pageNumber: number) {
    this.currentPage = this.currentPage + pageNumber;
    this.addResultsIfNecessary();
    this.setCurrentPageItems();
    this.moveButtonsNumbers();
  }

  setCurrentPage(buttonValue: number) {
    this.currentPage = buttonValue - 1;
    this.addResultsIfNecessary();
    this.setCurrentPageItems();
    this.moveButtonsNumbers();
  }

  moveButtonsNumbers() {
    this.isMoveBackEnabled = this.currentPage != 0;
    if (this.currentPage + 1 == this.pageButtons[3]) {                               //движение номеров панели вперед
      this.pageButtons = this.pageButtons.map(value => value + 1);
    }
    if (this.currentPage + 1 == this.pageButtons[0] && this.currentPage != 0) {      //движение номеров панели назад
      this.pageButtons = this.pageButtons.map(value => value - 1);
    }
  }

  addResultsIfNecessary() {
    // if ((this.currentPage + 1) * this.listSize > this.items.length)
    //   this.addResults(this.nextPageToken);
  }

  refreshPageButtonPanel() {
    if (this.currentPage === 0) {
      this.pageButtons = [1, 2, 3, 4];
      this.isMoveBackEnabled = false;
    } else {
      this.pageButtons = [this.currentPage, this.currentPage + 1, this.currentPage + 2, this.currentPage + 3];
    }
  }

  setCurrentPageItems() {
    this.currentPageItems = this.items.slice(this.currentPage * this.listSize, (this.currentPage + 1) * this.listSize);
  }

  correctPageNumbersWhenChangeScale() {
    if (this.currentPage != 0) {
      this.currentPage = Math.floor((this.currentPage * this.previousPageSize + 0.9) / this.listSize);
      this.refreshPageButtonPanel();
    }
    this.previousPageSize = this.listSize;
  }
}
