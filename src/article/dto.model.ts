export class CreateArticleDto {
  id: string;
  userId?: string;
  userName: string;
  title: string;
  content?: string;
  status: boolean;
}

export class UpdateArticleDto {
  userId?: string;
  userName?: string;
  title?: string;
  content?: string;
  status?: boolean;
}
