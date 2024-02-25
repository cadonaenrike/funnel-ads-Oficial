import { TagsType } from "./TagsType";

export interface LeadsType {
  id: string;
  nome: string;
  celular: string | null;
  email: string;
  tag: TagsType[];
}
