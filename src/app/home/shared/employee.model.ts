import { Job } from './job.model';

export interface Employee {
  id?: string;
  name?: string;
  dni?: string;
  salary?: number;
  job?: Job;
  // languages?: Language[];
  // trainings?: Training[];
  // workExperiences?: WorkExperience[];
  // contacts?: Contact[];
}
