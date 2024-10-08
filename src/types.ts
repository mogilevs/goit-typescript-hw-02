export interface ModalParams {
  url: string;
  title: string;
  username: string;
  likes: number;
}
export interface Image {
  id: string;
  urls: {
    small: string;
    regular: string;
  };
  alt_description: string;
  description: string;
  likes: number;
  user: {
    name: string;
  };
}
