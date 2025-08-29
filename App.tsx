
import React, { useState, useEffect, useCallback } from 'react';
import type { Route, Post, Community, Event, User, Notification } from './types';
import { initialData } from './data';
import Topbar from './components/Topbar';
import LeftNav from './components/LeftNav';
import RightRail from './components/RightRail';
import MainContent from './components/MainContent';
import ComposerModal from './components/ComposerModal';
import NotificationsPanel from './components/NotificationsPanel';

const App: React.FC = () => {
  const [route, setRoute] = useState<Route>('home');
  const [data, setData] = useState(initialData);
  const [isComposerOpen, setComposerOpen] = useState(false);
  const [isNotifsOpen, setNotifsOpen] = useState(false);
  
  const addPost = (newPost: Post) => {
    setData(prevData => ({
      ...prevData,
      feed: [newPost, ...prevData.feed],
    }));
  };

  const addEvent = (newEvent: Event) => {
    setData(prevData => ({
        ...prevData,
        events: [newEvent, ...prevData.events],
    }));
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
      if (newBookmarks.has(postId)) {
        newBookmarks.delete(postId);
      } else {
        newBookmarks.add(postId);
      }
      return { ...prevData, bookmarks: newBookmarks };
    });
  };

  const toggleLike = (postId: string) => {
    setData(prevData => {
      const newLikes = new Set(prevData.likes);
      let newFeed = [...prevData.feed];
      const postIndex = newFeed.findIndex(p => p.id === postId);

      if (postIndex > -1) {
        const post = { ...newFeed[postIndex] };
        if (newLikes.has(postId)) {
          newLikes.delete(postId);
          post.likes = (post.likes || 0) - 1;
        } else {
          newLikes.add(postId);
          post.likes = (post.likes || 0) + 1;
        }
        newFeed[postIndex] = post;
      }
      
      return { ...prevData, likes: newLikes, feed: newFeed };
    });
  };

  const addNotification = useCallback((notif: Omit<Notification, 'id' | 'time'>) => {
    setData(prevData => {
        const newNotif: Notification = {
            ...notif,
            id: `n${Math.random().toString(36).slice(2, 9)}`,
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        };
        return {
            ...prevData,
            notifs: [...prevData.notifs, newNotif],
        };
    });
  }, []);

  useEffect(() => {
      const interval = setInterval(() => {
          const actors = ['Asha', 'Ravi', 'Kiran', 'Neel', 'Anita'];
          const messages = ['liked your post', 'commented on your post', 'followed you'];
          addNotification({
              actor: actors[Math.floor(Math.random() * actors.length)],
              msg: messages[Math.floor(Math.random() * messages.length)],
          });
      }, 30000);
      return () => clearInterval(interval);
  }, [addNotification]);


  return (
    <div className="min-h-screen bg-[#0f1115] text-[#e6e6e6]">
      <Topbar onComposeClick={() => setComposerOpen(true)} onNotifsClick={() => setNotifsOpen(true)} notifsCount={data.notifs.length} />
      <div className="app-grid-container mx-auto max-w-[1400px] gap-4 p-4 lg:grid lg:grid-cols-[240px_1fr_360px]">
        <LeftNav route={route} setRoute={setRoute} />
        <MainContent 
          route={route} 
          data={data}
          updatePost={updatePost}
          toggleBookmark={toggleBookmark}
          toggleLike={toggleLike}
        />
        <RightRail 
          suggestedUsers={data.suggestedUsers} 
          trending={data.trending} 
          communities={data.communities} 
          events={data.events}
        />
      </div>
      <ComposerModal 
        isOpen={isComposerOpen} 
        onClose={() => setComposerOpen(false)}
        currentUser={data.user}
        addPost={addPost}
        addEvent={addEvent}
      />
      <NotificationsPanel
        isOpen={isNotifsOpen}
        onClose={() => setNotifsOpen(false)}
        notifications={data.notifs}
      />
    </div>
  );
};

export default App;
