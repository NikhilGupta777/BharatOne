
import React from 'react';
import type { Route, AppData, Post } from '../types';
import { Panel, Button, Chip, Avatar } from './common';
import StoryRow from './StoryRow';
import PostCard from './PostCard';

const HomeView: React.FC<MainContentProps> = (props) => (
    <Panel>
        <StoryRow stories={props.data.stories} />
        <div className="flex flex-col">
            {props.data.feed.map(post => (
                <PostCard 
                    key={post.id} 
                    post={post}
                    events={props.data.events}
                    isBookmarked={props.data.bookmarks.has(post.id)}
                    isLiked={props.data.likes.has(post.id)}
                    onToggleBookmark={props.toggleBookmark}
                    onToggleLike={props.toggleLike}
                />
            ))}
        </div>
        <div className="text-center p-4">
            <Button>Load More</Button>
        </div>
    </Panel>
);

const ExploreView: React.FC<MainContentProps> = ({ data }) => (
    <Panel className="p-4 space-y-6">
        <div>
            <h3 className="text-lg font-bold mb-2">Explore</h3>
            <p className="text-sm text-[#9ba4b5]">Trending tags, Clips grid, Communities</p>
        </div>
        <div>
            <h4 className="font-bold mb-3">Trending</h4>
            <div className="flex flex-wrap gap-2">
                {data.trending.map(tag => <Chip key={tag}>{tag}</Chip>)}
            </div>
        </div>
        <div>
             <h4 className="font-bold mb-3">Shots & Clips</h4>
             <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {Array.from({length: 9}).map((_, i) => (
                    <div key={i} className="aspect-[3/4] rounded-lg bg-[#0d1117] border border-[#232a36] bg-cover bg-center" style={{backgroundImage: `url(https://picsum.photos/300/400?random=${i})`}}></div>
                ))}
             </div>
        </div>
    </Panel>
);

const CommunitiesView: React.FC<MainContentProps> = ({ data }) => (
    <Panel className="p-4 space-y-4">
        <div>
            <h3 className="text-lg font-bold mb-2">Communities</h3>
            <p className="text-sm text-[#9ba4b5]">Find, join and post in groups</p>
        </div>
        <div className="space-y-3">
        {data.communities.map(c => (
             <div key={c.id} className="flex items-center gap-3 p-3 rounded-lg bg-[#0d1117] border border-[#232a36]">
                <Avatar size="sm" />
                <div className="flex-1">
                    <p className="font-bold text-sm">{c.name}</p>
                    <p className="text-xs text-[#9ba4b5]">{c.desc}</p>
                </div>
                <Button className="text-xs px-3 py-1">{c.joined ? 'Joined' : 'Join'}</Button>
            </div>
        ))}
        </div>
    </Panel>
);

const EventsView: React.FC<MainContentProps> = ({ data }) => (
     <Panel className="p-4 space-y-4">
        <div>
            <h3 className="text-lg font-bold mb-2">Events</h3>
            <p className="text-sm text-[#9ba4b5]">Discover & RSVP to events</p>
        </div>
        <div className="space-y-3">
        {data.events.map(ev => (
             <div key={ev.id} className="flex items-start gap-3 p-3 rounded-lg bg-[#0d1117] border border-[#232a36]">
                <img src={ev.cover} alt={ev.title} className="w-24 h-16 object-cover rounded"/>
                <div className="flex-1">
                    <p className="font-bold text-sm">{ev.title}</p>
                    <p className="text-xs text-[#9ba4b5]">{new Date(ev.when).toLocaleString()}</p>
                </div>
                <Button className="text-xs px-3 py-1">{ev.going ? 'Going' : 'Interested'}</Button>
            </div>
        ))}
        </div>
    </Panel>
);

const BookmarksView: React.FC<MainContentProps> = (props) => {
    const bookmarkedPosts = props.data.feed.filter(p => props.data.bookmarks.has(p.id));
    return (
        <Panel>
             <div className="p-4 border-b border-[#232a36]">
                <h3 className="text-lg font-bold">Saved</h3>
                <p className="text-sm text-[#9ba4b5]">Your saved posts</p>
            </div>
            {bookmarkedPosts.length > 0 ? (
                 bookmarkedPosts.map(post => (
                    <PostCard 
                        key={post.id} 
                        post={post}
                        events={props.data.events}
                        isBookmarked={props.data.bookmarks.has(post.id)}
                        isLiked={props.data.likes.has(post.id)}
                        onToggleBookmark={props.toggleBookmark}
                        onToggleLike={props.toggleLike}
                    />
                ))
            ) : (
                <p className="p-8 text-center text-[#9ba4b5]">No saved items yet.</p>
            )}
        </Panel>
    );
};

const ProfileView: React.FC<MainContentProps> = (props) => (
     <Panel className="p-4 space-y-4">
        <h3 className="text-lg font-bold">Profile</h3>
        <p className="text-sm text-[#9ba4b5]">This is your profile page. (Prototype)</p>
    </Panel>
);

const AdminView: React.FC<MainContentProps> = (props) => (
     <Panel className="p-4 space-y-4">
        <h3 className="text-lg font-bold">Admin</h3>
        <p className="text-sm text-[#9ba4b5]">Admin and moderation tools. (Prototype)</p>
    </Panel>
);


interface MainContentProps {
    route: Route;
    data: AppData;
    updatePost: (post: Post) => void;
    toggleBookmark: (postId: string) => void;
    toggleLike: (postId: string) => void;
}

const MainContent: React.FC<MainContentProps> = (props) => {
  const renderView = () => {
    switch (props.route) {
      case 'home':
        return <HomeView {...props} />;
      case 'explore':
        return <ExploreView {...props} />;
      case 'communities':
        return <CommunitiesView {...props} />;
      case 'events':
        return <EventsView {...props} />;
      case 'bookmarks':
        return <BookmarksView {...props} />;
      case 'profile':
        return <ProfileView {...props} />;
       case 'admin':
        return <AdminView {...props} />;
      default:
        return <HomeView {...props} />;
    }
  };

  return <main className="min-h-[60vh]">{renderView()}</main>;
};

export default MainContent;
