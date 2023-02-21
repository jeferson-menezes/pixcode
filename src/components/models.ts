import * as currency from "currency.js";
import { QTableColumn } from "quasar";

export const Tipo = {
  CPF: 'CPF',
  CNPJ: 'CNPJ',
  EMAIL: 'EMAIL',
  CELULAR: 'CELULAR',
  ALEATORIA: 'ALEATORIA',
}
export const TipoText = {
  CPF: 'Cpf',
  CNPJ: 'Cnpj',
  EMAIL: 'E-mail',
  CELULAR: 'Número de telefone celular',
  ALEATORIA: 'Chave aleatória',
}

export const TipoMask = {
  CPF: '###.###.###-##',
  CNPJ: '##.###.###/####-##',
  EMAIL: '###.###.###-##',
  CELULAR: '(##) # ####-####',
  ALEATORIA: '',
}

export interface Todo {
  id: number;
  content: string;
}

export interface Meta {
  totalCount: number;
}

export interface Param {
  tipo: string
  chave: string
  nome: string
  cidade: string
}

export interface Pix {
  base64: string
  descricao: string
  id: number
  payload: string
  valor: string
}

export const columns: QTableColumn[] = [
  {
    label: "Valor",
    name: "valor",
    align: "left",
    field: "valor",
    sortable: true
  },
  {
    label: "Descrição",
    name: "descricao",
    align: "left",
    field: "descricao",
    sortable: true
  },

  {
    label: "Ações",
    name: "acoes",
    align: "center",
    field: "acoes",
    sortable: false
  }
];

