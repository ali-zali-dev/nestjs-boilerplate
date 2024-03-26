import {
  BaseEntity,
  CreateDateColumn,
  DeleteDateColumn,
  UpdateDateColumn,
} from 'typeorm';

export class CommonEntity extends BaseEntity {
  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  /**
   * Set received object fields to the entity object.
   * @param obj Received object
   * @param ignores Ignores fields, default item is ['deleted_at', 'updated_at', 'created_at']
   */
  protected setArgumentToThisObject(
    obj: any,
    ignores: string[] = ['deleted_at', 'updated_at'],
  ) {
    ignores.concat(['deleted_at', 'updated_at']);
    for (const key in obj) {
      if (ignores.indexOf(key) == -1) this[key] = obj[key];
    }
  }
}
