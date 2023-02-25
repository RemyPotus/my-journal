import { ApiProperty } from '@nestjs/swagger';

export class CreateCommentDto {
  @ApiProperty()
  texts: string[];

  @ApiProperty()
  categoryId: string;
}

export class UpdateCommentDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  texts: string[];
}
