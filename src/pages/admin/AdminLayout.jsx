import React, { useEffect } from 'react';
import { Outlet, useNavigate, Link, useLocation } from 'react-router-dom';
import { isAuthenticated, logout } from '../../lib/auth';
import { HiOutlineChartPie, HiOutlineNewspaper, HiOutlinePhotograph, HiOutlineCog, HiOutlineLogout, HiOutlineInformationCircle, HiOutlineCreditCard } from 'react-icons/hi';

const navItems = [
  { name: 'Dashboard', path: '/admin/dashboard', icon: HiOutlineChartPie },
  { name: 'Latest News', path: '/admin/news', icon: HiOutlineNewspaper },
  { name: 'Manage Media', path: '/admin/media', icon: HiOutlinePhotograph },
  { name: 'Vision & Mission', path: '/admin/vision', icon: HiOutlineInformationCircle },
  { name: 'Fee Structure', path: '/admin/fees', icon: HiOutlineCreditCard },
  { name: 'Settings', path: '/admin/settings', icon: HiOutlineCog },
];

export default function AdminLayout() {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!isAuthenticated()) {
      navigate('/admin');
    }
  }, [navigate]);

  const handleLogout = () => {
    logout();
    navigate('/admin');
  };

  if (!isAuthenticated()) return null;

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-navy-900 text-white flex flex-col fixed h-full shadow-2xl z-20">
        <div className="p-6 border-b border-navy-800">
          <h2 className="text-xl font-bold tracking-wider">MERIDIAN</h2>
          <p className="text-royal-400 text-sm font-semibold mt-1">Admin Portal</p>
        </div>
        
        <nav className="flex-1 py-6 px-3 space-y-2">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.name}
                to={item.path}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium ${
                  isActive 
                    ? 'bg-royal-600 text-white shadow-lg shadow-royal-600/20' 
                    : 'text-navy-300 hover:bg-navy-800 hover:text-white'
                }`}
              >
                <item.icon className="w-5 h-5" />
                {item.name}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-navy-800">
          <button 
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-3 w-full text-red-400 hover:bg-navy-800 hover:text-red-300 rounded-xl transition-colors font-medium"
          >
            <HiOutlineLogout className="w-5 h-5" />
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 ml-64 min-h-screen relative">
        <Outlet />
      </main>
    </div>
  );
}
