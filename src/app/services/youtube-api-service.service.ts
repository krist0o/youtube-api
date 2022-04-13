import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {YoutubeResponse} from "../models/youtube-response";
import {Observable} from "rxjs/dist/types";

@Injectable({
  providedIn: 'root'
})
export class YoutubeApiServiceService {

  url = 'https://www.googleapis.com/youtube/v3';

  constructor(private http: HttpClient) {
  }

  getList(input: string): Observable<YoutubeResponse[]> {
    const httpOptions = {
      headers: new HttpHeaders({
        Accept: 'application/json',
        Authorization: 'Bearer [AIzaSyDXOF2JLAK4HUKaki3PqLWlHlDBxPjayts]'}),
      params: new HttpParams().set('part', input)
    }
    return this.http.get<YoutubeResponse[]>(this.url + '/search', httpOptions);
  }
}
