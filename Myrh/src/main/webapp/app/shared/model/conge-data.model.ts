import { Moment } from 'moment';
import { IConge } from 'app/shared/model/conge.model';

export interface ICongeData {
  id?: number;
  idConge?: number;
  nbrJour?: string;
  dateRetour?: string;
  conge?: IConge;
}

export const defaultValue: Readonly<ICongeData> = {};
