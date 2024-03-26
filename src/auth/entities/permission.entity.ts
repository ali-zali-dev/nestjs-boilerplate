import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { CommonEntity } from '../../common/entities/common.entity';

import { Role } from './role.entity';

@Entity()
export class Permission extends CommonEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @Column()
  description: string;

  @ManyToMany(() => Role, (roles) => roles.permissions)
  @JoinTable({ name: 'role_permissions' })
  roles: Role[];
}
