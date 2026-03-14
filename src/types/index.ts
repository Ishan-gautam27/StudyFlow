export type AppCategory = 'academic' | 'campus-life' | 'services' | 'community' | 'official';
export type AppType     = 'iframe' | 'external' | 'coming-soon';
export type AppStatus   = 'online' | 'offline' | 'degraded';

export interface MiniApp {
  id:          string;
  name:        string;
  description: string;
  icon:        string;
  category:    AppCategory;
  type:        AppType;
  url?:        string;
  status:      AppStatus;
  color:       string;
  bgColor:     string;
  tags:        string[];
  pinned?:     boolean;
  new?:        boolean;
}

export interface CategoryMeta {
  id:    AppCategory;
  label: string;
  icon:  string;
  color: string;
}

export interface User {
  id:          string;
  name:        string;
  firstName:   string;
  email:       string;
  studentId:   string;
  department:  string;
  year:        string;
  avatar:      string;
  avatarColor: string;
  avatarBg:    string;
  role:        'student' | 'faculty' | 'admin';
}

// ── Fixed: matches mockData.ts and Topbar.tsx ──────────────────────────────
export interface Notification {
  id:      string;
  appId:   string;
  appName: string;
  appIcon: string;
  title:   string;
  body:    string;
  time:    string;
  read:    boolean;
  type:    'info' | 'success' | 'warning' | 'error';
} 

// ── Added: were missing, causing mockData.ts import errors ─────────────────
export interface Subject {
  id:                string;
  name:              string;
  teacher:           string;
  chapters:          number;
  completedChapters: number;
  color:             string;
  bgColor:           string;
  emoji:             string;
  nextClass:         string;
  assignments:       number;
}

export interface Assignment {
  id:           string;
  title:        string;
  subject:      string;
  subjectColor: string;
  dueDate:      string;
  dueLabel:     string;
  urgency:      'today' | 'soon' | 'upcoming';
  done:         boolean;
  type:         'quiz' | 'essay' | 'lab' | 'project';
}

export interface ScheduleItem {
  id:        string;
  subject:   string;
  teacher:   string;
  room:      string;
  startTime: string;
  endTime:   string;
  color:     string;
  bgColor:   string;
  day:       string;
}

export interface Member {
  id:          string;
  name:        string;
  role:        'Teacher' | 'Student';
  subject?:    string;
  avatar:      string;
  avatarColor: string;
  avatarBg:    string;
  status:      'online' | 'away' | 'offline';
  joinedAgo:   string;
}