import { Component, OnInit } from '@angular/core';
import {Item} from "../../models/item";

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit {

  item = new Item('string', 'string',{ kind: 'string', videoId: 'string1', channelId: 'string', playlistId: 'string' },
  { publishedAt: '2002-12-12', channelId: 'string', title: 'Невероятно большой и страшный тайтл, который никудаааааааааааааааааааааааааааааааааа не влезет', description: 'какое-то довольно крупное описание канала, которое опять же никуда не влезааааааааааааааааааааааааааааааааааааааааааааааааааааааааааааааааает',
    thumbnails: { default: { url: 'assets/calendar-icon.svg', width: 'string', height: 'string' }, medium: { url: 'assets/calendar-icon.svg', width: 'string', height: 'string' },
      high: { url: 'string', width: 'string', height: 'string' } }, channelTitle: 'довольно большое название канаааааааааааааааааааааааааааааааааала', liveBroadcastContent: 'string' },
    {viewCount: 100000000, likeCount: 1, dislikeCount: 1, favoriteCount: 1, commentCount: 1})

  constructor() { }

  ngOnInit(): void {
  }

}
