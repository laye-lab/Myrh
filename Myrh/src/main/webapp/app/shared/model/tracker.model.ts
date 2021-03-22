import { IConge } from 'app/shared/model/conge.model';

export interface ITracker {
  id?: number;
  idConge?: number;
  step?: number;
  conge?: IConge;
}

export const defaultValue: Readonly<ITracker> = {};
