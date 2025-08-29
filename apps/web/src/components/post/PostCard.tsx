import React, { useState } from 'react';
import type { Post as PostType, Event } from '../../lib/types';
import { useAppContext } from '../../hooks/useAppContext';
import { Avatar, Chip } from '../shared/common';
import { HeartIcon, FilledHeartIcon, CommentIcon, RepostIcon, BookmarksIcon, FilledBookmarksIcon, MoreIcon, ShareIcon } from '../shared/Icons';
import { fmtCount, timeAgo } from '../../lib/utils';
import SharePopover from '../modals/SharePopover';

interface PostCardProps {
    post: PostType;
}

const PostContent: React.FC<{ post: PostType, events: Event[] }> = ({ post, events }) => {
    switch (post.type) {
        case 'album':
            return (
                <div className="mt-2.5">
                    <p className="whitespace-pre-wrap text-sm">{post.text}</p>
                    <div className="mt-2.5 rounded-xl border border-border-color overflow-hidden">
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
                    <div className="mt-2.5 rounded-xl border border-border-color overflow-hidden">
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
                    <div className="rounded-xl border border-border-color overflow-hidden">
                        <img src={event.cover} alt={event.title} className="w-full h-auto object-cover" />
                    </div>
                    <div className="mt-2.5">
                        <p className="font-bold">{event.title}</p>
                        <p className="text-xs text-text-muted">{new Date(event.when).toLocaleString()} &bull; {event.where}</p>
                    </div>
                </div>
            );
        default: // note
            return <p className="mt-1.5 whitespace-pre-wrap text-sm">{post.text}</p>;
    }
}

const PostCard: React.FC<PostCardProps> = ({ post }) => {
    const { data, actions, setCommentsModalPostId, t } = useAppContext();
    const [isShareOpen, setShareOpen] = useState(false);

    const isBookmarked = data.bookmarks.has(post.id);
    const isLiked = data.likes.has(post.id);

    const handleProfileClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        actions.viewProfile(post.author.id);
    };

    const handleLikeClick = () => {
        actions.toggleLike(post.id);
    };
    
    const handleCopyLink = () => {
        const link = `${window.location.origin}/post/${post.id}`;
        navigator.clipboard.writeText(link);
        actions.addToast(t('linkCopied'));
        setShareOpen(false);
    };

    return (
        <article className="grid grid-cols-[auto_1fr] gap-3 p-4 border-b border-border-color">
            <div onClick={handleProfileClick} className="cursor-pointer">
                <Avatar size="md" />
            </div>
            <div>
                <div className="flex items-center gap-2">
                    <div onClick={handleProfileClick} className="cursor-pointer group">
                        <span className="font-bold text-sm group-hover:underline">{post.author.name}</span>
                        <span className="text-xs text-text-muted ml-1.5">@{post.author.handle}</span>
                    </div>
                    <span className="text-xs text-text-muted">&middot;</span>
                    <span className="text-xs text-text-muted">{timeAgo(post.createdAt)}</span>
                </div>
                
                <PostContent post={post} events={data.events} />

                <div className="flex items-center gap-4 mt-3">
                    {/* Like Button */}
                    <button onClick={handleLikeClick} className={`flex items-center gap-1.5 text-xs transition-colors group ${isLiked ? 'text-red-500' : 'text-text-muted hover:text-red-500'}`}>
                         {isLiked ? 
                            <FilledHeartIcon className="h-4 w-4" /> :
                            <HeartIcon className="h-4 w-4" />
                         }
                         <span className="group-hover:text-red-500">{fmtCount(post.likes)}</span>
                    </button>
                    
                    {/* Comment Button */}
                    <button onClick={() => setCommentsModalPostId(post.id)} className="flex items-center gap-1.5 text-xs text-text-muted hover:text-blue-400 transition-colors group">
                        <CommentIcon className="h-4 w-4" />
                        <span className="group-hover:text-blue-400">{fmtCount(post.comments.length)}</span>
                    </button>
                    
                    {/* Repost Button */}
                    <button className="flex items-center gap-1.5 text-xs text-text-muted hover:text-green-400 transition-colors group">
                        <RepostIcon className="h-4 w-4" />
                         <span className="group-hover:text-green-400">{fmtCount(post.reposts)}</span>
                    </button>

                    {/* Bookmark Button */}
                    <button onClick={() => actions.toggleBookmark(post.id)} className={`flex items-center gap-1.5 text-xs transition-colors group ${isBookmarked ? 'text-indigo-400' : 'text-text-muted hover:text-indigo-400'}`}>
                        {isBookmarked ? <FilledBookmarksIcon className="h-4 w-4" /> : <BookmarksIcon className="h-4 w-4" />}
                    </button>

                    <div className="ml-auto flex items-center gap-4">
                        {/* Share Button */}
                        <div className="relative">
                            <button onClick={() => setShareOpen(s => !s)} className="text-text-muted hover:text-brand transition-colors">
                                <ShareIcon className="h-4 w-4" />
                            </button>
                            {isShareOpen && <SharePopover onClose={() => setShareOpen(false)} onCopyLink={handleCopyLink} />}
                        </div>
                        {/* More Button */}
                        <button className="text-text-muted hover:text-text-primary transition-colors"><MoreIcon className="h-4 w-4" /></button>
                    </div>
                </div>
            </div>
        </article>
    );
};

export default PostCard;
