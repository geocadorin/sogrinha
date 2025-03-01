import { DocumentReference } from 'firebase/firestore';
import { Owner } from './Owner';
import { Lessee } from './Lessee';

export interface Contract {
  id?: string;
  userId: string;
  contractKind: string;
  startDate: Date;
  endDate: Date;
  dayPayment: number;
  paymentValue: number;
  duration: number;
  status: string;

  owner: DocumentReference<Owner>;
  lessee?: DocumentReference<Lessee>;
}
//Filtro por Proprietário, locatário, data de vencimento, tipo de contrato

export enum EContractKind {
  Sale_With_Exclusivity = 'Venda com exclusividade',
  Sale_without_Exclusivity = 'Venda sem exclusividade',
  Rental_With_Administration = 'Locação com administração',
  Rental = 'Locação',
}

export enum EStatus {
  Active = 'Ativo',
  Done = 'Concluído',
  Voided = 'Cancelado',
}
