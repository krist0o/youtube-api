import {Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output} from '@angular/core';
import {Item} from "../../models/item";
import {ListSize} from "../../models/list-size";
import {BreakpointObserver, BreakpointState} from "@angular/cdk/layout";
import {Subscription} from "rxjs";
import {PaginationParameters, startParameters} from "../../models/pagination-parameters";

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent implements OnInit, OnDestroy, OnChanges {

  currentPageItems!: Item[];
  listSize!: ListSize;
  firstFiveItems: Item[] = [];

  paginationParameters: PaginationParameters = startParameters;

  @Input()
  items: Item[] = [];
  @Output()
  needData: EventEmitter<void> = new EventEmitter<void>();

  getBreakPointSubscription = new Subscription;
  refreshPageSubscription = new Subscription;

  constructor(public breakpointObserver: BreakpointObserver) {
  }

  ngOnInit(): void {
    this.getListSizeAndChangeScale();
  }

  ngOnChanges() {
    this.refreshPageIfNewData();
    this.setCurrentPageItems();
    if (this.items.length != 0)
      this.paginationParameters.isPaginationPanelEnabled = true;
    this.paginationParameters.isButtonsDisabled = false;
  }

  ngOnDestroy(): void {
    this.getBreakPointSubscription.unsubscribe();
    this.refreshPageSubscription.unsubscribe();
  }

  moveCurrentPage(pageNumber: number) {
    this.paginationParameters.currentPage = this.paginationParameters.currentPage + pageNumber;
    this.addResultsIfNecessary();
    this.setCurrentPageItems();
    this.moveButtonsNumbers();
  }

  setCurrentPage(buttonValue: number) {
    this.paginationParameters.currentPage = buttonValue - 1;
    this.addResultsIfNecessary();
    this.setCurrentPageItems();
    this.moveButtonsNumbers();
  }

  moveButtonsNumbers() {
    this.paginationParameters.isMoveBackEnabled = this.paginationParameters.currentPage != 0;
    //движение номеров панели вперед
    if (this.paginationParameters.currentPage + 1 == this.paginationParameters.pageButtons[3]) {
      this.paginationParameters.pageButtons = this.paginationParameters.pageButtons.map(value => value + 1);
    }
    //движение номеров панели назад
    if (this.paginationParameters.currentPage + 1 == this.paginationParameters.pageButtons[0] && this.paginationParameters.currentPage != 0) {
      this.paginationParameters.pageButtons = this.paginationParameters.pageButtons.map(value => value - 1);
    }
  }

  addResultsIfNecessary() {
    if (((this.paginationParameters.currentPage + 1) * this.listSize > this.items.length)) {
      this.paginationParameters.isButtonsDisabled = true;
      this.needData.emit()
    }
  }

  refreshPageButtonPanel() {
    if (this.paginationParameters.currentPage === 0) {
      this.paginationParameters.pageButtons = startParameters.pageButtons;
      this.paginationParameters.isMoveBackEnabled = false;
    } else {
      this.paginationParameters.pageButtons =
        [this.paginationParameters.currentPage, this.paginationParameters.currentPage + 1,
          this.paginationParameters.currentPage + 2, this.paginationParameters.currentPage + 3];
    }
  }

  setCurrentPageItems() {
    this.currentPageItems = this.items.slice(this.paginationParameters.currentPage * this.listSize,
      (this.paginationParameters.currentPage + 1) * this.listSize);
  }

  correctPageNumbersWhenChangeScale() {
    if (this.paginationParameters.currentPage != 0) {
      this.paginationParameters.currentPage =
        Math.floor((this.paginationParameters.currentPage * this.paginationParameters.previousPageSize + 0.9) / this.listSize);
      this.refreshPageButtonPanel();
    }
    this.paginationParameters.previousPageSize = this.listSize;
  }

  refreshPageIfNewData() {
    if (!this.isArraysEqual(this.items.slice(0,4),this.firstFiveItems)) {
      this.paginationParameters.currentPage = 0;
      this.refreshPageButtonPanel();
    }
    this.firstFiveItems = this.items.slice(0, 4);
  }

  getListSizeAndChangeScale() {
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
  }

  isArraysEqual(array1: any[], array2: any[]) {
    return (array1.length == array2.length) && array1.every( (element, index) => {
      return element === array2[index];
    });
  }
}
