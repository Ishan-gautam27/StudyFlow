import { create } from 'zustand';
import { currentUser, notifications as initialNotifs } from '../data/apps';
import { MiniApp, Notification, User } from '../types';

interface PortalStore {
  user:          User | null;
  isLoggedIn:    boolean;
  login:         (user: User) => void;
  logout:        () => void;
  activeApp:     MiniApp | null;
  openApp:       (app: MiniApp) => void;
  closeApp:      () => void;
  currentPage:   'dashboard' | 'app' | 'profile' | 'notifications';
  setPage:       (page: PortalStore['currentPage']) => void;
  searchOpen:    boolean;
  searchQuery:   string;
  openSearch:    () => void;
  closeSearch:   () => void;
  setSearchQuery:(q: string) => void;
  notifOpen:        boolean;
  notifications:    Notification[];
  unreadCount:      number;
  toggleNotif:      () => void;
  markAllRead:      () => void;
  markRead:         (id: string) => void;
  sidebarCollapsed: boolean;
  toggleSidebar:    () => void;
}

export const usePortalStore = create<PortalStore>((set, get) => ({
  user: null,
  isLoggedIn: false,
  login:  (user) => set({ user, isLoggedIn: true, currentPage: 'dashboard' }),
  logout: ()     => set({ user: null, isLoggedIn: false, activeApp: null, currentPage: 'dashboard' }),

  activeApp: null,
  openApp: (app) => {
    if (app.type === 'external' && app.url) {
      window.open(app.url, '_blank', 'noopener,noreferrer');
      return;
    }
    if (app.type === 'coming-soon') return;
    set({ activeApp: app, currentPage: 'app' });
  },
  closeApp: () => set({ activeApp: null, currentPage: 'dashboard' }),

  currentPage: 'dashboard',
 setPage: (page) => set({ currentPage: page, activeApp: null }),

  searchOpen:     false,
  searchQuery:    '',
  openSearch:     () => set({ searchOpen: true }),
  closeSearch:    () => set({ searchOpen: false, searchQuery: '' }),
  setSearchQuery: (q) => set({ searchQuery: q }),

  notifOpen:     false,
  notifications: initialNotifs,
  unreadCount:   initialNotifs.filter(n => !n.read).length,
  toggleNotif:   () => set(s => ({ notifOpen: !s.notifOpen })),
  markAllRead:   () => set(s => ({
    notifications: s.notifications.map(n => ({ ...n, read: true })),
    unreadCount:   0,
  })),
  markRead: (id) => set(s => {
    const updated = s.notifications.map(n => n.id === id ? { ...n, read: true } : n);
    return { notifications: updated, unreadCount: updated.filter(n => !n.read).length };
  }),

  sidebarCollapsed: false,
  toggleSidebar:    () => set(s => ({ sidebarCollapsed: !s.sidebarCollapsed })),
}));

// Auto-login with mock user for demo (remove in production)
usePortalStore.getState().login(currentUser);