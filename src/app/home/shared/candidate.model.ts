import { Job } from './job.model';
import { Language } from './language.model';

export enum Level {
  GRADO = 'GRADO',
  POST_GRADO = 'POST_GRADO',
  MAESTRIA = 'MAESTRIA',
  DOCTORADO = 'DOCTORADO',
  TECNICO = 'TECNICO',
  GESTION = 'GESTION'
}

export interface Contact {
  name?: string;
  phone?: string;
}

export interface WorkExperience {
  company?: string;
  job?: string;
  from?: string;
  to?: string;
  salary?: number;
}

export interface Training {
  description?: string;
  level?: Level;
  from?: string;
  to?: string;
  institution?: string;
}

export interface Candidate {
  id?: string;
  name?: string;
  dni?: string;
  salary?: number;
  job?: Job;
  languages?: Language[];
  trainings?: Training[];
  workExperiences?: WorkExperience[];
  contacts?: Contact[];
}
