import { ApiProperty } from '@nestjs/swagger';

export class CreateCategoryDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  journalId: string;
}

export class UpdateCategoryDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;
}
