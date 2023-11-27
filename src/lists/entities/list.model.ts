import { Model, Column, Table } from 'sequelize-typescript';

export type ListAttr = {
  name: string;
};

@Table
export class ListModel extends Model<ListAttr> {
  @Column
  name: string;
}
