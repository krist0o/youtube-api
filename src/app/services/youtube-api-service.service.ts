import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {YoutubeResponse} from "../models/youtube-response";
import {Observable} from "rxjs";
import {InputParams} from "../models/input-params";


@Injectable({
  providedIn: 'root'
})
export class YoutubeApiServiceService {

  private url = 'https://www.googleapis.com/youtube/v3';
  private key = 'AIzaSyDyMgh39gRp3qbOzmExsZLF3OBsPKu0igw';
  private maxResults = '15';

  constructor(private http: HttpClient) {
  }

  getIdList(input: string): Observable<YoutubeResponse> {
    let inputParams: InputParams[] = [new InputParams('q',input),new InputParams('maxResults',this.maxResults)];
    let httpOptions = this.createHttpOptionsWithParams(inputParams);
    return this.http.get<YoutubeResponse>(this.url + '/search', httpOptions);
  }

  getVideoInfo(videoIds: string[]): Observable<YoutubeResponse>{
    let inputParams: InputParams[] = [new InputParams('part', 'statistics,snippet'),
      new InputParams('id', videoIds.join(','))];
    let httpOptions = this.createHttpOptionsWithParams(inputParams);
    return this.http.get<YoutubeResponse>(this.url + '/videos', httpOptions);
  }

  createHttpOptionsWithParams(inputParams: InputParams[]) : typeof httpOptions{
    const httpOptions = {
      headers: new HttpHeaders({
        Accept: 'application/json'}),
      params: new HttpParams().set('key',this.key)
    }
    inputParams.forEach(value => httpOptions.params = httpOptions.params.set(value.key,value.value));
    return httpOptions;
  }
}
