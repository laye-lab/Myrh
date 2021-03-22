import { Moment } from 'moment';
import { ITracker } from 'app/shared/model/tracker.model';
import { IRecuperation } from 'app/shared/model/recuperation.model';
import { ICongeData } from 'app/shared/model/conge-data.model';

export interface IConge {
  id?: number;
  idConge?: number;
  dateDebut?: string;
  dateRetourEffective?: string;
  tracker?: ITracker;
  recuperation?: IRecuperation;
  congeData?: ICongeData[];
}

export const defaultValue: Readonly<IConge> = {};
