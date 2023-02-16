import { Entity, Column, ObjectID, ObjectIdColumn } from 'typeorm';

@Entity({ name: 'journals' })
export class Journal {
  @ObjectIdColumn()
  id: ObjectID;

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
