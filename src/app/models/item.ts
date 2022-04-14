export class Item {
  kind: string;
  etag: string;
  id: {
    "kind": string;
    "videoId": string;
    "channelId": string;
    "playlistId": string;
  };
  snippet: {
    publishedAt: string;
    channelId: string;
    title: string;
    description: string;
    thumbnails: {
      default:{
        url: string;
        width: string;
        height: string;
      };
      medium:{
        url: string;
        width: string;
        height: string;
      };
      high:{
        url: string;
        width: string;
        height: string;
      }
    };
    channelTitle: string;
    liveBroadcastContent: string;
  };


  constructor(kind: string, etag: string, id: { kind: string; videoId: string; channelId: string; playlistId: string },
              snippet: { publishedAt: string; channelId: string; title: string; description: string; thumbnails: { default: { url: string; width: string; height: string }; medium: { url: string; width: string; height: string }; high: { url: string; width: string; height: string } }; channelTitle: string; liveBroadcastContent: string }) {
    this.kind = kind;
    this.etag = etag;
    this.id = id;
    this.snippet = snippet;
  }
}
