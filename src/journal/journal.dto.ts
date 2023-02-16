import { Timestamp } from 'typeorm';

export class CreateJournalDto {
  userUID: string;
  name: string;
}

export class UpdateJournalDto {
  id: string;
  userUID?: string;
  name?: string;
  lastUpdate?: Timestamp;
  creationDate?: Timestamp;
  status?: string;
  categories?: CategorieDto[];
}

export class CategorieDto {
  id: string;
  name: string;
  lastUpdate: Timestamp;
  comments: CommentDto[];
}

export class CommentDto {
  id: string;
  date: Timestamp;
  text: string[];
}
