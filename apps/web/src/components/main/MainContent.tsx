import React, { useState } from 'react';
import { useAppContext } from '../../hooks/useAppContext';
import { Panel, Button, Chip, Avatar } from '../shared/common';
import StoryRow from '../post/StoryRow';
import PostCard from '../post/PostCard';
import { useI18n } from '../../i18n/I18nProvider';
import { fmtCount } from '../../lib/utils';
import { BookmarksIcon, FilledBookmarksIcon } from '../shared/Icons';
import type { Post } from '../../lib/types';

const HomeView: React.FC = () => {
    const { rankedFeed, data, t } = useAppContext();
    return (
        <Panel>
            <StoryRow stories={data.stories} />
            <div className="flex flex-col">
                {rankedFeed.map(post => (
                    <PostCard 
                        key={post.id} 
                        post={post}
                    />
                ))}
            </div>
            <div className="text-center p-4 border-t border-border-color">
                <Button>{t('loadMore')}</Button>
            </div>
        </Panel>
    );
};

const ExploreView: React.FC = () => {
    const { data, t } = useAppContext();
    return (
        <Panel className="p-4 space-y-6">
            <div>
                <h3 className="text-lg font-bold mb-2">{t('explore')}</h3>
                <p className="text-sm text-text-muted">{t('exploreDescription')}</p>
            </div>
            <div>
                <h4 className="font-bold mb-3">{t('trending')}</h4>
                <div className="flex flex-wrap gap-2">
                    {data.trending.map(tag => <Chip key={tag}>{tag}</Chip>)}
                </div>
            </div>
            <div>
                 <h4 className="font-bold mb-3">{t('shotsAndClips')}</h4>
                 <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                    {Array.from({length: 9}).map((_, i) => (
                        <div key={i} className="aspect-[3/4] rounded-lg bg-panel-2 border border-border-color bg-cover bg-center" style={{backgroundImage: `url(https://picsum.photos/300/400?random=${i})`}}></div>
                    ))}
                 </div>
            </div>
        </Panel>
    );
};

const CommunitiesView: React.FC = () => {
    const { data, actions, t } = useAppContext();
    return (
        <Panel className="p-4 space-y-4">
            <div>
                <h3 className="text-lg font-bold mb-2">{t('communities')}</h3>
                <p className="text-sm text-text-muted">{t('communitiesDescription')}</p>
            </div>
            <div className="space-y-3">
            {data.communities.map(c => (
                 <div key={c.id} className="flex items-center gap-3 p-3 rounded-xl bg-panel-2 border border-border-color">
                    <Avatar size="sm" />
                    <div className="flex-1">
                        <p className="font-bold text-sm">{c.name}</p>
                        <p className="text-xs text-text-muted">{c.desc}</p>
                    </div>
                    <Button onClick={() => actions.toggleCommunityJoin(c.id)} className="text-xs px-3 py-1 w-20">
                        {c.joined ? t('joined') : t('join')}
                    </Button>
                </div>
            ))}
            </div>
        </Panel>
    );
};

const EventsView: React.FC = () => {
    const { data, actions, t } = useAppContext();
    return (
         <Panel className="p-4 space-y-4">
            <div>
                <h3 className="text-lg font-bold mb-2">{t('events')}</h3>
                <p className="text-sm text-text-muted">{t('eventsDescription')}</p>
            </div>
            <div className="space-y-3">
            {data.events.map(ev => (
                 <div key={ev.id} className="flex items-start gap-3 p-3 rounded-xl bg-panel-2 border border-border-color">
                    <img src={ev.cover} alt={ev.title} className="w-24 h-16 object-cover rounded-md"/>
                    <div className="flex-1">
                        <p className="font-bold text-sm">{ev.title}</p>
                        <p className="text-xs text-text-muted">{new Date(ev.when).toLocaleString()}</p>
                    </div>
                    <Button onClick={() => actions.toggleEventRsvp(ev.id)} className="text-xs px-3 py-1 w-24">
                        {ev.going ? t('going') : t('interested')}
                    </Button>
                </div>
            ))}
            </div>
        </Panel>
    );
};

const BookmarksView: React.FC = () => {
    const { data, t } = useAppContext();
    const bookmarkedPosts = data.feed.filter(p => data.bookmarks.has(p.id));
    return (
        <Panel>
             <div className="p-4 border-b border-border-color">
                <h3 className="text-lg font-bold">{t('bookmarks')}</h3>
                <p className="text-sm text-text-muted">{t('bookmarksDescription')}</p>
            </div>
            {bookmarkedPosts.length > 0 ? (
                 bookmarkedPosts.map(post => (
                    <PostCard 
                        key={post.id} 
                        post={post}
                    />
                ))
            ) : (
                <p className="p-8 text-center text-text-muted">{t('noSavedItems')}</p>
            )}
        </Panel>
    );
};

const ProfileView: React.FC = () => {
    const { data, currentProfileId, actions, t } = useAppContext();
    const { user, allUsers } = data;
    const [activeTab, setActiveTab] = useState('posts');

    const profileUser = allUsers.find(u => u.id === currentProfileId) || user;
    const isCurrentUser = profileUser.id === user.id;
    const isFollowing = user.following.has(profileUser.id);
    
    const userPosts = data.feed.filter(p => p.author.id === profileUser.id);
    const savedPosts = data.feed.filter(p => data.bookmarks.has(p.id));

    // FIX: Define a type for tab data to ensure consistent shape with optional icon properties.
    type TabData = {
        label: string;
        content: Post[];
        icon?: React.ElementType;
        activeIcon?: React.ElementType;
    };

    const TABS: { [key: string]: TabData } = {
        posts: { label: t('posts'), content: userPosts },
        ...(isCurrentUser && { saved: { label: t('saved'), content: savedPosts, icon: BookmarksIcon, activeIcon: FilledBookmarksIcon } })
    };
    
    return (
         <Panel>
            <div>
                <div 
                    className="h-40 bg-cover bg-center"
                    style={{backgroundImage: `url(${profileUser.coverUrl})`}}
                ></div>
                <div className="p-4">
                    <div className="flex items-end -mt-16">
                        <Avatar size="lg" className="border-4 border-panel" />
                        <div className="ml-auto">
                            {isCurrentUser ? (
                                <Button>{t('editProfile')}</Button>
                            ) : (
                                <Button onClick={() => actions.toggleFollow(profileUser.id)} variant={isFollowing ? 'secondary' : 'primary'}>
                                    {isFollowing ? t('following') : t('follow')}
                                </Button>
                            )}
                        </div>
                    </div>
                    <div className="mt-2">
                        <h2 className="text-xl font-bold">{profileUser.name}</h2>
                        <p className="text-sm text-text-muted">@{profileUser.handle}</p>
                        <p className="text-sm mt-2">{profileUser.bio}</p>
                        <div className="flex gap-4 text-sm mt-2 text-text-muted">
                            <span><span className="font-bold text-text-primary">{profileUser.following.size}</span> {t('following')}</span>
                            <span><span className="font-bold text-text-primary">{fmtCount(profileUser.followers)}</span> {t('followers')}</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="border-b border-border-color flex">
                {Object.entries(TABS).map(([key, tabData]) => {
                    const isActive = activeTab === key;
                    const Icon = isActive && tabData.activeIcon ? tabData.activeIcon : tabData.icon;
                    return (
                        <button 
                            key={key}
                            onClick={() => setActiveTab(key)}
                            className={`flex-1 p-3 text-sm font-semibold text-center transition-colors flex items-center justify-center gap-2 ${isActive ? 'border-b-2 border-brand text-text-primary' : 'text-text-muted hover:bg-panel-2'}`}
                        >
                            {Icon && <Icon className="w-4 h-4" />}
                            <span>{tabData.label}</span>
                        </button>
                    )
                })}
            </div>
            <div>
                {TABS[activeTab as keyof typeof TABS].content.length > 0 ? (
                    TABS[activeTab as keyof typeof TABS].content.map(p => <PostCard key={p.id} post={p} />)
                ) : (
                    <p className="p-8 text-center text-text-muted">{t('noPostsYet')}</p>
                )}
            </div>
         </Panel>
    );
};

const AdminView: React.FC = () => {
    const {t} = useAppContext();
    return (
     <Panel className="p-4 space-y-4">
        <h3 className="text-lg font-bold">{t('admin')}</h3>
        <p className="text-sm text-text-muted">{t('adminDescription')}</p>
    </Panel>
)};

const MainContent: React.FC = () => {
  const { route } = useAppContext();
  
  const renderView = () => {
    switch (route) {
      case 'home': return <HomeView />;
      case 'explore': return <ExploreView />;
      case 'communities': return <CommunitiesView />;
      case 'events': return <EventsView />;
      case 'bookmarks': return <BookmarksView />;
      case 'profile': return <ProfileView />;
      case 'admin': return <AdminView />;
      default: return <HomeView />;
    }
  };

  return <main className="min-h-[60vh]">{renderView()}</main>;
};

export default MainContent;