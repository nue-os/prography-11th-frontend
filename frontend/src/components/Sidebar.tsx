import { Link, useLocation } from 'react-router-dom';
import { adminSidebarMenu } from '../constants/admin';
import Logo from '@/assets/logo.png';

const Sidebar = () => {
  const location = useLocation();

  return (
    <aside className="bg-gray-200 flex flex-col min-h-screen w-full max-w-50 p-5 gap-10">
      <img src={Logo} alt="로고" />
      <nav className="flex flex-col gap-2">
        {adminSidebarMenu.map((item) => {
          const isActive = location.pathname.startsWith(item.path);

          return (
            <Link
              key={item.path}
              to={item.path}
              className={`transition-smooth flex items-center gap-5 ${isActive ? '' : ' text-gray-400'} `}
            >
              <div className="flex items-center gap-4">
                <span className={`${isActive ? 'font-bold' : ''}`}>
                  {item.label}
                </span>
              </div>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
};

export default Sidebar;
