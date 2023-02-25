import { ApiProperty } from '@nestjs/swagger';

export class CreateJournalDto {
  @ApiProperty()
  userId: string;

  @ApiProperty()
  name: string;
}

export class UpdateJournalDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  name?: string;

  @ApiProperty()
  status?: string;
}
