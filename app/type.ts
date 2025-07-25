export interface Review {
  id: string;
  authorName: string;
  coverImage: string;
  description: string;
  ExternalLink: string;
  rating: number;
  title: string;
  type: "book" | "movie" | "anime";
  story: string;
  pros: string;
  cons: string;
  summary: string;
}
