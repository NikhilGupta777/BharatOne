import React, { createContext, useState, useCallback, useEffect, useMemo } from 'react';
import type { AppData, AppContextType, Post, Event, Notification, Route } from '../lib/types';
import { initialData } from '../lib/data';
import { getRankedFeed } from '../services/feedService';


export const AppContext = createContext<AppContextType | null>(null);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [data, setData] = useState<AppData>(initialData);
  const [route, setRoute] = useState<Route>('home');
  const [currentProfileId, setCurrentProfileId] = useState<string>(data.user.id);
  const [isComposerOpen, setComposerOpen] = useState(false);
  const [isNotifsOpen, setNotifsOpen] = useState(false);

  const rankedFeed = useMemo(() => getRankedFeed(data.feed, data.user), [data.feed, data.user]);
  
  const viewProfile = (userId: string) => {
    setCurrentProfileId(userId);
    setRoute('profile');
  };

  const addPost = (newPost: Post) => {
    setData(prevData => ({ ...prevData, feed: [newPost, ...prevData.feed] }));
  };

  const addEvent = (newEvent: Event) => {
    setData(prevData => ({ ...prevData, events: [newEvent, ...prevData.events] }));
  };

  const updatePost = (updatedPost: Post) => {
    setData(prevData => ({
      ...prevData,
      feed: prevData.feed.map(p => p.id === updatedPost.id ? updatedPost : p)
    }));
  };

  const toggleBookmark = (postId: string) => {
    setData(prevData => {
      const newBookmarks = new Set(prevData.bookmarks);
      if (newBookmarks.has(postId)) newBookmarks.delete(postId);
      else newBookmarks.add(postId);
      return { ...prevData, bookmarks: newBookmarks };
    });
  };

  const toggleLike = (postId: string) => {
    setData(prevData => {
      const newLikes = new Set(prevData.likes);
      const post = prevData.feed.find(p => p.id === postId);
      if (!post) return prevData;

      let newLikesCount = post.likes;
      if (newLikes.has(postId)) {
        newLikes.delete(postId);
        newLikesCount--;
      } else {
        newLikes.add(postId);
        newLikesCount++;
      }
      
      const newFeed = prevData.feed.map(p => p.id === postId ? { ...p, likes: newLikesCount } : p);
      return { ...prevData, likes: newLikes, feed: newFeed };
    });
  };

  const toggleFollow = (userId: string) => {
    setData(prevData => {
        const newFollowing = new Set(prevData.user.following);
        const targetUser = prevData.allUsers.find(u => u.id === userId);
        if (!targetUser) return prevData;
        
        let newFollowerCount = targetUser.followers;

        if(newFollowing.has(userId)) {
            newFollowing.delete(userId);
            newFollowerCount--;
        } else {
            newFollowing.add(userId);
            newFollowerCount++;
        }

        const newAllUsers = prevData.allUsers.map(u => u.id === userId ? { ...u, followers: newFollowerCount } : u);
        
        return {
          ...prevData,
          allUsers: newAllUsers,
          user: {...prevData.user, following: newFollowing}
        };
    });
  };
  
  const toggleCommunityJoin = (communityId: string) => {
    setData(prevData => {
        const newCommunities = prevData.communities.map(c => 
            c.id === communityId ? { ...c, joined: !c.joined } : c
        );
        return {...prevData, communities: newCommunities};
    });
  };

  const toggleEventRsvp = (eventId: string) => {
      setData(prevData => {
          const newEvents = prevData.events.map(e => 
            e.id === eventId ? { ...e, going: !e.going } : e
          );
          return {...prevData, events: newEvents};
      });
  };
  
  const addNotification = useCallback((notif: Omit<Notification, 'id' | 'time'>) => {
    setData(prevData => {
        const newNotif: Notification = {
            ...notif,
            id: `n${Math.random().toString(36).slice(2, 9)}`,
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        };
        return { ...prevData, notifs: [...prevData.notifs, newNotif] };
    });
  }, []);

  useEffect(() => {
      const interval = setInterval(() => {
          const actors = ['Asha', 'Ravi', 'Kiran', 'Neel', 'Anita'];
          const messages = ['liked your post', 'commented on your post', 'followed you'];
          if (document.visibilityState === 'visible') {
            addNotification({
                actor: actors[Math.floor(Math.random() * actors.length)],
                msg: messages[Math.floor(Math.random() * messages.length)],
            });
          }
      }, 30000);
      return () => clearInterval(interval);
  }, [addNotification]);


  const value: AppContextType = {
    data,
    rankedFeed,
    route,
    setRoute,
    currentProfileId,
    isComposerOpen,
    setComposerOpen,
    isNotifsOpen,
    setNotifsOpen,
    actions: {
      addPost,
      addEvent,
      updatePost,
      toggleBookmark,
      toggleLike,
      toggleFollow,
      toggleCommunityJoin,
      toggleEventRsvp,
      addNotification,
      viewProfile,
    }
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};