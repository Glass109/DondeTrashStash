export type Book = {
  other_titles: string[];
  publishers: string[];
  number_of_pages: number;
  table_of_contents: {
    level: number;
    label: string;
    title: string;
    pagenum: string;
  }[];
  covers: number[];
  local_id: string[];
  lc_classifications: string[];
  key: string;
  subtitle: string;
  publish_places: string[];
  contributions: string[];
  pagination: string;
  source_records: string[];
  title: string;
  dewey_decimal_class: string[];
  notes: {
    type: string;
    value: string;
  };
  identifiers: {
    librarything: string[];
    goodreads: string[];
  };
  languages: {
    key: string;
  }[];
  lccn: string[];
  isbn_10: string[];
  publish_date: string;
  publish_country: string;
  by_statement: string;
  oclc_numbers: string[];
  works: {
    key: string;
  }[];
  type: {
    key: string;
  };
  latest_revision: number;
  revision: number;
  created: {
    type: string;
    value: string;
  };
  last_modified: {
    type: string;
    value: string;
  };
};

export type Picture = {
  url: string;
  description: string;
};

export type Asignatura = {
  ID?: number;
  CreatedAt?: string;
  UpdatedAt?: string;
  DeletedAt?: string | null;
  Nombre: string;
  Familia: string;
  Duracion: number;
  Cuatrimestre: number;
  Profesor: string;
  Competencia: string;
  ObjetivoGeneral: string;
  Unidades: UnidadDeAprendizaje[] | null;
};

export type UnidadDeAprendizaje = {
  ID?: number;
  CreatedAt?: string;
  UpdatedAt?: string;
  DeletedAt?: string | null;
  Nombre: string;
  Competencia: string;
  Semanas: number;
  Producto: string;
  TareaIntegradora: boolean;
  Conocimiento: number;
  Desempeño: number;
  AsignaturaID: number;
  Asignatura: Asignatura;
};

