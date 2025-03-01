import { useEffect, useState } from 'react';
import { getContracts, deleteContract } from '../services/contractService';
import { Contract } from '../models/Contract';

const ContractList = () => {
  const [contracts, setContracts] = useState<Contract[]>([]);

  useEffect(() => {
    fetchContracts();
  }, []);

  const fetchContracts = async () => {
    const data = await getContracts();
    setContracts(data);
  };

  const handleDelete = async (id: string) => {
    await deleteContract(id);
    fetchContracts();
  };

  return (
    <div>
      <h2>Lista de Contratos</h2>
      <ul>
        {contracts.map((contract) => (
          <li key={contract.id}>
            <button onClick={() => handleDelete(contract.id!)}>Deletar</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ContractList;
