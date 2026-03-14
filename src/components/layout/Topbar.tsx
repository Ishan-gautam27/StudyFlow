import { Bell, ChevronDown, MessageSquare, Search } from 'lucide-react';
import React, { useState } from 'react';
import { currentUser, notifications } from '../../data/mockData';

interface TopbarProps {
  pageTitle: string;
}

const Topbar: React.FC<TopbarProps> = ({ pageTitle }) => {
  const [showNotifs, setShowNotifs] = useState(false);
  const unread = notifications.filter(n => !n.read).length;

  const today = new Date().toLocaleDateString('en-IN', {
    weekday: 'long', day: 'numeric', month: 'long'
  });

  const notifTypeIcon: Record<string, string> = {
    success: '🏆', info: '📋', warning: '⏰', error: '🚨'
  };

  return (
    <header className="flex items-center gap-4 px-6 py-4 bg-surface border-b border-border sticky top-0 z-30">
      {/* Left: date + title */}
      <div className="flex-1">
        <p className="text-xs text-text-muted">{today}</p>
        <h1 className="font-sans font-semibold text-text-primary text-lg leading-tight">{pageTitle}</h1>
      </div>

      {/* Search */}
      <div className="flex items-center gap-2 bg-raised border border-border rounded-2xl px-3 py-2 w-56 focus-within:border-accent transition-all">
        <Search size={15} className="text-text-muted flex-shrink-0" />
        <input
          type="text"
          placeholder="Search anything..."
          className="bg-transparent text-sm text-text-primary placeholder-text-muted outline-none w-full"
        />
      </div>

      {/* Actions */}
      <div className="flex items-center gap-2">
        {/* Notifications */}
        <div className="relative">
          <button
            onClick={() => setShowNotifs(!showNotifs)}
            className="relative w-9 h-9 rounded-2xl bg-raised hover:bg-border-bright flex items-center justify-center transition-colors"
          >
            <Bell size={16} className="text-text-secondary" />
            {unread > 0 && (
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red rounded-full" />
            )}
          </button>

          {showNotifs && (
            <div className="absolute right-0 top-12 w-80 bg-raised rounded-3xl shadow-card border border-border p-2 z-50">
              <p className="text-xs font-semibold text-text-muted px-3 py-2 uppercase tracking-wide">Notifications</p>
              {notifications.map(n => (
                <div
                  key={n.id}
                  className={`flex gap-3 px-3 py-2.5 rounded-2xl hover:bg-border cursor-pointer transition-colors ${!n.read ? 'bg-accent/5' : ''}`}
                >
                  <span className="text-lg flex-shrink-0 mt-0.5">{n.appIcon}</span>
                  <div className="flex-1 min-w-0">
                    <p className="text-[13px] font-medium text-text-primary leading-snug">{n.title}</p>
                    <p className="text-[12px] text-text-secondary leading-snug">{n.body}</p>
                    <p className="text-[11px] text-text-muted mt-0.5">{n.time}</p>
                  </div>
                  {!n.read && <div className="w-1.5 h-1.5 bg-accent rounded-full mt-1.5 flex-shrink-0" />}
                </div>
              ))}
            </div>
          )}
        </div>

        <button className="w-9 h-9 rounded-2xl bg-raised hover:bg-border-bright flex items-center justify-center transition-colors">
          <MessageSquare size={16} className="text-text-secondary" />
        </button>

        {/* Avatar */}
        <button className="flex items-center gap-2 pl-1 pr-2 py-1 rounded-2xl hover:bg-raised transition-colors">
          <div
            className="w-8 h-8 rounded-2xl flex items-center justify-center text-xs font-semibold flex-shrink-0"
            style={{ background: currentUser.avatarBg, color: currentUser.avatarColor }}
          >
            {currentUser.avatar}
          </div>
          <div className="hidden md:block text-left">
            <p className="text-[13px] font-medium text-text-primary leading-tight">{currentUser.firstName}</p>
            <p className="text-[11px] text-text-muted">{currentUser.grade}</p>
          </div>
          <ChevronDown size={14} className="text-text-muted" />
        </button>
      </div>
    </header>
  );
};

export default Topbar;