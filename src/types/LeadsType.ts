import { TagsType } from "./TagsType";

export interface LeadsType {
  id: string;
  celular: string | null;
  email: string;
  nome: string;
  userid: string;
  tag: TagsType[];
}
