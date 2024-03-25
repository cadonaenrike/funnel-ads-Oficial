export interface SubUser {
  idAdmin: string;
  id: string; // Opcional para novos subUsers
  nome: string;
  sobrenome: string;
  cpf: string;
  celular: string;
  cargo: string;
  nivelAcesso: string;
  email: string;
  plano?: string;
  foto?: string;
}
