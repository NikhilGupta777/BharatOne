
import type { AppData } from './types';

export const initialData: AppData = {
  route: 'home',
  isAdmin: true,
  quietHours: false,
  dataSaver: false,
  user: { id: 'u_me', name: 'Madhav', handle: 'madhav', avatar: '', friends: 120, followers: 4800 },
  bookmarks: new Set(['p2']),
  likes: new Set(['p1']),
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
  suggestedUsers: [
    { id: 'u1', name: 'Asha', handle: 'asha', followers: '1.2L' },
    { id: 'u2', name: 'Ravi', handle: 'ravi', followers: '89K' },
    { id: 'u3', name: 'Neel', handle: 'neel', followers: '22K' },
  ],
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
    { id:'p1', type:'note', author:{id:'u4', name:'Anil', handle:'anil'}, time:'2m', text:'Just finished #Trisandhya 🌸✨', vis:'public', likes:12, comments:3, reposts:1 },
    { id:'p2', type:'album', author:{id:'u2', name:'Ravi', handle:'ravi'}, time:'10m', text:'Seva at Puri Mandir 🙏', images:[
      'https://picsum.photos/id/40/800/600',
      'https://picsum.photos/id/41/800/600',
      'https://picsum.photos/id/42/800/600'
    ], alt:'Devotees at temple', vis:'public', likes:120, comments:45, reposts:10 },
    { id:'p3', type:'clip', author:{id:'u5', name:'Meena', handle:'meena'}, time:'18m', text:'Festival prep in Delhi 🎉', video:'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4', vis:'public', likes:3200, comments:260, reposts:102 },
    { id:'p4', type:'community', author:{id:'c1', name:'Bharat Devs', handle:'community'}, time:'22m', text:'Meetup at IIT Delhi, 4pm this Saturday', community:'Bharat Devs', vis:'community', likes:44, comments:12, reposts:0 },
    { id:'p5', type:'event', author:{id:'e1', name:'Events', handle:'events'}, time:'1h', text:'Navratri Seva Drive', eventId:'e1', vis:'public', likes:12, comments:1, reposts:0 },
    { id:'p6', type:'thread', author:{id:'u6', name:'Arjun', handle:'arjun'}, time:'2h', title:'5 lessons from my first hackathon', parts:["Prep beats luck","Build the smallest demo","Show, don’t tell","Ask for feedback","Ship even if imperfect"], text: '', vis:'public', likes:210, comments:46, reposts:12 },
  ]
};
