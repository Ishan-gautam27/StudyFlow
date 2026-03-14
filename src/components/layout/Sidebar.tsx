import {
    Bell,
    ChevronDown, ChevronRight,
    LayoutGrid,
    LogOut, PanelLeftClose, PanelLeftOpen,
    Settings,
    User
} from 'lucide-react';
import React, { useState } from 'react';
import { apps, categoryMeta } from '../../data/apps';
import { usePortalStore } from '../../store/portalStore';
import { AppCategory } from '../../types';

const Sidebar: React.FC = () => {
  const {
    sidebarCollapsed, toggleSidebar, openApp, activeApp,
    currentPage, setPage, toggleNotif, unreadCount, user
  } = usePortalStore();

  const [expandedCats, setExpandedCats] = useState<AppCategory[]>(['academic', 'campus-life']);

  const toggleCat = (cat: AppCategory) => {
    setExpandedCats(prev =>
      prev.includes(cat) ? prev.filter(c => c !== cat) : [...prev, cat]
    );
  };

  const navApps = (cat: string) => apps.filter(a => a.category === cat && a.type !== 'coming-soon');

  return (
    <aside
      className="flex flex-col h-screen border-r border-border relative z-20 transition-all duration-300 ease-in-out flex-shrink-0"
      style={{ width: sidebarCollapsed ? 64 : 240, background: '#0F1219' }}
    >
     {/* Logo */}
<div className="flex items-center gap-3 px-4 h-14 border-b border-border flex-shrink-0">
  <div className="w-7 h-7 rounded-lg bg-accent flex items-center justify-center flex-shrink-0">
    <span className="text-xs font-mono font-bold text-white">U</span>
  </div>
  {!sidebarCollapsed && (
    <div className="flex-1 min-w-0 overflow-hidden">
      <p className="text-sm font-semibold text-text-primary leading-none">UniPortal</p>
      <p className="text-[10px] text-text-muted font-mono mt-0.5">v2.0 · campus OS</p>
    </div>
  )}
</div>

{/* Collapse toggle — full width bar */}
<button
  onClick={toggleSidebar}
  className="w-full flex items-center gap-2 px-4 py-2 border-b border-border bg-border/20 hover:bg-border/50 transition-colors group flex-shrink-0"
  title={sidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
>
  {sidebarCollapsed
    ? <PanelLeftOpen  size={13} className="text-text-faint group-hover:text-text-muted transition-colors mx-auto" />
    : <>
        <PanelLeftClose size={13} className="text-text-faint group-hover:text-text-muted transition-colors flex-shrink-0" />
        <span className="text-[10px] text-text-faint group-hover:text-text-muted font-mono tracking-wide transition-colors">
          collapse
        </span>
      </>
  }
</button>



      {/* Dashboard link */}
      <div className="px-2 pt-3 pb-1 flex-shrink-0">
        <button
          onClick={() => setPage('dashboard')}
          className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-150 group relative
            ${currentPage === 'dashboard' ? 'bg-accent/10 text-accent' : 'text-text-muted hover:text-text-secondary hover:bg-border/50'}`}
        >
          <LayoutGrid size={16} className="flex-shrink-0" />
          {!sidebarCollapsed && <span className="text-xs font-medium">Dashboard</span>}
          {sidebarCollapsed && (
            <span className="absolute left-full ml-3 px-2 py-1 bg-raised border border-border text-text-primary text-xs rounded-lg opacity-0 group-hover:opacity-100 pointer-events-none whitespace-nowrap z-50 transition-opacity">
              Dashboard
            </span>
          )}
        </button>
      </div>

      {!sidebarCollapsed && (
        <p className="text-[10px] font-mono text-text-faint px-5 pt-3 pb-1 uppercase tracking-widest">Apps</p>
      )}

      {/* Scrollable nav */}
      <nav className="flex-1 overflow-y-auto px-2 space-y-0.5 pb-2">
        {categoryMeta.map(cat => {
          const catApps    = navApps(cat.id);
          const isExpanded = expandedCats.includes(cat.id);
          const hasActive  = activeApp?.category === cat.id;

          return (
            <div key={cat.id}>
              <button
                onClick={() => !sidebarCollapsed && toggleCat(cat.id)}
                className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg transition-all duration-150 group relative
                  ${hasActive ? 'text-text-secondary' : 'text-text-muted hover:text-text-secondary hover:bg-border/30'}`}
              >
                <span className="text-sm flex-shrink-0">{cat.icon}</span>
                {!sidebarCollapsed && (
                  <>
                    <span className="text-xs font-medium flex-1 text-left">{cat.label}</span>
                    <span className="text-[10px] text-text-faint">{catApps.length}</span>
                    {isExpanded
                      ? <ChevronDown  size={12} className="text-text-faint flex-shrink-0" />
                      : <ChevronRight size={12} className="text-text-faint flex-shrink-0" />
                    }
                  </>
                )}
                {sidebarCollapsed && (
                  <span className="absolute left-full ml-3 px-2 py-1 bg-raised border border-border text-text-primary text-xs rounded-lg opacity-0 group-hover:opacity-100 pointer-events-none whitespace-nowrap z-50 transition-opacity">
                    {cat.label}
                  </span>
                )}
              </button>

              {!sidebarCollapsed && isExpanded && (
                <div className="ml-2 pl-3 border-l border-border space-y-0.5 mb-1">
                  {catApps.map(app => (
                    <button
                      key={app.id}
                      onClick={() => openApp(app)}
                      className={`w-full flex items-center gap-2.5 px-2 py-1.5 rounded-md transition-all duration-150
                        ${activeApp?.id === app.id
                          ? 'bg-accent/10 text-accent'
                          : 'text-text-muted hover:text-text-secondary hover:bg-border/30'}`}
                    >
                      <span className="text-sm leading-none">{app.icon}</span>
                      <span className="text-xs flex-1 text-left truncate">{app.name}</span>
                      <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${
                        app.status === 'online'   ? 'bg-green animate-pulse-dot' :
                        app.status === 'degraded' ? 'bg-amber' : 'bg-text-faint'
                      }`} />
                    </button>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </nav>

      {/* Bottom actions */}
      <div className="border-t border-border px-2 py-2 space-y-0.5 flex-shrink-0">
        <button
          onClick={toggleNotif}
          className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-text-muted hover:text-text-secondary hover:bg-border/50 transition-all group relative"
        >
          <div className="relative flex-shrink-0">
            <Bell size={16} />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-accent text-white text-[8px] font-bold rounded-full flex items-center justify-center">
                {unreadCount}
              </span>
            )}
          </div>
          {!sidebarCollapsed && <span className="text-xs font-medium">Notifications</span>}
          {sidebarCollapsed && (
            <span className="absolute left-full ml-3 px-2 py-1 bg-raised border border-border text-text-primary text-xs rounded-lg opacity-0 group-hover:opacity-100 pointer-events-none whitespace-nowrap z-50 transition-opacity">
              Notifications {unreadCount > 0 ? `(${unreadCount})` : ''}
            </span>
          )}
        </button>

        <button
          onClick={() => setPage('profile')}
          className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-all group relative
            ${currentPage === 'profile' ? 'bg-accent/10 text-accent' : 'text-text-muted hover:text-text-secondary hover:bg-border/50'}`}
        >
          <User size={16} className="flex-shrink-0" />
          {!sidebarCollapsed && <span className="text-xs font-medium">Profile</span>}
          {sidebarCollapsed && (
            <span className="absolute left-full ml-3 px-2 py-1 bg-raised border border-border text-text-primary text-xs rounded-lg opacity-0 group-hover:opacity-100 pointer-events-none whitespace-nowrap z-50 transition-opacity">Profile</span>
          )}
        </button>

        <button className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-text-muted hover:text-text-secondary hover:bg-border/50 transition-all group relative">
          <Settings size={16} className="flex-shrink-0" />
          {!sidebarCollapsed && <span className="text-xs font-medium">Settings</span>}
          {sidebarCollapsed && (
            <span className="absolute left-full ml-3 px-2 py-1 bg-raised border border-border text-text-primary text-xs rounded-lg opacity-0 group-hover:opacity-100 pointer-events-none whitespace-nowrap z-50 transition-opacity">Settings</span>
          )}
        </button>

        <button className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-red/70 hover:text-red hover:bg-red/5 transition-all group relative">
          <LogOut size={16} className="flex-shrink-0" />
          {!sidebarCollapsed && <span className="text-xs font-medium">Log out</span>}
          {sidebarCollapsed && (
            <span className="absolute left-full ml-3 px-2 py-1 bg-raised border border-border text-text-primary text-xs rounded-lg opacity-0 group-hover:opacity-100 pointer-events-none whitespace-nowrap z-50 transition-opacity">Log out</span>
          )}
        </button>
      </div>

      {/* User strip */}
      {!sidebarCollapsed && user && (
        <div className="px-3 py-3 border-t border-border flex items-center gap-2.5 flex-shrink-0">
          <div
            className="w-7 h-7 rounded-lg flex items-center justify-center text-[10px] font-bold flex-shrink-0"
            style={{ background: user.avatarBg, color: user.avatarColor }}
          >
            {user.avatar}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-medium text-text-secondary truncate">{user.firstName}</p>
            <p className="text-[10px] text-text-muted font-mono truncate">{user.studentId}</p>
          </div>
        </div>
      )}
    </aside>
  );
};

export default Sidebar;