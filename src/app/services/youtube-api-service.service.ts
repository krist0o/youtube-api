import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {YoutubeResponse} from "../models/youtube-response";
import {Observable} from "rxjs";
import {StatisticsResponse} from "../models/statistics-response";


@Injectable({
  providedIn: 'root'
})
export class YoutubeApiServiceService {

  url = 'https://www.googleapis.com/youtube/v3';

  constructor(private http: HttpClient) {
  }

  getList(input: string, maxResults: number): Observable<YoutubeResponse> {
    const httpOptions = {
      headers: new HttpHeaders({
        Accept: 'application/json'}),
      params: new HttpParams().set('part', 'snippet')
    }
    httpOptions.params = httpOptions.params.set('key','AIzaSyDyMgh39gRp3qbOzmExsZLF3OBsPKu0igw');
    httpOptions.params = httpOptions.params.set('q', input);
    httpOptions.params = httpOptions.params.set('maxResults', maxResults);
    return this.http.get<YoutubeResponse>(this.url + '/search', httpOptions);
  }

  getStatistics(videoId: string): Observable<StatisticsResponse>{
    const httpOptions = {
      headers: new HttpHeaders({
        Accept: 'application/json'}),
      params: new HttpParams().set('part', 'statistics')
    }
    httpOptions.params = httpOptions.params.set('key','AIzaSyDyMgh39gRp3qbOzmExsZLF3OBsPKu0igw');
    httpOptions.params = httpOptions.params.set('id', videoId);
    return this.http.get<StatisticsResponse>(this.url + '/videos', httpOptions);
  }
}
