export class CreateJournalDto {
  userId: string;
  name: string;
}

export class UpdateJournalDto {
  id: string;
  name?: string;
  status?: string;
}

export class UpsertCategorieDto {
  name: string;
  id?: string;
  lastUpdate?: Date;
}
