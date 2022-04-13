import {Component, OnInit} from '@angular/core';
import {YoutubeApiServiceService} from "../../services/youtube-api-service.service";

@Component({
  selector: 'app-youtube',
  templateUrl: './youtube.component.html',
  styleUrls: ['./youtube.component.css']
})
export class YoutubeComponent implements OnInit {

  results = [];
  input = 'dog';

  constructor(private youtubeApiService: YoutubeApiServiceService) { }

  ngOnInit(): void {
  }

  getResults(){
    this.results = this.youtubeApiService.getList(this.input);
  }
}
