import {PageInfo} from "./page-info";
import {Item} from "./item";

export class YoutubeResponse {
  kind: string;
  etag: string;
  nextPageToken: string;
  prevPageToken: string;
  regionCode: string;
  pageInfo: PageInfo;
  items: Item[];


  constructor(kind: string, etag: string, nextPageToken: string, prevPageToken: string, regionCode: string, pageInfo: PageInfo, items: Item[]) {
    this.kind = kind;
    this.etag = etag;
    this.nextPageToken = nextPageToken;
    this.prevPageToken = prevPageToken;
    this.regionCode = regionCode;
    this.pageInfo = pageInfo;
    this.items = items;
  }
}
