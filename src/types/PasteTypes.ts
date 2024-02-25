export interface Funil {
  name: string;
}

export interface Campanha {
  id: string;
  name: string;
  pasta_id: string;
  funis?: Funil[];
}

export interface Pasta {
  id: string;
  name: string;
  campanhas: Campanha[];
}
