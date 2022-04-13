export class Search {
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
    thumbnails: string;
    "channelTitle": string;
    "liveBroadcastContent": string;
  };


  constructor(kind: string, etag: string, id: { kind: string; videoId: string; channelId: string; playlistId: string },
              snippet: { publishedAt: string; channelId: string; title: string; description: string; thumbnails: string; channelTitle: string; liveBroadcastContent: string }) {
    this.kind = kind;
    this.etag = etag;
    this.id = id;
    this.snippet = snippet;
  }
}
