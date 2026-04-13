export interface ListItem {
  id: number;
  title: string;
  description: string;
  image: string;
}

export interface CreateListItem {
  title: string;
  description: string;
  image: string;
}

export interface ListResponse {
  code: number;
  data: ListItem[];
  message: string;
}

export interface ItemResponse {
  code: number;
  data: ListItem;
  message: string;
}