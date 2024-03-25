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
  dfatores?: boolean;
  cargo?: string
}

export function converterUsuario(apiUsuario: any): UserTypes {
  return {
    id: apiUsuario.id,
    nome: apiUsuario.nome,
    sobrenome: apiUsuario.sobrenome,
    email: apiUsuario.email,
    senha: apiUsuario.senha,
    isadmin: apiUsuario.isadmin,
    fotoSelecionada: apiUsuario.foto, // Supondo que 'foto' seja a propriedade para 'fotoSelecionada'
    responsavel: apiUsuario.nome_responsavel,
    cpf: apiUsuario.cpf,
    nomeFantasia: apiUsuario.nome_fantasia,
    razaoSocial: apiUsuario.razao_social,
    cnpj: apiUsuario.cnpj,
    telefone: apiUsuario.telefone,
    cep: apiUsuario.cep,
    endereco: apiUsuario.endereco,
    numero: apiUsuario.numero,
    complemento: apiUsuario.complemento,
    bairro: apiUsuario.bairro,
    cidade: apiUsuario.cidade,
    estado: apiUsuario.estado,
    dfatores: apiUsuario.dfatores,
  };
}
