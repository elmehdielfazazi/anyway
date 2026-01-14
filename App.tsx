
import React, { useState, useEffect } from 'react';
import Layout from './components/Layout';
import Dashboard from './components/Dashboard';
import MemberManager from './components/MemberManager';
import AICoach from './components/AICoach';
import LoginPage from './components/LoginPage';
import { View } from './types';

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [activeView, setActiveView] = useState<View>('dashboard');

  // Simple session persistence check
  useEffect(() => {
    const authStatus = localStorage.getItem('gymmaster_auth');
    if (authStatus === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = () => {
    setIsAuthenticated(true);
    localStorage.setItem('gymmaster_auth', 'true');
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('gymmaster_auth');
  };

  const renderContent = () => {
    switch (activeView) {
      case 'dashboard':
        return <Dashboard />;
      case 'members':
        return <MemberManager />;
      case 'ai-coach':
        return <AICoach />;
      case 'settings':
        return (
          <div className="bg-slate-900 p-8 rounded-2xl border border-slate-800 text-center space-y-4">
            <h3 className="text-xl font-bold">إعدادات النظام</h3>
            <p className="text-slate-400">هذه الصفحة قيد التطوير. يمكنك ضبط تفاصيل النادي ومفاتيح API هنا قريباً.</p>
            <button 
              onClick={handleLogout}
              className="px-6 py-2 bg-red-500/10 text-red-500 border border-red-500/20 rounded-xl hover:bg-red-500 hover:text-white transition-all"
            >
              تسجيل الخروج
            </button>
          </div>
        );
      default:
        return <Dashboard />;
    }
  };

  if (!isAuthenticated) {
    return <LoginPage onLogin={handleLogin} />;
  }

  return (
    <Layout activeView={activeView} onViewChange={setActiveView}>
      {renderContent()}
    </Layout>
  );
};

export default App;
