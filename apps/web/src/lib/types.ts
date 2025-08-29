import type React from 'react';

export type Route = 'home' | 'explore' | 'communities' | 'events' | 'bookmarks' | 'profile' | 'admin';
export type Locale = 'en' | 'hi';

export interface User {
  id: string;
  name: string;
  handle: string;
  avatar?: string;
  bio: string;
  coverUrl: string;
  following: Set<string>;
  followers: number;
}

export type PostType = 'note' | 'album' | 'clip' | 'thread' | 'community' | 'event';

export interface Post {
  id: string;
  type: PostType;
  author: User;
  time: string; // Kept for display, but sorting uses createdAt
  createdAt: Date;
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
    id:string;
    actor: string;
    msg: string;
    time: string;
}

export interface AppData {
  isAdmin: boolean;
  quietHours: boolean;
  dataSaver: boolean;
  user: User & { friends: number };
  allUsers: User[];
  bookmarks: Set<string>;
  likes: Set<string>;
  notifs: Notification[];
  modQueue: any[];
  stories: Story[];
  trending: string[];
  communities: Community[];
  events: Event[];
  feed: Post[];
}

// For AppContext
export interface AppContextType {
  data: AppData;
  rankedFeed: Post[];
  route: Route;
  setRoute: React.Dispatch<React.SetStateAction<Route>>;
  currentProfileId: string;
  isComposerOpen: boolean;
  setComposerOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isNotifsOpen: boolean;
  setNotifsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  actions: {
    addPost: (post: Post) => void;
    addEvent: (event: Event) => void;
    updatePost: (post: Post) => void;
    toggleBookmark: (postId: string) => void;
    toggleLike: (postId: string) => void;
    toggleFollow: (userId: string) => void;
    toggleCommunityJoin: (communityId: string) => void;
    toggleEventRsvp: (eventId: string) => void;
    addNotification: (notif: Omit<Notification, 'id' | 'time'>) => void;
    viewProfile: (userId: string) => void;
  };
}