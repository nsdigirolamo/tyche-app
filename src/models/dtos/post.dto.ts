export interface PostInput {
  parent_id: string | null;
  body: string;
}

export interface PostOutput {
  id: string;
  parent_id: string | null;
  author_id: string;
  body: string;
  created_at: string;
}
