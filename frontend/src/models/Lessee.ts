export interface Lessee {
  id?: string;
  userId: string;
  fullName: string;
  rg: string;
  issuingBody: string; // Orgão emissor
  cpf: string;
  celphone: string;
  email: string;
  state: string;
  city: string;
  neighborhood: string;
  street: string;
  number: string;
  complement?: string;
  Cep: string;
  note?: string;
  maritalStatus: string;
  profession: string;

  fullNamePartner?: string;
  rgPartner?: string;
  issuingBodyPartner?: string; // Orgão emissor
  cpfPartner?: string;
  celphonePartner?: string;
  emailPartner?: string;
  statePartner?: string;
  cityPartner?: string;
  neighborhoodPartner?: string;
  streetPartner?: string;
  numberPartner?: string;
  complementPartner?: string;
  CepPartner: string;
}

//Filtros por nome, cpf, rg, email, busca paginada
