import Category from "../../../../enums/category.enum";

export interface ICommandOptions {
  name: string;
  description: string;
  category: Category;
  options: object;
  default_member_permissions: bigint;
  dm_permission: boolean;
}
