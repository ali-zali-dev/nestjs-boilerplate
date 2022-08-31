import {
  BaseEntity,
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Role } from '../../auth/entities/role.entity';
import { hash } from 'bcrypt';
@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  name: string;

  @Column({ unique: true })
  email: string;

  @Column({ unique: true, nullable: true })
  phoneNumber: string;

  @Column()
  password: string;

  @ManyToMany(() => Role, (role) => role.users, { eager: true })
  @JoinTable({ name: 'user_roles' })
  roles: Role[];

  @BeforeInsert()
  @BeforeUpdate()
  async before() {
    if (this.password && this.password.length < 40) {
      this.password = await hash(this.password, 10);
    }
    if (this.email) {
      this.email = this.email.toLowerCase();
    }
  }
}
