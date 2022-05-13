import {StatisticsResponse} from "./statistics-response";

export class Item {
  kind: string;
  etag: string;
  id: {
    kind: string;
    videoId: string;
    channelId: string;
    playlistId: string;
  };
  snippet: {
    publishedAt: string;
    channelId: string;
    title: string;
    description: string;
    thumbnails: {
      default: {
        url: string;
        width: string;
        height: string;
      };
      medium: {
        url: string;
        width: string;
        height: string;
      };
      high: {
        url: string;
        width: string;
        height: string;
      }
    };
    channelTitle: string;
    liveBroadcastContent: string;
  };
  statistics: StatisticsResponse;

  constructor(kind: string, etag: string, id: { kind: string; videoId: string; channelId: string; playlistId: string },
              snippet: { publishedAt: string; channelId: string; title: string; description: string; thumbnails: { default: { url: string; width: string; height: string }; medium: { url: string; width: string; height: string }; high: { url: string; width: string; height: string } }; channelTitle: string; liveBroadcastContent: string },
              statistics: StatisticsResponse) {
    this.kind = kind;
    this.etag = etag;
    this.id = id;
    this.snippet = snippet;
    this.statistics = statistics;
  }
}
  // export const Items: Item[] = [new Item('string', 'string', {kind: 'string', videoId: 'string1', channelId: 'string', playlistId: 'string'},
  //   {
  //     publishedAt: '2002-12-12',
  //     channelId: 'string',
  //     title: 'Невероятно большой и страшный тайтл, который никудаааааааааааааааааааааааааааааааааа не влезет',
  //     description: 'какое-то довольно крупное описание канала, которое опять же никуда не влезааааааааааааааааааааааааааааааааааааааааааааааааааааааааааааааааает',
  //     thumbnails: {
  //       default: {url: 'assets/calendar-icon.svg', width: 'string', height: 'string'},
  //       medium: {url: 'assets/calendar-icon.svg', width: 'string', height: 'string'},
  //       high: {url: 'string', width: 'string', height: 'string'}
  //     },
  //     channelTitle: 'довольно большое название канаааааааааааааааааааааааааааааааааала',
  //     liveBroadcastContent: 'string'
  //   },
  //   {viewCount: 100000000, likeCount: 1, dislikeCount: 1, favoriteCount: 1, commentCount: 1}),
  //   new Item('string', 'string', {kind: 'string', videoId: 'string1', channelId: 'string', playlistId: 'string'},
  //     {
  //       publishedAt: '2002-12-12',
  //       channelId: 'string',
  //       title: 'Невероятно большой и страшный тайтл, который никудаааааааааааааааааааааааааааааааааа не влезет',
  //       description: 'какое-то довольно крупное описание канала, которое опять же никуда не влезааааааааааааааааааааааааааааааааааааааааааааааааааааааааааааааааает',
  //       thumbnails: {
  //         default: {url: 'assets/calendar-icon.svg', width: 'string', height: 'string'},
  //         medium: {url: 'assets/calendar-icon.svg', width: 'string', height: 'string'},
  //         high: {url: 'string', width: 'string', height: 'string'}
  //       },
  //       channelTitle: 'довольно большое название канаааааааааааааааааааааааааааааааааала',
  //       liveBroadcastContent: 'string'
  //     },
  //     {viewCount: 100000000, likeCount: 1, dislikeCount: 1, favoriteCount: 1, commentCount: 1}),
  //   new Item('string', 'string', {kind: 'string', videoId: 'string1', channelId: 'string', playlistId: 'string'},
  //     {
  //       publishedAt: '2002-12-12',
  //       channelId: 'string',
  //       title: 'Невероятно большой и страшный тайтл, который никудаааааааааааааааааааааааааааааааааа не влезет',
  //       description: 'какое-то довольно крупное описание канала, которое опять же никуда не влезааааааааааааааааааааааааааааааааааааааааааааааааааааааааааааааааает',
  //       thumbnails: {
  //         default: {url: 'assets/calendar-icon.svg', width: 'string', height: 'string'},
  //         medium: {url: 'assets/calendar-icon.svg', width: 'string', height: 'string'},
  //         high: {url: 'string', width: 'string', height: 'string'}
  //       },
  //       channelTitle: 'довольно большое название канаааааааааааааааааааааааааааааааааала',
  //       liveBroadcastContent: 'string'
  //     },
  //     {viewCount: 100000000, likeCount: 1, dislikeCount: 1, favoriteCount: 1, commentCount: 1}),
  //   new Item('string', 'string', {kind: 'string', videoId: 'string1', channelId: 'string', playlistId: 'string'},
  //     {
  //       publishedAt: '2002-12-12',
  //       channelId: 'string',
  //       title: 'Невероятно большой и страшный тайтл, который никудаааааааааааааааааааааааааааааааааа не влезет',
  //       description: 'какое-то довольно крупное описание канала, которое опять же никуда не влезааааааааааааааааааааааааааааааааааааааааааааааааааааааааааааааааает',
  //       thumbnails: {
  //         default: {url: 'assets/calendar-icon.svg', width: 'string', height: 'string'},
  //         medium: {url: 'assets/calendar-icon.svg', width: 'string', height: 'string'},
  //         high: {url: 'string', width: 'string', height: 'string'}
  //       },
  //       channelTitle: 'довольно большое название канаааааааааааааааааааааааааааааааааала',
  //       liveBroadcastContent: 'string'
  //     },
  //     {viewCount: 100000000, likeCount: 1, dislikeCount: 1, favoriteCount: 1, commentCount: 1}),
  // ];

