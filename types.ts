
export type Route = 'home' | 'explore' | 'communities' | 'events' | 'bookmarks' | 'profile' | 'admin';

export interface User {
  id: string;
  name: string;
  handle: string;
  avatar?: string;
}

export interface SuggestedUser extends User {
    followers: string;
}

export type PostType = 'note' | 'album' | 'clip' | 'thread' | 'community' | 'event';

export interface Post {
  id: string;
  type: PostType;
  author: User;
  time: string;
  text: string;
  title?: string;
  images?: string[];
  alt?: string;
  video?: string;
  parts?: string[];
  community?: string;
  eventId?: string;
  vis: 'public' | 'followers' | 'friends' | 'community';
  likes: number;
  comments: number;
  reposts: number;
}

export interface Story {
  id: string;
  user: string;
  img: string;
}

export interface Community {
  id: string;
  name: string;
  members: number;
  public: boolean;
  desc: string;
  joined: boolean;
}

export interface Event {
  id: string;
  title: string;
  when: string;
  where: string;
  cover: string;
  going: boolean;
}

export interface Notification {
    id: string;
    actor: string;
    msg: string;
    time: string;
}

export interface AppData {
  route: Route;
  isAdmin: boolean;
  quietHours: boolean;
  dataSaver: boolean;
  user: User & { friends: number; followers: number };
  bookmarks: Set<string>;
  likes: Set<string>;
  notifs: Notification[];
  modQueue: any[];
  stories: Story[];
  trending: string[];
  suggestedUsers: SuggestedUser[];
  communities: Community[];
  events: Event[];
  feed: Post[];
}
