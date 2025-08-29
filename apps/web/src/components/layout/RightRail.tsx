import React from 'react';
import { Panel, Avatar, Button, Chip } from '../shared/common';
import { fmtCount } from '../../lib/utils';
import { useAppContext } from '../../hooks/useAppContext';

const RightRail: React.FC = () => {
    const { data, actions, t, setRoute, actions: { viewProfile } } = useAppContext();
    const { allUsers, trending, communities, events, user } = data;

    // Suggest users that the current user is not already following, and exclude the user themselves.
    const suggestedUsers = allUsers.filter(u => u.id !== user.id && !user.following.has(u.id)).slice(0, 3);

    const handleUserClick = (e: React.MouseEvent, userId: string) => {
        e.stopPropagation();
        viewProfile(userId);
    };

    return (
        <aside className="hidden flex-col gap-4 lg:flex">
            <Panel className="p-4">
                <h3 className="font-bold mb-3 text-sm">{t('whoToFollow')}</h3>
                <div className="flex flex-col gap-3">
                    {suggestedUsers.map(u => {
                        const isFollowing = user.following.has(u.id);
                        return (
                            <div key={u.id} className="flex items-center gap-3">
                                <div onClick={(e) => handleUserClick(e, u.id)} className="cursor-pointer">
                                    <Avatar size="sm" />
                                </div>
                                <div onClick={(e) => handleUserClick(e, u.id)} className="flex-1 cursor-pointer">
                                    <p className="font-bold text-sm hover:underline">{u.name}</p>
                                    <p className="text-xs text-text-muted">@{u.handle}</p>
                                </div>
                                <Button onClick={() => actions.toggleFollow(u.id)} className="text-xs px-3 py-1 w-20" variant={isFollowing ? 'secondary' : 'primary'}>
                                    {isFollowing ? t('following') : t('follow')}
                                </Button>
                            </div>
                        )
                    })}
                </div>
            </Panel>
            <Panel className="p-4">
                <h3 className="font-bold mb-3 text-sm">{t('trending')}</h3>
                <div className="flex flex-wrap gap-2">
                    {trending.slice(0, 5).map(tag => <Chip key={tag}>{tag}</Chip>)}
                </div>
            </Panel>
            <Panel className="p-4">
                <h3 className="font-bold mb-3 text-sm">{t('communitiesForYou')}</h3>
                <div className="flex flex-col gap-3">
                    {communities.slice(0, 2).map(c => (
                        <div key={c.id} className="flex items-center gap-3">
                            <Avatar size="sm" />
                            <div className="flex-1">
                                <p className="font-bold text-sm">{c.name}</p>
                                <p className="text-xs text-text-muted">{fmtCount(c.members)} members</p>
                            </div>
                            <Button onClick={() => actions.toggleCommunityJoin(c.id)} className="text-xs px-3 py-1 w-20">
                                {c.joined ? t('joined') : t('join')}
                            </Button>
                        </div>
                    ))}
                </div>
            </Panel>
            <Panel className="p-4">
                <h3 className="font-bold mb-3 text-sm">{t('upcomingEvents')}</h3>
                <div className="flex flex-col gap-3">
                    {events.slice(0,2).map(ev => (
                        <div key={ev.id} className="flex items-center gap-3">
                            <Avatar size="sm" />
                            <div className="flex-1">
                                <p className="font-bold text-sm">{ev.title}</p>
                                <p className="text-xs text-text-muted">{new Date(ev.when).toLocaleDateString()}</p>
                            </div>
                             <Button onClick={() => actions.toggleEventRsvp(ev.id)} className="text-xs px-3 py-1 w-24">
                                {ev.going ? t('going') : t('interested')}
                            </Button>
                        </div>
                    ))}
                </div>
            </Panel>
        </aside>
    );
};

export default RightRail;