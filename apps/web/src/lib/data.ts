import type { AppData, User } from './types';

const now = new Date();

export const allUsers: User[] = [
  { 
    id: 'u_me', name: 'Madhav', handle: 'madhav', 
    bio: 'Building for Bharat | 🇮🇳',
    coverUrl: 'https://picsum.photos/id/1015/1000/300',
    followers: 4800,
    following: new Set(['u2', 'u5']),
  },
  {
    id: 'u1', name: 'Asha Sharma', handle: 'asha_sharma',
    bio: 'Photographer capturing the soul of India. DM for collaborations.',
    coverUrl: 'https://picsum.photos/id/10/1000/300',
    followers: 12000,
    following: new Set(['u_me', 'u3']),
  },
  {
    id: 'u2', name: 'Ravi Kumar', handle: 'ravi_k',
    bio: 'Tech enthusiast & developer. Love creating open-source projects. #DevInHindi',
    coverUrl: 'https://picsum.photos/id/1005/1000/300',
    followers: 89000,
    following: new Set(['u4', 'u5', 'u_me']),
  },
  {
    id: 'u3', name: 'Neel Mehta', handle: 'neel_mehta',
    bio: 'Exploring the flavors of India, one dish at a time. Food blogger & chef.',
    coverUrl: 'https://picsum.photos/id/1080/1000/300',
    followers: 22500,
    following: new Set(['u1']),
  },
  {
    id: 'u4', name: 'Anil Desai', handle: 'anil_desai',
    bio: 'Spiritual seeker. Sharing thoughts on dharma and meditation. 🙏',
    coverUrl: 'https://picsum.photos/id/142/1000/300',
    followers: 5600,
    following: new Set(['u2', 'u6']),
  },
  {
    id: 'u5', name: 'Meena Joshi', handle: 'meenajoshi',
    bio: 'Art director & designer. Passionate about traditional Indian art forms.',
    coverUrl: 'https://picsum.photos/id/15/1000/300',
    followers: 150000,
    following: new Set(['u_me', 'u1', 'u7']),
  },
  {
    id: 'u6', name: 'Arjun Singh', handle: 'arjun_s',
    bio: 'Student at IIT Delhi. Into competitive programming and AI.',
    coverUrl: 'https://picsum.photos/id/218/1000/300',
    followers: 1250,
    following: new Set(['u2']),
  },
  {
    id: 'u7', name: 'Priya Patel', handle: 'priyapatel',
    bio: 'Startup founder. Building the next big thing in Indian fintech. #StartupIndia',
    coverUrl: 'https://picsum.photos/id/349/1000/300',
    followers: 78000,
    following: new Set(['u2', 'u_me']),
  }
];

const mainUser = allUsers.find(u => u.id === 'u_me')!;

export const initialData: AppData = {
  isAdmin: true,
  quietHours: false,
  dataSaver: false,
  user: { ...mainUser, friends: 120 },
  allUsers,
  bookmarks: new Set(['p2']),
  likes: new Set(['p1', 'p7']),
  notifs: [],
  modQueue: [],
  stories: [
    { id: 's1', user: 'Asha', img: 'https://picsum.photos/id/1015/480/854' },
    { id: 's2', user: 'Ravi', img: 'https://picsum.photos/id/1016/480/854' },
    { id: 's3', user: 'BM Comm', img: 'https://picsum.photos/id/1018/480/854' },
    { id: 's4', user: 'Navratri', img: 'https://picsum.photos/id/1019/480/854' },
    { id: 's5', user: 'Priya', img: 'https://picsum.photos/id/1025/480/854' },
    { id: 's6', user: 'Sunil', img: 'https://picsum.photos/id/1028/480/854' },
  ],
  trending: ['#Navratri', '#StartupIndia', '#BharatTech', '#Cricket', '#DevInHindi', '#Seva'],
  communities: [
    { id: 'c1', name: 'Bharat Devs', members: 5200, public: true, desc: 'A group for devs in Bharat', joined: false },
    { id: 'c2', name: 'Bhajan Lovers', members: 9100, public: true, desc: 'Satsang, bhajans, kirtan', joined: true },
    { id: 'c3', name: 'Photo Yatris', members: 1300, public: false, desc: 'Pilgrimage photography', joined: false },
  ],
  events: [
    { id: 'e1', title: 'Navratri Seva Drive', when: '2025-10-12T19:00', where: 'Delhi Mandir', cover: 'https://picsum.photos/id/23/800/400', going: false },
    { id: 'e2', title: 'Hackathon 2025', when: '2025-11-22T10:00', where: 'Online', cover: 'https://picsum.photos/id/2/800/400', going: true },
  ],
  feed: [
    { id:'p1', type:'note', author: allUsers.find(u => u.id === 'u4')!, time:'2m', createdAt: new Date(now.getTime() - 2 * 60 * 1000), text:'Just finished #Trisandhya 🌸✨', vis:'public', likes:12, comments:3, reposts:1 },
    { id:'p2', type:'album', author: allUsers.find(u => u.id === 'u2')!, time:'10m', createdAt: new Date(now.getTime() - 10 * 60 * 1000), text:'Seva at Puri Mandir 🙏', images:[
      'https://picsum.photos/id/40/800/600',
      'https://picsum.photos/id/41/800/600',
      'https://picsum.photos/id/42/800/600'
    ], alt:'Devotees at temple', vis:'public', likes:120, comments:45, reposts:10 },
    { id:'p3', type:'clip', author: allUsers.find(u => u.id === 'u5')!, time:'18m', createdAt: new Date(now.getTime() - 18 * 60 * 1000), text:'Festival prep in Delhi 🎉', video:'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4', vis:'public', likes:3200, comments:260, reposts:102 },
    { id:'p4', type:'community', author: allUsers.find(u => u.id === 'u2')!, time:'22m', createdAt: new Date(now.getTime() - 22 * 60 * 1000), text:'Meetup at IIT Delhi, 4pm this Saturday', community:'Bharat Devs', vis:'community', likes:44, comments:12, reposts:0 },
    { id:'p5', type:'event', author: allUsers.find(u => u.id === 'u_me')!, time:'1h', createdAt: new Date(now.getTime() - 60 * 60 * 1000), text:'Who is joining the Navratri Seva Drive?', eventId:'e1', vis:'public', likes:12, comments:1, reposts:0 },
    { id:'p6', type:'thread', author: allUsers.find(u => u.id === 'u6')!, time:'2h', createdAt: new Date(now.getTime() - 2 * 60 * 60 * 1000), title:'5 lessons from my first hackathon', parts:["Prep beats luck","Build the smallest demo","Show, don’t tell","Ask for feedback","Ship even if imperfect"], text: '', vis:'public', likes:210, comments:46, reposts:12 },
    { id:'p7', type:'note', author: allUsers.find(u => u.id === 'u2')!, time:'3h', createdAt: new Date(now.getTime() - 3 * 60 * 60 * 1000), text:'The sunrise today was incredible. #Odisha', vis:'public', likes:250, comments:18, reposts:5 },
    { id:'p8', type:'note', author: allUsers.find(u => u.id === 'u7')!, time:'5h', createdAt: new Date(now.getTime() - 5 * 60 * 60 * 1000), text:'Excited to announce our pre-seed funding round! The journey is just beginning. #StartupIndia #MakeInIndia', vis:'public', likes:1200, comments:80, reposts:95 },
    { id:'p9', type:'album', author: allUsers.find(u => u.id === 'u1')!, time:'8h', createdAt: new Date(now.getTime() - 8 * 60 * 60 * 1000), text:'Colors of Varanasi', images:[
      'https://picsum.photos/id/201/800/600',
      'https://picsum.photos/id/202/800/600',
    ], alt:'Scenes from Varanasi ghats', vis:'public', likes:540, comments:62, reposts:25 },
    { id:'p10', type:'note', author: allUsers.find(u => u.id === 'u3')!, time:'1d', createdAt: new Date(now.getTime() - 24 * 60 * 60 * 1000), text:'Found the best Vada Pav in Mumbai today. Unbelievable!', vis:'followers', likes:95, comments:22, reposts:3 },
    { id:'p11', type:'note', author: allUsers.find(u => u.id === 'u5')!, time:'1d', createdAt: new Date(now.getTime() - 26 * 60 * 60 * 1000), text:'Working on a new design system inspired by Madhubani art. It is challenging but so rewarding.', vis:'public', likes:880, comments:112, reposts:70 },
  ]
};