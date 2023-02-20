export class CreateJournalDto {
  userId: string;
  name: string;
}

export class UpdateJournalDto {
  id: string;
  userId?: string;
  name?: string;
  lastUpdate?: Date;
  creationDate?: Date;
  status?: string;
  categories?: CategorieDto[];
}

export class CategorieDto {
  id: string;
  name: string;
  lastUpdate: Date;
  comments: CommentDto[];
  journalId: string;
}

export class CommentDto {
  id: string;
  date: Date;
  texts: string[];
  categoryId: string;
}
