import React, { useState, useRef, useEffect } from 'react';
import { useAppContext } from '../../hooks/useAppContext';
import { Avatar, Button } from '../shared/common';
import { CloseIcon } from '../shared/Icons';
import { timeAgo } from '../../lib/utils';

interface CommentsModalProps {
    isOpen: boolean;
    onClose: () => void;
    postId: string | null;
}

const CommentsModal: React.FC<CommentsModalProps> = ({ isOpen, onClose, postId }) => {
    const { data, actions, t } = useAppContext();
    const [newComment, setNewComment] = useState('');
    const commentsEndRef = useRef<null | HTMLDivElement>(null);
    
    const post = data.feed.find(p => p.id === postId);

    useEffect(() => {
        commentsEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [post?.comments.length]);

    if (!isOpen || !post) return null;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (newComment.trim()) {
            actions.addComment(post.id, newComment.trim());
            setNewComment('');
        }
    };

    return (
        <div className="fixed inset-0 z-[70] flex items-center justify-center bg-black bg-opacity-60" onClick={onClose}>
            <div 
                className="relative mx-auto mt-[8vh] w-[min(600px,92vw)] rounded-xl border border-border-color bg-panel shadow-[0_10px_30px_rgba(0,0,0,.35)] flex flex-col max-h-[80vh]"
                onClick={e => e.stopPropagation()}
            >
                <div className="flex items-center justify-between border-b border-border-color p-4 flex-shrink-0">
                    <h2 className="font-bold">{t('comments')}</h2>
                    <button onClick={onClose} className="p-1 rounded-full hover:bg-[#1a2130]"><CloseIcon /></button>
                </div>
                
                <div className="overflow-y-auto p-4 space-y-4">
                    {post.comments.length > 0 ? post.comments.map(comment => (
                        <div key={comment.id} className="flex items-start gap-3">
                            <Avatar size="sm" />
                            <div className="flex-1 bg-panel-2 p-2.5 rounded-lg">
                                <div className="flex items-center gap-2">
                                    <span className="font-bold text-sm">{comment.author.name}</span>
                                    <span className="text-xs text-text-muted">@{comment.author.handle}</span>
                                    <span className="text-xs text-text-muted ml-auto">{timeAgo(comment.createdAt)}</span>
                                </div>
                                <p className="text-sm mt-1">{comment.text}</p>
                            </div>
                        </div>
                    )) : (
                        <p className="text-sm text-text-muted text-center py-8">{t('noCommentsYet')}</p>
                    )}
                    <div ref={commentsEndRef} />
                </div>
                
                <form onSubmit={handleSubmit} className="border-t border-border-color p-4 flex-shrink-0 mt-auto">
                    <div className="flex items-center gap-3">
                        <Avatar size="sm" />
                        <input
                            type="text"
                            value={newComment}
                            onChange={(e) => setNewComment(e.target.value)}
                            placeholder={t('addCommentPlaceholder')}
                            className="w-full bg-[#0b0f14] text-text-primary border border-border-color rounded-full py-2 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                        <Button type="submit" variant="primary" disabled={!newComment.trim()}>{t('postComment')}</Button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CommentsModal;
