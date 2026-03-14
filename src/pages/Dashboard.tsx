import { Pin, Zap } from 'lucide-react';
import React from 'react';
import AppLauncherCard from '../components/ui/AppLauncherCard';
import { apps, categoryMeta, currentUser, newApps, pinnedApps } from '../data/apps';

const Dashboard: React.FC = () => {
  const hour = new Date().getHours();
  const greeting = hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening';

  const onlineCount = apps.filter(a => a.status === 'online').length;
  const totalCount  = apps.filter(a => a.type !== 'coming-soon').length;

  return (
    <div className="flex-1 overflow-y-auto">
      <div className="max-w-5xl mx-auto px-6 py-8 space-y-10">

        {/* ── Hero greeting ──────────────────── */}
        <div className="animate-slide-up">
          <p className="text-xs font-mono text-dim mb-1">{greeting},</p>
          <h1 className="text-2xl font-semibold text-bright">
            {currentUser.firstName}
            <span className="text-dim font-light"> · {currentUser.department}</span>
          </h1>
          <div className="flex items-center gap-4 mt-3">
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-green animate-pulse-dot" />
              <span className="text-xs font-mono text-dim">
                {onlineCount}/{totalCount} services online
              </span>
            </div>
            <span className="text-border">·</span>
            <span className="text-xs font-mono text-dim">{currentUser.studentId}</span>
            <span className="text-border">·</span>
            <span className="text-xs font-mono text-dim">{currentUser.year}</span>
          </div>
        </div>

        {/* ── Pinned apps ────────────────────── */}
        {pinnedApps.length > 0 && (
          <section className="animate-slide-up" style={{ animationDelay: '60ms' }}>
            <div className="flex items-center gap-2 mb-4">
              <Pin size={13} className="text-accent" />
              <h2 className="text-xs font-mono text-dim uppercase tracking-widest">Pinned</h2>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
              {pinnedApps.map(app => (
                <AppLauncherCard key={app.id} app={app} />
              ))}
            </div>
          </section>
        )}

        {/* ── New / recently added ───────────── */}
        {newApps.length > 0 && (
          <section className="animate-slide-up" style={{ animationDelay: '100ms' }}>
            <div className="flex items-center gap-2 mb-4">
              <Zap size={13} className="text-accent" />
              <h2 className="text-xs font-mono text-dim uppercase tracking-widest">New this semester</h2>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
              {newApps.map(app => (
                <AppLauncherCard key={app.id} app={app} />
              ))}
            </div>
          </section>
        )}

        {/* ── All apps by category ───────────── */}
        {categoryMeta.map((cat, i) => {
          const catApps = apps.filter(a => a.category === cat.id);
          return (
            <section
              key={cat.id}
              className="animate-slide-up"
              style={{ animationDelay: `${140 + i * 50}ms` }}
            >
              {/* Section header */}
              <div className="flex items-center gap-3 mb-4">
                <span className="text-base">{cat.icon}</span>
                <h2 className="text-sm font-semibold text-soft">{cat.label}</h2>
                <div className="flex-1 h-px bg-border" />
                <span className="text-[10px] font-mono text-muted">
                  {catApps.filter(a => a.status === 'online').length} online
                </span>
              </div>

              {/* App grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
                {catApps.map(app => (
                  <AppLauncherCard key={app.id} app={app} />
                ))}
              </div>
            </section>
          );
        })}

        {/* ── Footer ─────────────────────────── */}
        <div className="border-t border-border pt-6 pb-2 flex items-center justify-between">
          <p className="text-[10px] font-mono text-muted">
            UniPortal v2.0 · {apps.length} apps · Built with React + Docker
          </p>
          <p className="text-[10px] font-mono text-muted">
            {new Date().toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
          </p>
        </div>

      </div>
    </div>
  );
};

export default Dashboard;