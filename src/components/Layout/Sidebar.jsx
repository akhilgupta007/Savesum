import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Tag, 
  BarChart2, 
  HelpCircle, 
  Settings, 
  LogOut
} from 'lucide-react';
import { ROUTES } from '@/constants/routes.constants';
import logo1 from '@/assets/save_sum_logo_1.svg';
import logo2 from '@/assets/save_sum_logo_2.svg';
import LogoutModal from '@/features/auth/components/LogoutModal';

const Sidebar = ({ isOpen, onClose }) => {
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const navLinks = [
    { name: 'Dashboard', icon: LayoutDashboard, path: ROUTES.DASHBOARD },
    { name: 'Deals', icon: Tag, path: ROUTES.DEALS },
    { name: 'Analytics', icon: BarChart2, path: ROUTES.ANALYTICS },
    { name: 'Help Center', icon: HelpCircle, path: ROUTES.HELP },
    { name: 'Settings', icon: Settings, path: ROUTES.SETTINGS },
  ];

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-[50] md:hidden backdrop-blur-sm"
          onClick={onClose}
        />
      )}
      
      <aside className={`w-[280px] h-screen bg-white border-r border-[#EBEBEB] flex flex-col justify-between py-8 fixed inset-y-0 left-0 z-[60] transform transition-transform duration-300 md:relative md:translate-x-0 ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
      <div>
        <div className="px-8 mb-10 flex items-center gap-3">
          <img src={logo1} alt="Save Sum Logo 1" className="h-[48px] w-auto object-contain" />
          <img src={logo2} alt="Save Sum Logo 2" className="h-[22px] w-auto object-contain" />
        </div>
        
        <nav className="flex flex-col gap-2 px-4">
          {navLinks.map((link) => {
            const Icon = link.icon;
            // Note: Since only Dashboard is defined in routes right now, 
            // we'll mock the active state based on current location
            return (
              <NavLink
                key={link.name}
                to={link.path}
                onClick={onClose}
                className={({ isActive }) => 
                  `flex items-center gap-4 px-4 py-3 rounded-xl transition-all font-inter text-[15px] font-medium ${
                    isActive 
                      ? 'bg-[#E8F0FE] text-[#005EF8]' 
                      : 'text-[#6A7282] hover:bg-[#F9FAFB] hover:text-[#0A0A0A]'
                  }`
                }
              >
                <Icon size={20} />
                {link.name}
              </NavLink>
            );
          })}
        </nav>
      </div>

      <div className="px-4">
        <button 
          onClick={() => {
            onClose?.();
            setIsLogoutModalOpen(true);
          }}
          className="flex w-full items-center gap-4 px-4 py-3 rounded-xl transition-all font-inter text-[15px] font-medium text-[#6A7282] hover:bg-[#F9FAFB] hover:text-[#0A0A0A]"
        >
          <LogOut size={20} />
          Log Out
        </button>
      </div>
      </aside>
      
      <LogoutModal 
        isOpen={isLogoutModalOpen}
        onClose={() => setIsLogoutModalOpen(false)}
        onConfirm={() => {
          setIsLogoutModalOpen(false);
          // TODO: Add actual logout logic here
          console.log("User logged out");
        }}
      />
    </>
  );
};

export default Sidebar;
