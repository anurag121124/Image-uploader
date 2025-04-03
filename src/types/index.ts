export interface Comment {
  id: string;
  x: number;
  y: number;
  text: string;
  replies: Reply[];
  imageId: string;
  createdAt: number;
}

export interface Reply {
  id: string;
  text: string;
  createdAt: number;
}

export interface Image {
  id: string;
  url: string;
  name: string;
}