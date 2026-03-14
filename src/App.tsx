import React from 'react';
import Sidebar from './components/layout/Sidebar';
import Topbar from './components/layout/Topbar';
import GlobalSearch from './components/ui/GlobalSearch';
import NotificationsDrawer from './components/ui/NotificationsDrawer';
import AppView from './pages/AppView';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Profile from './pages/Profile';
import { usePortalStore } from './store/portalStore';

const App: React.FC = () => {
  const { isLoggedIn, currentPage, activeApp } = usePortalStore();

  if (!isLoggedIn) return <Login />;

  const renderPageTitle = () => {
    if (activeApp)                 return activeApp.name;
    if (currentPage === 'profile') return 'My Profile';
    return 'Dashboard';
  };

  const renderMain = () => {
    if (activeApp)                   return <AppView />;
    if (currentPage === 'profile')   return <Profile />;
    return <Dashboard />;
  };

  return (
    <div className="flex h-screen overflow-hidden relative z-10">
      <Sidebar />

      <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
        <Topbar pageTitle={renderPageTitle()} />
        <main className="flex-1 overflow-hidden flex flex-col">
          {renderMain()}
        </main>
      </div>

      {/* Overlays */}
      <GlobalSearch />
      <NotificationsDrawer />
    </div>
  );
};

export default App;