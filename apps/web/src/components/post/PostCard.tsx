import React, { useState } from 'react';
import type { Post as PostType, Event } from '../../lib/types';
import { useAppContext } from '../../hooks/useAppContext';
import { Avatar, Chip } from '../shared/common';
import { HeartIcon, CommentIcon, RepostIcon, BookmarksIcon, MoreIcon, ShareIcon } from '../shared/Icons';
import { fmtCount, timeAgo } from '../../lib/utils';
import SharePopover from '../modals/SharePopover';

interface PostCardProps {
    post: PostType;
}

const PostActionButton: React.FC<{ icon: React.ElementType; count?: number; active?: boolean; onClick?: () => void; children?: React.ReactNode, className?: string }> = 
({ icon: Icon, count, active, onClick, children, className }) => (
    <button onClick={onClick} className={`flex items-center gap-1.5 text-xs py-1.5 px-3 rounded-full bg-[#121722] border border-border-color hover:bg-[#1a1f2b] transition-colors ${active ? 'text-red-400' : 'text-text-muted'} ${className}`}>
        <Icon className="h-4 w-4" />
        {count !== undefined && <span>{fmtCount(count)}</span>}
        {children}
    </button>
);

const PostContent: React.FC<{ post: PostType, events: Event[] }> = ({ post, events }) => {
    // ... (content remains the same, but simplified for brevity)
    switch (post.type) {
        case 'album':
            return (
                <div className="mt-2.5">
                    <p className="whitespace-pre-wrap text-sm">{post.text}</p>
                    <div className="mt-2.5 rounded-lg border border-border-color overflow-hidden">
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
                    <div className="mt-2.5 rounded-lg border border-border-color overflow-hidden">
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
                    <div className="rounded-lg border border-border-color overflow-hidden">
                        <img src={event.cover} alt={event.title} className="w-full h-auto object-cover" />
                    </div>
                    <div className="mt-2.5">
                        <p className="font-bold">{event.title}</p>
                        <p className="text-xs text-text-muted">{new Date(event.when).toLocaleString()} &bull; {event.where}</p>
                    </div>
                </div>
            );
        default: // note
            return <p className="mt-2.5 whitespace-pre-wrap text-sm">{post.text}</p>;
    }
}

const PostCard: React.FC<PostCardProps> = ({ post }) => {
    const { data, actions, setCommentsModalPostId, t } = useAppContext();
    const [isShareOpen, setShareOpen] = useState(false);
    const [isAnimatingLike, setAnimatingLike] = useState(false);

    const isBookmarked = data.bookmarks.has(post.id);
    const isLiked = data.likes.has(post.id);

    const handleProfileClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        actions.viewProfile(post.author.id);
    };

    const handleLikeClick = () => {
        if (!isLiked) {
            setAnimatingLike(true);
            setTimeout(() => setAnimatingLike(false), 300);
        }
        actions.toggleLike(post.id);
    };
    
    const handleCopyLink = () => {
        const link = `${window.location.origin}/post/${post.id}`; // Dummy link
        navigator.clipboard.writeText(link);
        actions.addToast(t('linkCopied'));
        setShareOpen(false);
    };

    return (
        <article className="grid grid-cols-[60px_1fr] gap-3 p-4 border-b border-border-color">
            <div onClick={handleProfileClick} className="cursor-pointer">
                <Avatar />
            </div>
            <div>
                <div className="flex items-center gap-2">
                    <div onClick={handleProfileClick} className="cursor-pointer group">
                        <span className="font-bold text-sm group-hover:underline">{post.author.name}</span>
                        <span className="text-xs text-text-muted ml-1.5">@{post.author.handle}</span>
                    </div>
                    <Chip className="capitalize">{post.type}</Chip>
                    <span className="ml-auto text-xs text-text-muted">{timeAgo(post.createdAt)}</span>
                </div>

                <PostContent post={post} events={data.events} />

                <div className="flex items-center gap-2 mt-3">
                    <button onClick={handleLikeClick} className={`flex items-center gap-1.5 text-xs py-1.5 px-3 rounded-full bg-[#121722] border border-border-color hover:bg-[#1a1f2b] transition-colors ${isLiked ? 'text-red-400' : 'text-text-muted'}`}>
                         <HeartIcon className={`h-4 w-4 transition-transform duration-200 ${isAnimatingLike ? 'scale-125' : ''}`} />
                         <span>{fmtCount(post.likes)}</span>
                    </button>
                    <PostActionButton icon={CommentIcon} count={post.comments.length} onClick={() => setCommentsModalPostId(post.id)} />
                    <PostActionButton icon={RepostIcon} count={post.reposts} />
                     <div className="relative">
                        <PostActionButton icon={ShareIcon} onClick={() => setShareOpen(s => !s)} />
                        {isShareOpen && <SharePopover onClose={() => setShareOpen(false)} onCopyLink={handleCopyLink} />}
                    </div>
                    <PostActionButton icon={BookmarksIcon} active={isBookmarked} onClick={() => actions.toggleBookmark(post.id)} />
                    
                    <button className="ml-auto text-text-muted p-1.5 rounded-full hover:bg-[#1a1f2b]"><MoreIcon /></button>
                    <div className="text-[11px] py-1 px-2.5 bg-panel-2 border border-border-color rounded-full text-[#a6b0c1] capitalize">{post.vis}</div>
                </div>
            </div>
        </article>
    );
};

export default PostCard;
