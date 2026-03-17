import {
  Bell,
  ChevronDown, ChevronRight,
  ChevronsLeft, ChevronsRight,
  LayoutGrid,
  LogOut,
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
      className="flex flex-col h-screen border-r relative z-20 transition-all duration-300 ease-in-out flex-shrink-0"
      style={{
        width:       sidebarCollapsed ? 64 : 240,
        background:  'var(--sidebar-bg)',
        borderColor: 'var(--border)',
      }}
    >
      {/* ── Logo + collapse button ─── */}
      <div
        className="flex items-center h-14 px-3 gap-2 flex-shrink-0"
        style={{ borderBottom: '1px solid var(--border)' }}
      >
        {/* Logo mark */}
        <div className="w-7 h-7 rounded-lg bg-accent flex items-center justify-center flex-shrink-0">
          <span className="text-xs font-mono font-bold text-white">U</span>
        </div>

        {/* Title — hidden when collapsed */}
        {!sidebarCollapsed && (
          <div className="flex-1 min-w-0 overflow-hidden">
            <p className="text-sm font-semibold leading-none" style={{ color: 'var(--text-bright)' }}>StudyPortal</p>
            <p className="text-[10px] font-mono mt-0.5" style={{ color: 'var(--text-muted)' }}>v2.0 · campus OS</p>
          </div>
        )}

        {/* Collapse toggle — chevron button flush in header */}
        <button
          onClick={toggleSidebar}
          className="ml-auto w-7 h-7 rounded-lg flex items-center justify-center transition-all hover:opacity-80 flex-shrink-0"
          style={{ background: 'var(--border)', color: 'var(--text-dim)' }}
          title={sidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {sidebarCollapsed
            ? <ChevronsRight size={13} />
            : <ChevronsLeft  size={13} />
          }
        </button>
      </div>

      {/* ── Dashboard link ─── */}
      <div className="px-2 pt-3 pb-1 flex-shrink-0">
        <button
          onClick={() => setPage('dashboard')}
          className="w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-150 group relative"
          style={{
            color:      currentPage === 'dashboard' ? '#6C8EF5' : 'var(--text-dim)',
            background: currentPage === 'dashboard' ? 'rgba(108,142,245,0.08)' : 'transparent',
          }}
        >
          <LayoutGrid size={16} className="flex-shrink-0" />
          {!sidebarCollapsed && <span className="text-xs font-medium">Dashboard</span>}
          {sidebarCollapsed && (
            <span className="absolute left-full ml-3 px-2 py-1 rounded-lg text-xs opacity-0 group-hover:opacity-100 pointer-events-none whitespace-nowrap z-50 transition-opacity"
              style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', color: 'var(--text-bright)' }}>
              Dashboard
            </span>
          )}
        </button>
      </div>

      {!sidebarCollapsed && (
        <p className="text-[10px] font-mono px-5 pt-3 pb-1 uppercase tracking-widest"
          style={{ color: 'var(--text-muted)' }}>Apps</p>
      )}

      {/* ── Scrollable nav ─── */}
      <nav className="flex-1 overflow-y-auto px-2 space-y-0.5 pb-2">
        {categoryMeta.map(cat => {
          const catApps    = navApps(cat.id);
          const isExpanded = expandedCats.includes(cat.id);
          const hasActive  = activeApp?.category === cat.id;

          return (
            <div key={cat.id}>
              <button
                onClick={() => !sidebarCollapsed && toggleCat(cat.id)}
                className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg transition-all duration-150 group relative"
                style={{ color: hasActive ? 'var(--text-soft)' : 'var(--text-dim)' }}
              >
                <span className="text-sm flex-shrink-0">{cat.icon}</span>
                {!sidebarCollapsed && (
                  <>
                    <span className="text-xs font-medium flex-1 text-left">{cat.label}</span>
                    <span className="text-[10px]" style={{ color: 'var(--text-muted)' }}>{catApps.length}</span>
                    {isExpanded
                      ? <ChevronDown  size={12} className="flex-shrink-0" style={{ color: 'var(--text-muted)' }} />
                      : <ChevronRight size={12} className="flex-shrink-0" style={{ color: 'var(--text-muted)' }} />
                    }
                  </>
                )}
                {sidebarCollapsed && (
                  <span className="absolute left-full ml-3 px-2 py-1 rounded-lg text-xs opacity-0 group-hover:opacity-100 pointer-events-none whitespace-nowrap z-50 transition-opacity"
                    style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', color: 'var(--text-bright)' }}>
                    {cat.label}
                  </span>
                )}
              </button>

              {!sidebarCollapsed && isExpanded && (
                <div className="ml-2 pl-3 space-y-0.5 mb-1"
                  style={{ borderLeft: '1px solid var(--border)' }}>
                  {catApps.map(app => (
                    <button
                      key={app.id}
                      onClick={() => openApp(app)}
                      className="w-full flex items-center gap-2.5 px-2 py-1.5 rounded-md transition-all duration-150"
                      style={{
                        color:      activeApp?.id === app.id ? '#6C8EF5' : 'var(--text-dim)',
                        background: activeApp?.id === app.id ? 'rgba(108,142,245,0.08)' : 'transparent',
                      }}
                    >
                      <span className="text-sm leading-none">{app.icon}</span>
                      <span className="text-xs flex-1 text-left truncate">{app.name}</span>
                      <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${
                        app.status === 'online'   ? 'bg-green animate-pulse-dot' :
                        app.status === 'degraded' ? 'bg-amber' : ''
                      }`}
                        style={app.status === 'offline' ? { background: 'var(--text-muted)' } : {}}
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </nav>

      {/* ── Bottom actions (no Settings) ─── */}
      <div className="px-2 py-2 space-y-0.5 flex-shrink-0"
        style={{ borderTop: '1px solid var(--border)' }}>

        {/* Notifications */}
        <button
          onClick={toggleNotif}
          className="w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-all group relative"
          style={{ color: 'var(--text-dim)' }}
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
            <span className="absolute left-full ml-3 px-2 py-1 rounded-lg text-xs opacity-0 group-hover:opacity-100 pointer-events-none whitespace-nowrap z-50 transition-opacity"
              style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', color: 'var(--text-bright)' }}>
              Notifications {unreadCount > 0 ? `(${unreadCount})` : ''}
            </span>
          )}
        </button>

        {/* Profile */}
        <button
          onClick={() => setPage('profile')}
          className="w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-all group relative"
          style={{
            color:      currentPage === 'profile' ? '#6C8EF5' : 'var(--text-dim)',
            background: currentPage === 'profile' ? 'rgba(108,142,245,0.08)' : 'transparent',
          }}
        >
          <User size={16} className="flex-shrink-0" />
          {!sidebarCollapsed && <span className="text-xs font-medium">Profile</span>}
          {sidebarCollapsed && (
            <span className="absolute left-full ml-3 px-2 py-1 rounded-lg text-xs opacity-0 group-hover:opacity-100 pointer-events-none whitespace-nowrap z-50 transition-opacity"
              style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', color: 'var(--text-bright)' }}>
              Profile
            </span>
          )}
        </button>

        {/* Log out */}
        <button className="w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-all group relative hover:bg-red/5"
          style={{ color: '#F87171' }}>
          <LogOut size={16} className="flex-shrink-0" />
          {!sidebarCollapsed && <span className="text-xs font-medium">Log out</span>}
          {sidebarCollapsed && (
            <span className="absolute left-full ml-3 px-2 py-1 rounded-lg text-xs opacity-0 group-hover:opacity-100 pointer-events-none whitespace-nowrap z-50 transition-opacity"
              style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', color: 'var(--text-bright)' }}>
              Log out
            </span>
          )}
        </button>
      </div>

      {/* ── User strip ─── */}
      {!sidebarCollapsed && user && (
        <div className="px-3 py-3 flex items-center gap-2.5 flex-shrink-0"
          style={{ borderTop: '1px solid var(--border)' }}>
          <div
            className="w-7 h-7 rounded-lg flex items-center justify-center text-[10px] font-bold flex-shrink-0"
            style={{ background: user.avatarBg, color: user.avatarColor }}
          >
            {user.avatar}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-medium truncate" style={{ color: 'var(--text-soft)' }}>{user.firstName}</p>
            <p className="text-[10px] font-mono truncate" style={{ color: 'var(--text-muted)' }}>{user.studentId}</p>
          </div>
        </div>
      )}
    </aside>
  );
};

export default Sidebar;