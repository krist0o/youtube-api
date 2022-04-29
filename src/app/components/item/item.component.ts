import { Component, OnInit } from '@angular/core';
import {Item} from "../../models/item";

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit {

  item = new Item('string', 'string',{ kind: 'string', videoId: 'string1', channelId: 'string', playlistId: 'string' },
  { publishedAt: 'string', channelId: 'string', title: 'Невероятно большой и страшный тайтл, который никудаааааааааааааааааааааааааааааааааа не влезет', description: 'string',
    thumbnails: { default: { url: 'string', width: 'string', height: 'string' }, medium: { url: 'string', width: 'string', height: 'string' },
      high: { url: 'string', width: 'string', height: 'string' } }, channelTitle: 'string', liveBroadcastContent: 'string' },
    {viewCount: 1, likeCount: 1, dislikeCount: 1, favoriteCount: 1, commentCount: 1})

  constructor() { }

  ngOnInit(): void {
  }

}
