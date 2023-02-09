import { Entity, Column, ObjectIdColumn } from 'typeorm';

@Entity({ name: 'journals' })
export class Journal {
  @ObjectIdColumn()
  _id: string;

  @Column()
  userUID: string;

  @Column()
  name: string;

  @Column()
  status: string;

  @Column()
  lastUpdate: Date;

  @Column()
  creationDate: Date;
}
