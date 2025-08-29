
import React, { useState, useEffect } from 'react';
import type { Post, User, PostType, Event } from '../types';
import { Button } from './common';
import { CloseIcon } from './Icons';

interface ComposerModalProps {
    isOpen: boolean;
    onClose: () => void;
    currentUser: User;
    addPost: (post: Post) => void;
    addEvent: (event: Event) => void;
}

const composeTypes: { key: PostType; label: string }[] = [
    { key: 'note', label: 'Note' }, { key: 'album', label: 'Shot' }, { key: 'clip', label: 'Clip' },
    { key: 'thread', label: 'Thread' }, { key: 'event', label: 'Event' },
];

const ComposerModal: React.FC<ComposerModalProps> = ({ isOpen, onClose, currentUser, addPost, addEvent }) => {
    const [composeType, setComposeType] = useState<PostType>('note');
    const [text, setText] = useState('');
    const [mediaFile, setMediaFile] = useState<File | null>(null);
    const [altText, setAltText] = useState('');
    const [eventTitle, setEventTitle] = useState('');
    const [eventTime, setEventTime] = useState('');
    const [isValid, setIsValid] = useState(false);

    useEffect(() => {
        const isImagePost = composeType === 'album' && mediaFile && mediaFile.type.startsWith('image/');
        const textValid = text.trim().length > 0;
        const mediaValid = !!mediaFile;
        const altValid = !isImagePost || (isImagePost && altText.trim().length > 0);
        const eventValid = composeType === 'event' ? eventTitle.trim().length > 0 && eventTime.trim().length > 0 : true;

        setIsValid((textValid || mediaValid) && altValid && eventValid);
    }, [text, mediaFile, altText, composeType, eventTitle, eventTime]);

    const resetForm = () => {
        setComposeType('note');
        setText('');
        setMediaFile(null);
        setAltText('');
        setEventTitle('');
        setEventTime('');
    };

    const handleSubmit = () => {
        if (!isValid) return;

        if(composeType === 'event') {
            const newEvent: Event = {
                id: `e${Math.random().toString(36).slice(2, 9)}`,
                title: eventTitle,
                when: eventTime,
                where: 'TBA',
                cover: mediaFile ? URL.createObjectURL(mediaFile) : 'https://picsum.photos/800/400',
                going: false,
            };
            addEvent(newEvent);
            
            const newPost: Post = {
                id: `p${Math.random().toString(36).slice(2, 9)}`,
                type: 'event',
                author: currentUser,
                time: 'now',
                text: eventTitle,
                eventId: newEvent.id,
                vis: 'public', likes: 0, comments: 0, reposts: 0,
            };
            addPost(newPost);
        } else {
             const newPost: Post = {
                id: `p${Math.random().toString(36).slice(2, 9)}`,
                type: composeType,
                author: currentUser,
                time: 'now',
                text: text,
                vis: 'public', likes: 0, comments: 0, reposts: 0,
                ...(composeType === 'album' && { images: mediaFile ? [URL.createObjectURL(mediaFile)] : [], alt: altText }),
                ...(composeType === 'clip' && { video: mediaFile ? URL.createObjectURL(mediaFile) : '' }),
                ...(composeType === 'thread' && { title: text.split('\n')[0], parts: text.split('\n').filter(Boolean) }),
            };
            addPost(newPost);
        }
        
        resetForm();
        onClose();
    };

    if (!isOpen) return null;

    const charLimit = composeType === 'note' ? 500 : 2000;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60">
            <div className="relative mx-auto mt-[8vh] w-[min(920px,92vw)] rounded-[22px] border border-[#232a36] bg-[#141821] shadow-[0_10px_30px_rgba(0,0,0,.35)]">
                <div className="flex items-center justify-between border-b border-[#232a36] p-4">
                    <h2 className="font-bold">Compose</h2>
                    <button onClick={onClose} className="p-1 rounded-full hover:bg-[#1a2130]"><CloseIcon /></button>
                </div>
                <div className="p-4 space-y-4">
                    <div className="flex flex-wrap gap-2">
                        {composeTypes.map(type => (
                            <button key={type.key} onClick={() => setComposeType(type.key)} className={`py-1.5 px-3 rounded-full border text-xs transition-colors ${composeType === type.key ? 'bg-[#1b2231] border-[#2b3446]' : 'bg-[#111623] border-[#232a36]'}`}>
                                {type.label}
                            </button>
                        ))}
                    </div>
                    <textarea 
                        value={text} 
                        onChange={e => setText(e.target.value)} 
                        rows={4} 
                        maxLength={charLimit}
                        placeholder="Say something... (#hashtags, @mentions)" 
                        className="w-full bg-[#0b0f14] text-[#e6e6e6] border border-[#232a36] rounded-[10px] p-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                     <div className="text-right text-xs text-[#9ba4b5]">{text.length} / {charLimit}</div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                         <div>
                            <label className="text-xs text-[#9ba4b5] block mb-1">Media (optional)</label>
                            <input onChange={e => setMediaFile(e.target.files ? e.target.files[0] : null)} type="file" accept="image/*,video/*" className="w-full text-sm bg-[#0b0f14] border border-[#232a36] rounded-[10px] file:mr-2 file:py-2 file:px-3 file:rounded-l-[10px] file:border-0 file:bg-[#1a2130] file:text-white" />
                        </div>
                        {composeType === 'album' && (
                            <div>
                                <label className="text-xs text-[#9ba4b5] block mb-1">Alt text (required for images)</label>
                                <input value={altText} onChange={e => setAltText(e.target.value)} type="text" placeholder="Describe the image" className="w-full bg-[#0b0f14] text-[#e6e6e6] border border-[#232a36] rounded-[10px] p-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                            </div>
                        )}
                    </div>
                    {composeType === 'event' && (
                         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                               <label className="text-xs text-[#9ba4b5] block mb-1">Event Title</label>
                                <input value={eventTitle} onChange={e => setEventTitle(e.target.value)} type="text" placeholder="e.g., Navratri Seva Drive" className="w-full bg-[#0b0f14] text-[#e6e6e6] border border-[#232a36] rounded-[10px] p-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                            </div>
                            <div>
                                <label className="text-xs text-[#9ba4b5] block mb-1">Start Date & Time</label>
                                <input value={eventTime} onChange={e => setEventTime(e.target.value)} type="datetime-local" className="w-full bg-[#0b0f14] text-[#e6e6e6] border border-[#232a36] rounded-[10px] p-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                            </div>
                        </div>
                    )}
                </div>
                <div className="flex justify-end gap-2 border-t border-[#232a36] p-4">
                    <Button onClick={onClose} variant="secondary">Cancel</Button>
                    <Button onClick={handleSubmit} disabled={!isValid} variant="primary">Post</Button>
                </div>
            </div>
        </div>
    );
};

export default ComposerModal;
