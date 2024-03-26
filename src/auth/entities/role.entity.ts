import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { CommonEntity } from '../../common/entities/common.entity';
import { User } from '../../user/entities/user.entity';

import { Permission } from './permission.entity';

@Entity()
export class Role extends CommonEntity {
  constructor(role?: Partial<Role>) {
    super();
    this.setArgumentToThisObject(role);
  }
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @Column()
  description: string;

  @ManyToMany(() => User, (role) => role.roles)
  users: User[];

  @ManyToMany(() => Permission, (permissions) => permissions.roles, {
    eager: true,
  })
  permissions: Permission[];
}
