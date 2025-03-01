import { auth, db } from './firebase';
import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  doc,
  getDoc,
  query,
  where,
} from 'firebase/firestore';
import { Customer } from '../models/Customer';

const CUSTOMER_DB_NAME = 'customers';
const customerCollection = collection(db, CUSTOMER_DB_NAME);

// Criar cliente
export const createCustomer = async (customer: Customer) => {
  return await addDoc(customerCollection, customer);
};

// Listar clientes do usuário autenticado
export const getCustomers = async () => {
  const user = auth.currentUser;

  if (user) {
    const q = query(customerCollection, where('userId', '==', user.uid));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(
      (doc) => ({ id: doc.id, ...doc.data() }) as Customer
    );
  } else {
    throw new Error('Usuário não autenticado');
  }
};

// Atualizar cliente
export const updateCustomer = async (
  id: string,
  updatedData: Partial<Customer>
) => {
  const customerDoc = doc(db, CUSTOMER_DB_NAME, id);
  return await updateDoc(customerDoc, updatedData);
};

// Deletar cliente
export const deleteCustomer = async (id: string) => {
  const customerDoc = doc(db, CUSTOMER_DB_NAME, id);
  return await deleteDoc(customerDoc);
};

// Recuperar cliente
export const getCustomerById = async (id: string): Promise<Customer | null> => {
  const customerDoc = doc(db, CUSTOMER_DB_NAME, id);
  const docSnapshot = await getDoc(customerDoc);

  if (docSnapshot.exists()) {
    return { id: docSnapshot.id, ...docSnapshot.data() } as Customer;
  } else {
    return null;
  }
};
