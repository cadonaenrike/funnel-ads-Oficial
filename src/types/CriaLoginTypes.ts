// Dentro de um arquivo de tipos, por exemplo, "@/types/AccountTypes.ts"
export interface CriaLoginType {
  nome: string;
  sobrenome: string;
  email: string;
  senha: string;
  isAdmin: boolean;
}

export interface CriaLoginRespostaType {
  message: string;
  // Adicione mais campos conforme esperado da resposta da API
}
