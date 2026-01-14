
import React from 'react';
import { LayoutDashboard, Users, Zap, Settings, Dumbbell } from 'lucide-react';
import { View } from '../types';

interface LayoutProps {
  children: React.ReactNode;
  activeView: View;
  onViewChange: (view: View) => void;
}

const Layout: React.FC<LayoutProps> = ({ children, activeView, onViewChange }) => {
  const menuItems = [
    { id: 'dashboard', label: 'لوحة القيادة', icon: LayoutDashboard },
    { id: 'members', label: 'المشتركين', icon: Users },
    { id: 'ai-coach', label: 'المدرب الذكي (Nano)', icon: Zap },
    { id: 'settings', label: 'الإعدادات', icon: Settings },
  ];

  return (
    <div className="flex h-screen bg-slate-950 overflow-hidden">
      {/* Sidebar */}
      <aside className="w-64 bg-slate-900 border-l border-slate-800 flex flex-col">
        <div className="p-6 flex items-center gap-3">
          <div className="bg-yellow-500 p-2 rounded-lg">
            <Dumbbell className="text-black" size={24} />
          </div>
          <h1 className="text-xl font-bold text-white">جيم ماستر</h1>
        </div>

        <nav className="flex-1 px-4 py-6 space-y-2">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => onViewChange(item.id as View)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                activeView === item.id
                  ? 'bg-yellow-500 text-black font-bold'
                  : 'text-slate-400 hover:bg-slate-800 hover:text-white'
              }`}
            >
              <item.icon size={20} />
              <span>{item.label}</span>
            </button>
          ))}
        </nav>

        <div className="p-4 mt-auto">
          <div className="bg-slate-800 rounded-xl p-4 border border-slate-700">
            <p className="text-xs text-slate-400 mb-1">نسخة الذكاء الاصطناعي</p>
            <p className="text-sm font-semibold text-yellow-500">Nano Banana Active</p>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-auto bg-slate-950">
        <header className="h-16 border-b border-slate-800 flex items-center justify-between px-8 bg-slate-900/50 backdrop-blur-md sticky top-0 z-10">
          <h2 className="text-lg font-semibold text-white">
            {menuItems.find(i => i.id === activeView)?.label}
          </h2>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="text-sm font-medium text-white">أحمد المدير</p>
              <p className="text-xs text-slate-400">مدير النادي</p>
            </div>
            <div className="w-10 h-10 rounded-full bg-slate-700 flex items-center justify-center border-2 border-yellow-500 overflow-hidden">
                <img src="https://picsum.photos/100/100" alt="Avatar" />
            </div>
          </div>
        </header>

        <div className="p-8">
          {children}
        </div>
      </main>
    </div>
  );
};

export default Layout;
