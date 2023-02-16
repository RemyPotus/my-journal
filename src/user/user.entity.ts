import { Entity, Column, ObjectIdColumn, ObjectID, OneToMany } from 'typeorm';
// import { Journal } from '../journal/journal.entity';
@Entity({ name: 'users' })
export class User {
  @ObjectIdColumn()
  _id: ObjectID;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  creationDate: Date;

  @Column({ default: true })
  isActive: boolean;

  // @OneToMany(() => Journal, (journal) => journal.userUID)
  // journals: Journal[];
}
