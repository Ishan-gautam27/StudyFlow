import { CategoryMeta, MiniApp, Notification, User } from '../types';

export const categoryMeta: CategoryMeta[] = [
  { id: 'academic',    label: 'Academic',    icon: '🎓', color: '#6C8EF5' },
  { id: 'campus-life', label: 'Campus Life', icon: '🏕️', color: '#2DD4BF' },
  { id: 'services',    label: 'Services',    icon: '🛠️', color: '#FBBF24' },
  { id: 'community',   label: 'Community',   icon: '👥', color: '#FB923C' },
  { id: 'official',    label: 'Official',    icon: '🏛️', color: '#A78BFA' },
];

export const apps: MiniApp[] = [
  // ACADEMIC
  { id:'notes',      name:'Notes',         description:'Markdown notes, folders & tags',   icon:'📝', category:'academic',    type:'iframe',       url:'http://localhost:3001', status:'online',  color:'#6C8EF5', bgColor:'#6C8EF508', tags:['notes','markdown','study'],       pinned:true  },
  { id:'timetable',  name:'Timetable',     description:'Your weekly class schedule',        icon:'🗓️', category:'academic',    type:'iframe',       url:'http://localhost:3002', status:'online',  color:'#6C8EF5', bgColor:'#6C8EF508', tags:['schedule','classes'],             pinned:true  },
  { id:'grades',     name:'Grades',        description:'Results, GPA & transcript',         icon:'📊', category:'academic',    type:'iframe',       url:'http://localhost:3003', status:'online',  color:'#6C8EF5', bgColor:'#6C8EF508', tags:['grades','results','gpa']                      },
  { id:'assignments',name:'Assignments',   description:'Tasks, submissions & deadlines',    icon:'📋', category:'academic',    type:'iframe',       url:'http://localhost:3004', status:'degraded',color:'#6C8EF5', bgColor:'#6C8EF508', tags:['assignments','tasks','deadlines']             },
  { id:'library',    name:'Library',       description:'Search books & reserve seats',      icon:'📚', category:'academic',    type:'iframe',       url:'http://localhost:3005', status:'online',  color:'#6C8EF5', bgColor:'#6C8EF508', tags:['library','books']                             },
  // CAMPUS LIFE
  { id:'food-guide', name:'Food Guide',    description:'Canteen menus, hours & ratings',    icon:'🍜', category:'campus-life', type:'iframe',       url:'http://localhost:3010', status:'online',  color:'#2DD4BF', bgColor:'#2DD4BF08', tags:['food','canteen','menu'],          pinned:true, new:true },
  { id:'events',     name:'Events',        description:'Campus events & workshops',         icon:'🎉', category:'campus-life', type:'iframe',       url:'http://localhost:3011', status:'online',  color:'#2DD4BF', bgColor:'#2DD4BF08', tags:['events','workshops']                          },
  { id:'campus-map', name:'Campus Map',    description:'Buildings, rooms & navigation',     icon:'🗺️', category:'campus-life', type:'iframe',       url:'http://localhost:3012', status:'online',  color:'#2DD4BF', bgColor:'#2DD4BF08', tags:['map','buildings','rooms']                     },
  { id:'clubs',      name:'Clubs',         description:'Browse & join student clubs',       icon:'🎭', category:'campus-life', type:'coming-soon',  url:undefined,              status:'offline', color:'#2DD4BF', bgColor:'#2DD4BF08', tags:['clubs','societies']                           },
  // SERVICES
  { id:'lost-found', name:'Lost & Found',  description:'Report & claim lost items',         icon:'🔍', category:'services',    type:'iframe',       url:'http://localhost:3020', status:'online',  color:'#FBBF24', bgColor:'#FBBF2408', tags:['lost','found','items'],           pinned:true, new:true },
  { id:'transport',  name:'Transport',     description:'Bus & shuttle schedules',           icon:'🚌', category:'services',    type:'iframe',       url:'http://localhost:3021', status:'online',  color:'#FBBF24', bgColor:'#FBBF2408', tags:['bus','shuttle','transport']                   },
  { id:'helpdesk',   name:'Helpdesk',      description:'Raise IT & admin tickets',          icon:'🎫', category:'services',    type:'iframe',       url:'http://localhost:3022', status:'online',  color:'#FBBF24', bgColor:'#FBBF2408', tags:['helpdesk','tickets','support']                },
  { id:'printing',   name:'Print Queue',   description:'Campus printing & photocopying',    icon:'🖨️', category:'services',    type:'coming-soon',  url:undefined,              status:'offline', color:'#FBBF24', bgColor:'#FBBF2408', tags:['print']                                       },
  // COMMUNITY
  { id:'forum',      name:'Forum',         description:'Q&A, discussions & help threads',  icon:'💬', category:'community',   type:'iframe',       url:'http://localhost:3030', status:'online',  color:'#FB923C', bgColor:'#FB923C08', tags:['forum','discussion','QA']                     },
  { id:'marketplace',name:'Marketplace',   description:'Buy & sell textbooks and gear',     icon:'🛒', category:'community',   type:'iframe',       url:'http://localhost:3031', status:'online',  color:'#FB923C', bgColor:'#FB923C08', tags:['marketplace','buy','sell'],       new:true     },
  { id:'study-groups',name:'Study Groups', description:'Form or join study groups',         icon:'🧠', category:'community',   type:'iframe',       url:'http://localhost:3032', status:'online',  color:'#FB923C', bgColor:'#FB923C08', tags:['study','groups']                              },
  { id:'roommates',  name:'Roommates',     description:'Housing match & roommate finder',   icon:'🏠', category:'community',   type:'coming-soon',  url:undefined,              status:'offline', color:'#FB923C', bgColor:'#FB923C08', tags:['housing','roommate']                          },
  // OFFICIAL
  { id:'uni-portal', name:'Uni Portal',    description:'Official university portal',        icon:'🏛️', category:'official',    type:'external',     url:'https://university.edu/portal',   status:'online',  color:'#A78BFA', bgColor:'#A78BFA08', tags:['official','university'], pinned:true },
  { id:'notices',    name:'Notices',       description:'Official announcements & circulars',icon:'📢', category:'official',    type:'iframe',       url:'http://localhost:3041', status:'online',  color:'#A78BFA', bgColor:'#A78BFA08', tags:['notices','announcements']                     },
  { id:'finance',    name:'Finance',       description:'Fee status, receipts & dues',       icon:'💳', category:'official',    type:'external',     url:'https://university.edu/finance',  status:'online',  color:'#A78BFA', bgColor:'#A78BFA08', tags:['fees','finance','payment']               },
  { id:'digital-id', name:'Digital ID',   description:'Your digital student card',          icon:'🪪', category:'official',    type:'iframe',       url:'http://localhost:3042', status:'online',  color:'#A78BFA', bgColor:'#A78BFA08', tags:['ID','card','identity']                        },
];

export const currentUser: User = {
  id: 'u001', name: 'Aryan Sharma', firstName: 'Aryan',
  email: 'aryan.sharma@university.edu', studentId: 'CS21B042',
  department: 'Computer Science & Engineering', year: '3rd Year',
  avatar: 'AS', avatarColor: '#6C8EF5', avatarBg: '#6C8EF518', role: 'student',
};

export const notifications: Notification[] = [
  { id:'n1', appId:'grades',      appName:'Grades',      appIcon:'📊', title:'Mid-sem results published',     body:'Your Data Structures score: 87/100',                             time:'5 min ago',  read:false, type:'success' },
  { id:'n2', appId:'lost-found',  appName:'Lost & Found',appIcon:'🔍', title:'Item match found',              body:'A blue JanSport bag near Block C matches your report',           time:'1 hr ago',   read:false, type:'info'    },
  { id:'n3', appId:'assignments', appName:'Assignments', appIcon:'📋', title:'Deadline reminder',             body:'OS Lab report due in 6 hours',                                   time:'2 hrs ago',  read:false, type:'warning' },
  { id:'n4', appId:'notices',     appName:'Notices',     appIcon:'📢', title:'Campus closed — Republic Day',  body:'All offices will remain closed on January 26th',                 time:'Yesterday',  read:true,  type:'info'    },
  { id:'n5', appId:'food-guide',  appName:'Food Guide',  appIcon:'🍜', title:'Canteen C closed today',        body:'Due to annual maintenance. Canteen A & B open normally.',         time:'Yesterday',  read:true,  type:'warning' },
  { id:'n6', appId:'helpdesk',    appName:'Helpdesk',    appIcon:'🎫', title:'Ticket #4421 resolved',         body:'Your WiFi access issue has been fixed',                           time:'2 days ago', read:true,  type:'success' },
];

export const pinnedApps       = apps.filter(a => a.pinned);
export const newApps          = apps.filter(a => a.new);
export const appsByCategory   = (cat: string) => apps.filter(a => a.category === cat);