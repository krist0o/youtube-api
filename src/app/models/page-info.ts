export class PageInfo {
  totalResults: number;
  resultsPerPage: number;


  constructor(totalResults: number, resultsPerPage: number) {
    this.totalResults = totalResults;
    this.resultsPerPage = resultsPerPage;
  }
}
