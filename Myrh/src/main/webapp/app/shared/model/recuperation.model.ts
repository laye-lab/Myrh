import { IConge } from 'app/shared/model/conge.model';

export interface IRecuperation {
  id?: number;
  idConge?: number;
  nbrJour?: number;
  conge?: IConge;
}

export const defaultValue: Readonly<IRecuperation> = {};
