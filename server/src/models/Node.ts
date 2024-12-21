import { Model, DataTypes } from "sequelize";

/**
 * A node is the most basic form of data. All content is stored in nodes, from pages
 */
export class Node extends Model {
  declare id: number;
  declare name: string;
  declare parentId?: number;
  declare fields: Record<string, any>[];
}