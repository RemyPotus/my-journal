export class CreateCommentDto {
  texts: string[];
  categoryId: string;
}

export class UpdateCommentDto {
  id: string;
  texts: string[];
}
