export interface SubUser {
  id: string; // Opcional para novos subUsers
  nome: string;
  sobrenome: string;
  cpf: string;
  celular: string;
  cargo: string;
  nivelAcesso: string;
  email: string;
  foto?: string; // Opcional, dependendo de como você quer lidar com fotos
}
