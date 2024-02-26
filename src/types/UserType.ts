export interface UserTypes {
  status?: number;
  id: number;
  nome: string;
  sobrenome: string;
  email: string;
  senha: string;
  isadmin: boolean;
  fotoSelecionada?: string; // Adicionado campo para foto selecionada
  responsavel?: string; // Adicionado campo para nome do responsável
  cpf?: string; // Adicionado campo para CPF
  nomeFantasia?: string; // Adicionado campo para nome fantasia
  razaoSocial?: string; // Adicionado campo para razão social
  cnpj?: string; // Adicionado campo para CNPJ
  telefone?: string; // Adicionado campo para telefone
  cep?: string; // Adicionado campo para CEP
  endereco?: string; // Adicionado campo para endereço
  numero?: string; // Adicionado campo para número
  complemento?: string; // Adicionado campo para complemento
  bairro?: string; // Adicionado campo para bairro
  cidade?: string; // Adicionado campo para cidade
  estado?: string; // Adicionado campo para estado
}
