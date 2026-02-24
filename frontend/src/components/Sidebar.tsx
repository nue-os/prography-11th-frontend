import { Link, useLocation } from 'react-router-dom';
import { adminSidebarMenu } from '../constants/admin';

const Sidebar = () => {
  const location = useLocation();

  return (
    <aside className="bg-gray-200 flex min-h-screen w-full max-w-50 p-5">
      <nav className="flex flex-col gap-2">
        {adminSidebarMenu.map((item) => {
          const isActive = location.pathname.startsWith(item.path);

          return (
            <Link
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
