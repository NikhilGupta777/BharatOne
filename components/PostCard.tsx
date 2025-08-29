
import React from 'react';
import type { Post, Event } from '../types';
import { Avatar, Chip } from './common';
import { HeartIcon, CommentIcon, RepostIcon, BookmarksIcon, MoreIcon } from './Icons';

interface PostCardProps {
    post: Post;
    isBookmarked: boolean;
    isLiked: boolean;
    events: Event[];
    onToggleBookmark: (postId: string) => void;
    onToggleLike: (postId: string) => void;
}

const fmtCount = (n: number) => {
    if (n >= 10000000) return (n / 10000000).toFixed(1) + 'Cr';
    if (n >= 100000) return (n / 100000).toFixed(1) + 'L';
    if (n >= 1000) return (n / 1000).toFixed(1) + 'K';
    return String(n);
};

const PostActionButton: React.FC<{ icon: React.ElementType; count: number; active?: boolean; onClick?: () => void; }> = ({ icon: Icon, count, active, onClick }) => (
    <button onClick={onClick} className={`flex items-center gap-1.5 text-xs py-1.5 px-3 rounded-full bg-[#121722] border border-[#232a36] hover:bg-[#1a1f2b] transition-colors ${active ? 'text-red-400' : 'text-[#9ba4b5]'}`}>
        <Icon className="h-4 w-4" />
        <span>{fmtCount(count)}</span>
    </button>
);

const PostContent: React.FC<{ post: Post, events: Event[] }> = ({ post, events }) => {
    switch (post.type) {
        case 'album':
            return (
                <div className="mt-2.5">
                    <p className="whitespace-pre-wrap text-sm">{post.text}</p>
                    <div className="mt-2.5 rounded-xl border border-[#232a36] overflow-hidden">
                        <div className="grid grid-flow-col auto-cols-full overflow-x-auto snap-x snap-mandatory">
                            {post.images?.map((src, i) => <img key={i} src={src} alt={post.alt || ''} className="w-full h-auto object-cover snap-center" />)}
                        </div>
                    </div>
                </div>
            );
        case 'clip':
            return (
                <div className="mt-2.5">
                    <p className="whitespace-pre-wrap text-sm">{post.text}</p>
                    <div className="mt-2.5 rounded-xl border border-[#232a36] overflow-hidden">
                        <video src={post.video} controls className="w-full h-auto" />
                    </div>
                </div>
            );
        case 'thread':
            return (
                <div className="mt-2.5">
                    <h4 className="font-bold">{post.title}</h4>
                    <ol className="list-decimal list-inside space-y-1 mt-2 text-sm">
                        {post.parts?.map((part, i) => <li key={i}>{part}</li>)}
                    </ol>
                </div>
            );
        case 'community':
            return (
                <div className="mt-2.5">
                    <p className="whitespace-pre-wrap text-sm">{post.text}</p>
                    <Chip className="mt-2.5">Community: {post.community}</Chip>
                </div>
            );
        case 'event':
            const event = events.find(e => e.id === post.eventId);
            if (!event) return <p>{post.text}</p>;
            return (
                <div className="mt-2.5">
                    <div className="rounded-xl border border-[#232a36] overflow-hidden">
                        <img src={event.cover} alt={event.title} className="w-full h-auto object-cover" />
                    </div>
                    <div className="mt-2.5">
                        <p className="font-bold">{event.title}</p>
                        <p className="text-xs text-[#9ba4b5]">{new Date(event.when).toLocaleString()} &bull; {event.where}</p>
                    </div>
                </div>
            );
        default: // note
            return <p className="mt-2.5 whitespace-pre-wrap text-sm">{post.text}</p>;
    }
}

const PostCard: React.FC<PostCardProps> = ({ post, isBookmarked, isLiked, events, onToggleBookmark, onToggleLike }) => {
    return (
        <article className="grid grid-cols-[60px_1fr] gap-3 p-4 border-b border-[#232a36]">
            <Avatar />
            <div>
                <div className="flex items-center gap-2">
                    <span className="font-bold text-sm">{post.author.name}</span>
                    <span className="text-xs text-[#9ba4b5]">@{post.author.handle}</span>
                    <Chip className="capitalize">{post.type}</Chip>
                    <span className="ml-auto text-xs text-[#9ba4b5]">{post.time}</span>
                </div>

                <PostContent post={post} events={events} />

                <div className="flex items-center gap-2 mt-3">
                    <PostActionButton icon={HeartIcon} count={post.likes} active={isLiked} onClick={() => onToggleLike(post.id)} />
                    <PostActionButton icon={CommentIcon} count={post.comments} />
                    <PostActionButton icon={RepostIcon} count={post.reposts} />
                    <button onClick={() => onToggleBookmark(post.id)} className={`flex items-center gap-1.5 text-xs py-1.5 px-3 rounded-full bg-[#121722] border border-[#232a36] hover:bg-[#1a1f2b] transition-colors ${isBookmarked ? 'text-indigo-400' : 'text-[#9ba4b5]'}`}>
                        <BookmarksIcon className="h-4 w-4" />
                    </button>
                    <button className="ml-auto text-[#9ba4b5] p-1.5 rounded-full hover:bg-[#1a1f2b]"><MoreIcon /></button>
                    <div className="text-[11px] py-1 px-2.5 bg-[#0d1117] border border-[#232a36] rounded-full text-[#a6b0c1] capitalize">{post.vis}</div>
                </div>
            </div>
        </article>
    );
};

export default PostCard;
