import { CheckCheck, X } from 'lucide-react';
import React from 'react';
import { usePortalStore } from '../../store/portalStore';

const typeColor: Record<string, string> = {
  success: '#34D399', info: '#6C8EF5', warning: '#FBBF24', error: '#F87171'
};
const typeBg: Record<string, string> = {
  success: '#34D39910', info: '#6C8EF510', warning: '#FBBF2410', error: '#F8717110'
};

const NotificationsDrawer: React.FC = () => {
  const { notifOpen, toggleNotif, notifications, markAllRead, markRead } = usePortalStore();
  if (!notifOpen) return null;

  const unread = notifications.filter(n => !n.read);
  const read   = notifications.filter(n =>  n.read);

  return (
    <>
      <div className="fixed inset-0 z-40 bg-black/30" onClick={toggleNotif} />
      <div
        className="fixed right-0 top-0 bottom-0 w-80 z-50 flex flex-col animate-slide-in-r"
        style={{ background: 'var(--sidebar-bg)', borderLeft: '1px solid var(--border)' }}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-4 h-14 flex-shrink-0"
          style={{ borderBottom: '1px solid var(--border)' }}>
          <div className="flex items-center gap-2">
            <p className="text-sm font-semibold" style={{ color: 'var(--text-bright)' }}>Notifications</p>
            {unread.length > 0 && (
              <span className="text-[10px] font-mono bg-accent/15 text-accent px-1.5 py-0.5 rounded-full">
                {unread.length} new
              </span>
            )}
          </div>
          <div className="flex items-center gap-2">
            {unread.length > 0 && (
              <button onClick={markAllRead}
                className="flex items-center gap-1 text-[11px] transition-colors hover:text-accent"
                style={{ color: 'var(--text-dim)' }}>
                <CheckCheck size={13} /><span>All read</span>
              </button>
            )}
            <button onClick={toggleNotif}
              className="w-7 h-7 rounded-lg flex items-center justify-center transition-all hover:opacity-80"
              style={{ color: 'var(--text-dim)' }}>
              <X size={14} />
            </button>
          </div>
        </div>

        {/* List */}
        <div className="flex-1 overflow-y-auto">
          {unread.length > 0 && (
            <>
              <p className="text-[10px] font-mono px-4 pt-4 pb-2 uppercase tracking-widest" style={{ color: 'var(--text-muted)' }}>New</p>
              {unread.map(n => (
                <div key={n.id} onClick={() => markRead(n.id)}
                  className="flex gap-3 px-4 py-3 cursor-pointer transition-colors hover:opacity-90"
                  style={{ background: typeBg[n.type], borderBottom: '1px solid var(--border)' }}>
                  <span className="text-lg flex-shrink-0 mt-0.5">{n.appIcon}</span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <p className="text-xs font-semibold leading-snug" style={{ color: 'var(--text-bright)' }}>{n.title}</p>
                      <span className="w-2 h-2 rounded-full flex-shrink-0 mt-1" style={{ background: typeColor[n.type] }} />
                    </div>
                    <p className="text-[11px] leading-snug mt-0.5" style={{ color: 'var(--text-dim)' }}>{n.body}</p>
                    <div className="flex items-center gap-2 mt-1.5">
                      <span className="text-[10px] font-mono" style={{ color: 'var(--text-muted)' }}>{n.time}</span>
                      <span style={{ color: 'var(--text-muted)' }}>·</span>
                      <span className="text-[10px]" style={{ color: 'var(--text-dim)' }}>{n.appName}</span>
                    </div>
                  </div>
                </div>
              ))}
            </>
          )}

          {read.length > 0 && (
            <>
              <p className="text-[10px] font-mono px-4 pt-4 pb-2 uppercase tracking-widest" style={{ color: 'var(--text-muted)' }}>Earlier</p>
              {read.map(n => (
                <div key={n.id} className="flex gap-3 px-4 py-3 cursor-pointer transition-colors opacity-50 hover:opacity-70"
                  style={{ borderBottom: '1px solid var(--border)' }}>
                  <span className="text-lg flex-shrink-0 mt-0.5">{n.appIcon}</span>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-medium leading-snug" style={{ color: 'var(--text-soft)' }}>{n.title}</p>
                    <p className="text-[11px] leading-snug mt-0.5 line-clamp-2" style={{ color: 'var(--text-dim)' }}>{n.body}</p>
                    <div className="flex items-center gap-2 mt-1.5">
                      <span className="text-[10px] font-mono" style={{ color: 'var(--text-muted)' }}>{n.time}</span>
                      <span style={{ color: 'var(--text-muted)' }}>·</span>
                      <span className="text-[10px]" style={{ color: 'var(--text-dim)' }}>{n.appName}</span>
                    </div>
                  </div>
                </div>
              ))}
            </>
          )}

          {notifications.length === 0 && (
            <div className="flex flex-col items-center justify-center h-40 gap-2">
              <span className="text-3xl">🎉</span>
              <p className="text-sm" style={{ color: 'var(--text-dim)' }}>You're all caught up!</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default NotificationsDrawer;