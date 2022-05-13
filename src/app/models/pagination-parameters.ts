import {ListSize} from "./list-size";

export class PaginationParameters {

  currentPage: number;
  previousPageSize: ListSize;
  isPaginationPanelEnabled: boolean;
  isMoveBackEnabled: boolean;
  isMoveForwardEnabled: boolean;
  pageButtons: number[];
  isButtonsDisabled: boolean;

  constructor(currentPage: number, previousPageSize: ListSize, isPaginationPanelEnabled: boolean, isMoveBackEnabled: boolean,
              isMoveForwardEnabled: boolean, pageButtons: number[], isButtonsDisabled: boolean) {
    this.currentPage = currentPage;
    this.previousPageSize = previousPageSize;
    this.isPaginationPanelEnabled = isPaginationPanelEnabled;
    this.isMoveBackEnabled = isMoveBackEnabled;
    this.isMoveForwardEnabled = isMoveForwardEnabled;
    this.pageButtons = pageButtons;
    this.isButtonsDisabled = isButtonsDisabled;
  }
}

export const startParameters: PaginationParameters =
  new PaginationParameters(0, ListSize.ONE_ITEM_SIZE, false, false,
    true, [1, 2, 3, 4], true);
