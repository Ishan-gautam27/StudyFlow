import {
  AlertTriangle,
  BookOpen,
  Calendar,
  CheckCircle2, Clock,
  ExternalLink, Flame,
  LayoutGrid,
  TrendingUp
} from 'lucide-react';
import React, { useState } from 'react';
import MagicBento from '../components/ui/MagicBento';
import { apps, currentUser, notifications } from '../data/apps';

const bentoApps = apps.filter(a => a.pinned && a.type !== 'coming-soon').slice(0, 6);

// ── Mock student productivity data ──────────────────────
const tasks = [
  { id: 1, title: 'Data Structures — Assignment 4',    subject: 'CS301',    due: 'Today',      status: 'overdue',  color: '#F87171' },
  { id: 2, title: 'DBMS Lab Report',                   subject: 'CS302',    due: 'Tomorrow',   status: 'pending',  color: '#FBBF24' },
  { id: 3, title: 'Linear Algebra Problem Set',         subject: 'MA201',    due: 'Mar 18',     status: 'pending',  color: '#FBBF24' },
  { id: 4, title: 'OS Mini Project — Proposal',         subject: 'CS304',    due: 'Mar 20',     status: 'pending',  color: '#6C8EF5' },
  { id: 5, title: 'Computer Networks Quiz',             subject: 'CS305',    due: 'Mar 22',     status: 'done',     color: '#34D399' },
  { id: 6, title: 'Technical Writing Assignment',       subject: 'HU101',    due: 'Mar 16',     status: 'done',     color: '#34D399' },
];

const weeklyHours = [
  { day: 'Mon', hours: 4.5 },
  { day: 'Tue', hours: 6.0 },
  { day: 'Wed', hours: 3.0 },
  { day: 'Thu', hours: 7.5 },
  { day: 'Fri', hours: 5.0 },
  { day: 'Sat', hours: 2.5 },
  { day: 'Sun', hours: 1.0 },
];

const subjects = [
  { name: 'Data Structures',    code: 'CS301', progress: 78, grade: 'A',  color: '#6C8EF5', credits: 4 },
  { name: 'Database Systems',   code: 'CS302', progress: 65, grade: 'B+', color: '#2DD4BF', credits: 4 },
  { name: 'Linear Algebra',     code: 'MA201', progress: 82, grade: 'A',  color: '#FBBF24', credits: 3 },
  { name: 'Operating Systems',  code: 'CS304', progress: 55, grade: 'B',  color: '#FB923C', credits: 4 },
  { name: 'Computer Networks',  code: 'CS305', progress: 90, grade: 'A+', color: '#34D399', credits: 3 },
];

const externalApps = apps.filter(a => a.type === 'external');

const maxHours = Math.max(...weeklyHours.map(d => d.hours));
const totalHours = weeklyHours.reduce((s, d) => s + d.hours, 0);
const doneTasks = tasks.filter(t => t.status === 'done').length;
const pendingTasks = tasks.filter(t => t.status === 'pending').length;
const overdueTasks = tasks.filter(t => t.status === 'overdue').length;
const avgGrade = 87;
const streak = 14;

// ── StatPill ────────────────────────────────────────────
const StatPill: React.FC<{
  label: string; value: string | number; sub?: string;
  icon: React.ElementType; color: string; bg: string;
}> = ({ label, value, sub, icon: Icon, color, bg }) => (
  <div className="bg-card border border-border rounded-xl p-4 flex flex-col gap-2">
    <div className="flex items-center justify-between">
      <p className="text-[10px] font-mono text-dim uppercase tracking-widest">{label}</p>
      <div className="w-6 h-6 rounded-lg flex items-center justify-center" style={{ background: bg }}>
        <Icon size={12} style={{ color }} />
      </div>
    </div>
    <p className="text-2xl font-semibold text-bright leading-none">{value}</p>
    {sub && <p className="text-[11px] text-dim">{sub}</p>}
  </div>
);

const Dashboard: React.FC = () => {
  const [taskFilter, setTaskFilter] = useState<'all' | 'pending' | 'done'>('all');
  const hour     = new Date().getHours();
  const greeting = hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening';
  const unread   = notifications.filter(n => !n.read).length;

  const filteredTasks = tasks.filter(t =>
    taskFilter === 'all'     ? true :
    taskFilter === 'pending' ? t.status !== 'done' :
                               t.status === 'done'
  );

  return (
    <div className="flex-1 overflow-y-auto">
      <div className="max-w-4xl mx-auto px-6 py-8 space-y-8">

        {/* ── Hero ───────────────────────────────── */}
        <div className="animate-slide-up">
          <p className="text-xs font-mono text-dim mb-1">{greeting},</p>
          <h1 className="text-2xl font-semibold text-bright">
            {currentUser.firstName}
            <span className="text-dim font-light"> · {currentUser.department}</span>
          </h1>
          <div className="flex items-center gap-3 mt-3 flex-wrap">
            <div className="flex items-center gap-1.5">
              <Flame size={12} className="text-orange-400" />
              <span className="text-xs font-mono text-dim">{streak} day streak</span>
            </div>
            <span className="text-border">·</span>
            <span className="text-xs font-mono text-dim">{currentUser.studentId}</span>
            <span className="text-border">·</span>
            <span className="text-xs font-mono text-dim">{currentUser.year}</span>
            {unread > 0 && (
              <>
                <span className="text-border">·</span>
                <span className="text-xs font-mono text-accent">{unread} new notifications</span>
              </>
            )}
          </div>
        </div>

        {/* ── Magic Bento ────────────────────────── */}
        <section className="animate-slide-up" style={{ animationDelay: '60ms' }}>
          <div className="flex items-center gap-2 mb-4">
            <LayoutGrid size={13} className="text-accent" />
            <h2 className="text-xs font-mono text-dim uppercase tracking-widest">Quick access</h2>
          </div>
          <MagicBento
            apps={bentoApps}
            textAutoHide={true}
            enableStars={true}
            enableSpotlight={true}
            enableBorderGlow={true}
            enableTilt={true}
            enableMagnetism={false}
            clickEffect={true}
            spotlightRadius={370}
            particleCount={10}
            glowColor="108, 142, 245"
            disableAnimations={false}
          />
        </section>

        {/* ── Stat pills ─────────────────────────── */}
        <section className="animate-slide-up grid grid-cols-2 lg:grid-cols-4 gap-3" style={{ animationDelay: '100ms' }}>
          <StatPill label="Completed"  value={doneTasks}    sub="tasks this week"  icon={CheckCircle2}  color="#34D399" bg="#34D39915" />
          <StatPill label="Pending"    value={pendingTasks} sub="assignments left"  icon={Clock}         color="#FBBF24" bg="#FBBF2415" />
          <StatPill label="Overdue"    value={overdueTasks} sub="needs attention"   icon={AlertTriangle} color="#F87171" bg="#F8717115" />
          <StatPill label="Avg grade"  value={`${avgGrade}%`} sub="across all subjects" icon={TrendingUp} color="#6C8EF5" bg="#6C8EF515" />
        </section>

        {/* ── Tasks + Time spent (2 col) ─────────── */}
        <section className="animate-slide-up grid grid-cols-1 lg:grid-cols-2 gap-6" style={{ animationDelay: '140ms' }}>

          {/* Tasks panel */}
          <div className="bg-card border border-border rounded-xl overflow-hidden">
            <div className="flex items-center justify-between px-4 pt-4 pb-3 border-b border-border">
              <div className="flex items-center gap-2">
                <CheckCircle2 size={13} className="text-accent" />
                <h3 className="text-xs font-mono text-dim uppercase tracking-widest">Tasks</h3>
              </div>
              {/* Filter tabs */}
              <div className="flex items-center gap-1 bg-base rounded-lg p-0.5">
                {(['all', 'pending', 'done'] as const).map(f => (
                  <button
                    key={f}
                    onClick={() => setTaskFilter(f)}
                    className={`text-[10px] font-mono px-2 py-1 rounded-md transition-all capitalize
                      ${taskFilter === f ? 'bg-border text-soft' : 'text-muted hover:text-dim'}`}
                  >
                    {f}
                  </button>
                ))}
              </div>
            </div>
            <div className="divide-y divide-border/50">
              {filteredTasks.map(task => (
                <div key={task.id} className="flex items-start gap-3 px-4 py-3 hover:bg-border/20 transition-colors">
                  <div className="mt-0.5 flex-shrink-0">
                    <div
                      className={`w-4 h-4 rounded-full border-2 flex items-center justify-center transition-all ${
                        task.status === 'done' ? 'border-green bg-green/20' : 'border-border'
                      }`}
                    >
                      {task.status === 'done' && <CheckCircle2 size={9} className="text-green" />}
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className={`text-xs leading-snug ${task.status === 'done' ? 'text-muted line-through' : 'text-soft'}`}>
                      {task.title}
                    </p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-[10px] font-mono text-muted">{task.subject}</span>
                      <span
                        className="text-[9px] font-mono px-1.5 py-0.5 rounded"
                        style={{ color: task.color, background: task.color + '18' }}
                      >
                        {task.due}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Time spent bar chart */}
          <div className="bg-card border border-border rounded-xl p-4">
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-2">
                <Clock size={13} className="text-accent" />
                <h3 className="text-xs font-mono text-dim uppercase tracking-widest">Time spent</h3>
              </div>
              <span className="text-[10px] font-mono text-dim">{totalHours.toFixed(1)} hrs this week</span>
            </div>
            <div className="flex items-end gap-2 h-32">
              {weeklyHours.map(({ day, hours }) => {
                const heightPct = (hours / maxHours) * 100;
                const isToday   = day === ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'][new Date().getDay()];
                return (
                  <div key={day} className="flex-1 flex flex-col items-center gap-1.5">
                    <span className="text-[9px] font-mono text-muted">{hours}h</span>
                    <div className="w-full flex items-end" style={{ height: 96 }}>
                      <div
                        className="w-full rounded-t-md transition-all duration-700"
                        style={{
                          height:     `${heightPct}%`,
                          background: isToday ? '#6C8EF5' : '#1E2535',
                          minHeight:  4,
                        }}
                      />
                    </div>
                    <span className={`text-[9px] font-mono ${isToday ? 'text-accent' : 'text-muted'}`}>{day}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ── Subject progress ───────────────────── */}
        <section className="animate-slide-up" style={{ animationDelay: '180ms' }}>
          <div className="flex items-center gap-2 mb-4">
            <BookOpen size={13} className="text-accent" />
            <h2 className="text-xs font-mono text-dim uppercase tracking-widest">Subject progress</h2>
          </div>
          <div className="bg-card border border-border rounded-xl overflow-hidden">
            {subjects.map((sub, i) => (
              <div
                key={sub.code}
                className={`flex items-center gap-4 px-4 py-3 hover:bg-border/20 transition-colors ${i < subjects.length - 1 ? 'border-b border-border/60' : ''}`}
              >
                <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 text-xs font-bold"
                  style={{ background: sub.color + '18', color: sub.color }}>
                  {sub.grade}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1.5">
                    <p className="text-xs font-medium text-soft truncate">{sub.name}</p>
                    <span className="text-[10px] font-mono text-dim ml-2 flex-shrink-0">{sub.progress}%</span>
                  </div>
                  <div className="h-1 bg-border rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-1000"
                      style={{ width: `${sub.progress}%`, background: sub.color }}
                    />
                  </div>
                </div>
                <div className="text-right flex-shrink-0">
                  <p className="text-[10px] font-mono text-muted">{sub.code}</p>
                  <p className="text-[10px] font-mono text-muted">{sub.credits} cr</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── Upcoming deadlines ─────────────────── */}
        <section className="animate-slide-up" style={{ animationDelay: '200ms' }}>
          <div className="flex items-center gap-2 mb-4">
            <Calendar size={13} className="text-accent" />
            <h2 className="text-xs font-mono text-dim uppercase tracking-widest">Upcoming deadlines</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {tasks.filter(t => t.status !== 'done').map(task => (
              <div key={task.id} className="bg-card border border-border rounded-xl p-4 flex flex-col gap-2 hover:border-border-bright transition-colors">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono text-muted">{task.subject}</span>
                  <span
                    className="text-[9px] font-mono font-semibold px-1.5 py-0.5 rounded"
                    style={{ color: task.color, background: task.color + '18' }}
                  >
                    {task.due}
                  </span>
                </div>
                <p className="text-xs text-soft leading-snug">{task.title}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── External services ──────────────────── */}
        {externalApps.length > 0 && (
          <section className="animate-slide-up" style={{ animationDelay: '220ms' }}>
            <div className="flex items-center gap-2 mb-4">
              <ExternalLink size={13} className="text-accent" />
              <h2 className="text-xs font-mono text-dim uppercase tracking-widest">External services</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {externalApps.map(app => (
                <a
                  key={app.id}
                  href={app.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 bg-card border border-border hover:border-border-bright rounded-xl px-4 py-3 transition-all group"
                >
                  <span className="text-xl">{app.icon}</span>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-soft group-hover:text-bright transition-colors">{app.name}</p>
                    <p className="text-[10px] font-mono text-muted truncate">{app.url}</p>
                  </div>
                  <ExternalLink size={12} className="text-muted group-hover:text-dim flex-shrink-0" />
                </a>
              ))}
            </div>
          </section>
        )}

        {/* ── Footer ─────────────────────────────── */}
        <div className="border-t border-border pt-6 pb-2 flex items-center justify-between">
          <p className="text-[10px] font-mono text-muted">UniPortal v2.0 · React + Docker</p>
          <p className="text-[10px] font-mono text-muted">
            {new Date().toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
          </p>
        </div>

      </div>
    </div>
  );
};

export default Dashboard;