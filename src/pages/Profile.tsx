import { BookOpen, Calendar, Hash, Mail, Shield } from 'lucide-react';
import React from 'react';
import { apps } from '../data/apps';
import { usePortalStore } from '../store/portalStore';

const Profile: React.FC = () => {
  const { user } = usePortalStore();
  if (!user) return null;

  const recentApps = apps.filter(a => a.pinned).slice(0, 4);

  const card = "rounded-2xl p-5 mb-4";
  const cardStyle = { background: 'var(--bg-card)', border: '1px solid var(--border)', boxShadow: 'var(--shadow-card)' };

  return (
    <div className="flex-1 overflow-y-auto">
      <div className="max-w-2xl mx-auto px-6 py-8 animate-slide-up">

        {/* Header */}
        <div className={card} style={cardStyle}>
          <div className="flex items-start gap-5">
            <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-xl font-bold flex-shrink-0"
              style={{ background: user.avatarBg, color: user.avatarColor, border: `1px solid ${user.avatarColor}30` }}>
              {user.avatar}
            </div>
            <div className="flex-1">
              <div className="flex items-start justify-between">
                <div>
                  <h1 className="text-lg font-semibold" style={{ color: 'var(--text-bright)' }}>{user.name}</h1>
                  <p className="text-sm mt-0.5" style={{ color: 'var(--text-dim)' }}>{user.department}</p>
                </div>
                <span className="text-[10px] font-mono px-2 py-1 rounded-lg bg-green/10 text-green border border-green/20">
                  Active student
                </span>
              </div>
              <div className="grid grid-cols-2 gap-3 mt-4">
                {[
                  { icon: Mail,     label: 'Email',      value: user.email      },
                  { icon: Hash,     label: 'Student ID', value: user.studentId  },
                  { icon: BookOpen, label: 'Department', value: user.department },
                  { icon: Calendar, label: 'Year',       value: user.year       },
                ].map(({ icon: Icon, label, value }) => (
                  <div key={label} className="flex items-center gap-2">
                    <Icon size={13} className="flex-shrink-0" style={{ color: 'var(--text-muted)' }} />
                    <div>
                      <p className="text-[10px] font-mono" style={{ color: 'var(--text-muted)' }}>{label}</p>
                      <p className="text-xs truncate" style={{ color: 'var(--text-soft)' }}>{value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Portal access */}
        <div className={card} style={cardStyle}>
          <div className="flex items-center gap-2 mb-4">
            <Shield size={14} className="text-accent" />
            <h2 className="text-sm font-semibold" style={{ color: 'var(--text-soft)' }}>Portal Access</h2>
          </div>
          <div className="space-y-2">
            {['Academic apps', 'Campus services', 'Community features', 'Official portal links'].map(item => (
              <div key={item} className="flex items-center justify-between py-2"
                style={{ borderBottom: '1px solid var(--border)' }}>
                <span className="text-xs" style={{ color: 'var(--text-dim)' }}>{item}</span>
                <span className="text-[10px] font-mono bg-green/10 text-green px-2 py-0.5 rounded">enabled</span>
              </div>
            ))}
          </div>
        </div>

        {/* Pinned apps */}
        <div className={card} style={cardStyle}>
          <h2 className="text-sm font-semibold mb-4" style={{ color: 'var(--text-soft)' }}>Pinned Apps</h2>
          <div className="grid grid-cols-2 gap-3">
            {recentApps.map(app => (
              <div key={app.id} className="flex items-center gap-3 p-3 rounded-xl transition-colors cursor-pointer"
                style={{ border: '1px solid var(--border)', background: 'var(--bg-surface)' }}>
                <span className="text-lg">{app.icon}</span>
                <div>
                  <p className="text-xs font-medium" style={{ color: 'var(--text-soft)' }}>{app.name}</p>
                  <div className="flex items-center gap-1 mt-0.5">
                    <span className={`w-1.5 h-1.5 rounded-full ${app.status === 'online' ? 'bg-green' : 'bg-muted'}`} />
                    <span className="text-[10px] font-mono" style={{ color: 'var(--text-muted)' }}>{app.status}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default Profile;