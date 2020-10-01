
export interface Job {
  id?: string;
  name?: string;
  risk?: Risk;
  minSalary?: number;
  maxSalary?: number;
}

export enum Risk {
  ALTO = 'ALTO',
  MEDIO = 'MEDIO',
  BAJO = 'BAJO'
}
