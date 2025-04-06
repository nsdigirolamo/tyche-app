export interface PostInput {
  parent_id: string;
  author_name: string;
  body: string;
}

export interface PostOutput {
  id: string;
  parent_id: string;
  author_name: string;
  body: string;
  created_at: string;
}
