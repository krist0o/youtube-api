import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {YoutubeResponse} from "../models/youtube-response";
import {Observable} from "rxjs";


@Injectable({
  providedIn: 'root'
})
export class YoutubeApiServiceService {

  private url = 'https://www.googleapis.com/youtube/v3';
  //private key = 'AIzaSyDXOF2JLAK4HUKaki3PqLWlHlDBxPjayts';
  private key = 'AIzaSyDyMgh39gRp3qbOzmExsZLF3OBsPKu0igw';
  private maxResults = '15';

  constructor(private http: HttpClient) {
  }

  getIdList(input: string): Observable<YoutubeResponse> {
    let inputParams = new Map<string, string>();
    inputParams.set('q', input);
    inputParams.set('maxResults', this.maxResults);
    let httpOptions = this.createHttpOptionsWithParams(inputParams);
    return this.http.get<YoutubeResponse>(this.url + '/search', httpOptions);
  }

  getVideoInfo(videoIds: string[]): Observable<YoutubeResponse> {
    let inputParams = new Map<string, string>();
    inputParams.set('part', 'statistics,snippet');
    inputParams.set('id', videoIds.join(','));
    let httpOptions = this.createHttpOptionsWithParams(inputParams);
    return this.http.get<YoutubeResponse>(this.url + '/videos', httpOptions);
  }

  createHttpOptionsWithParams(inputParams: Map<string, string>): typeof httpOptions {
    const httpOptions = {
      headers: new HttpHeaders({
        Accept: 'application/json'
      }),
      params: new HttpParams().set('key', this.key)
    }
    for (let entry of inputParams)
      httpOptions.params = httpOptions.params.set(entry[0], entry[1]);
    return httpOptions;
  }

  getIdListByToken(nextPageToken: string) {
    let inputParams = new Map<string, string>();
    inputParams.set('pageToken', nextPageToken);
    inputParams.set('maxResults', this.maxResults);
    let httpOptions = this.createHttpOptionsWithParams(inputParams);
    return this.http.get<YoutubeResponse>(this.url + '/search', httpOptions);
  }
}
