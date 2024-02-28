export interface TokenData {
  id?: string;
  nome: string;
  token: string;
  iduser?: string;
}

export interface TokenUpdateData {
  nome?: string;
  token?: string;
  iduser?: string;
}
