export class StatisticsResponse {

  viewCount: number;
  likeCount: number;
  dislikeCount: number;
  favoriteCount: number;
  commentCount: number;

  constructor(viewCount: number, likeCount: number, dislikeCount: number, favoriteCount: number, commentCount: number) {
    this.viewCount = viewCount;
    this.likeCount = likeCount;
    this.dislikeCount = dislikeCount;
    this.favoriteCount = favoriteCount;
    this.commentCount = commentCount;
  }
}
