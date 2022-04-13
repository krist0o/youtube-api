import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {YoutubeResponse} from "../models/youtube-response";
import {Observable} from "rxjs";


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
        Authorization: 'Bearer 535997739909-jb2525kn0dq8f7i5sima3ioiqk0boupj.apps.googleusercontent.com'}),
      params: new HttpParams().set('part', input)
    }
    httpOptions.params = httpOptions.params.set('key','AIzaSyDyMgh39gRp3qbOzmExsZLF3OBsPKu0igw');
    return this.http.get<YoutubeResponse[]>(this.url + '/search', httpOptions);
  }
}
