import { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/imags/sogrinha_logo_text.png';
import RoutesName from '../routes/Routes';
import { ChevronDown } from 'lucide-react';

const TopBar = () => {
  const [openMenu, setOpenMenu] = useState<string | null>(null);

  const toggleMenu = (menu: string) => {
    setOpenMenu(openMenu === menu ? null : menu);
  };

  const menuOptions = [
    {
      title: 'Proprietários',
      createRoute: RoutesName.OWNER,
      listRoute: RoutesName.OWNERS,
    },
    {
      title: 'Imóveis',
      createRoute: RoutesName.REAL_ESTATE,
      listRoute: RoutesName.REAL_ESTATES,
    },
    {
      title: 'Contratos',
      createRoute: RoutesName.CONTRACT,
      listRoute: RoutesName.CONTRACTS,
    },
  ];

  return (
    <div className="bg-myPrimary p-4 flex items-center justify-between shadow-md">
      <Link to={RoutesName.LOGIN}>
        <img src={logo} alt="Logo" className="h-8" />
      </Link>
      <nav className="flex space-x-6">
        {menuOptions.map((item) => {
          return (
            <div key={item.createRoute} className="relative">
              <button
                onClick={() => toggleMenu(item.title)}
                className="text-white flex items-center gap-1 hover:text-gray-300"
              >
                {item.title} <ChevronDown size={16} />
              </button>
              {openMenu === item.title && (
                <div className="absolute mt-2 w-32 bg-white shadow-lg rounded-lg">
                  <Link
                    to={`${item.listRoute}`}
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-200"
                  >
                    Buscar
                  </Link>
                  <Link
                    to={`${item.createRoute}`}
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-200"
                  >
                    Criar
                  </Link>
                </div>
              )}
            </div>
          );
        })}
      </nav>
    </div>
  );
};

export default TopBar;
