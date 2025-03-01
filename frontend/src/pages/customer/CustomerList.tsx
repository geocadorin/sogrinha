import { useEffect, useState } from 'react';
import { getCustomers, deleteCustomer } from '../../services/customerService';
import { Customer } from '../../models/Customer';

const CustomerList = () => {
  const [customers, setContracts] = useState<Customer[]>([]);

  useEffect(() => {
    fetchContracts();
  }, []);

  const fetchContracts = async () => {
    const data = await getCustomers();
    setContracts(data);
  };

  const handleDelete = async (id: string) => {
    await deleteCustomer(id);
    fetchContracts();
  };

  return (
    <div>
      <h2>Lista de Contratos</h2>
      <ul>
        {customers.map((customer) => (
          <li key={customer.id}>
            {customer.fullName} - {customer.email}
            <button onClick={() => handleDelete(customer.id!)}>Deletar</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CustomerList;
