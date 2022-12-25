export interface Root {
  saldoTotal: number;
  saldoNoPeriodo: number;
  page: Page;
}

export interface Page {
  content: Content[];
  pageable: Pageable;
  last: boolean;
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
  sort: Sort;
  first: boolean;
  numberOfElements: number;
  empty: boolean;
}

export interface Content {
  id: number;
  data_transferencia: string;
  valor: number;
  tipo: string;
  nome_operador_transacao?: string;
  conta_id: ContaId;
}

export interface ContaId {
  id_conta: number;
  nome_responsavel: string;
}

export interface Pageable {
  sort: Sort;
  offset: number;
  pageSize: number;
  pageNumber: number;
  unpaged: boolean;
  paged: boolean;
}

export interface Sort {
  empty: boolean;
  sorted: boolean;
  unsorted: boolean;
}
