import {PageInfo} from "./page-info";
import {Search} from "./search";

export class YoutubeResponse {
  kind: string;
  etag: string;
  nextPageToken: string;
  prevPageToken: string;
  regionCode: string;
  pageInfo: PageInfo;
  items: Search[];


  constructor(kind: string, etag: string, nextPageToken: string, prevPageToken: string, regionCode: string, pageInfo: PageInfo, items: Search[]) {
    this.kind = kind;
    this.etag = etag;
    this.nextPageToken = nextPageToken;
    this.prevPageToken = prevPageToken;
    this.regionCode = regionCode;
    this.pageInfo = pageInfo;
    this.items = items;
  }
}
