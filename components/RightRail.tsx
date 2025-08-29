
import React from 'react';
import type { SuggestedUser, Community, Event } from '../types';
import { Panel, Avatar, Button, Chip } from './common';

const fmtCount = (n: number) => {
    if (n >= 10000000) return (n / 10000000).toFixed(1) + 'Cr';
    if (n >= 100000) return (n / 100000).toFixed(1) + 'L';
    if (n >= 1000) return (n / 1000).toFixed(1) + 'K';
    return String(n);
};

interface RightRailProps {
    suggestedUsers: SuggestedUser[];
    trending: string[];
    communities: Community[];
    events: Event[];
}

const RightRail: React.FC<RightRailProps> = ({ suggestedUsers, trending, communities, events }) => {
    return (
        <aside className="hidden flex-col gap-4 lg:flex">
            <Panel className="p-4">
                <h3 className="font-bold mb-3 text-sm">Who to follow</h3>
                <div className="flex flex-col gap-3">
                    {suggestedUsers.map(user => (
                        <div key={user.id} className="flex items-center gap-3">
                            <Avatar size="sm" />
                            <div className="flex-1">
                                <p className="font-bold text-sm">{user.name}</p>
                                <p className="text-xs text-[#9ba4b5]">@{user.handle} &bull; {user.followers}</p>
                            </div>
                            <Button className="text-xs px-3 py-1">Follow</Button>
                        </div>
                    ))}
                </div>
            </Panel>
            <Panel className="p-4">
                <h3 className="font-bold mb-3 text-sm">Trending in Bharat</h3>
                <div className="flex flex-wrap gap-2">
                    {trending.slice(0, 5).map(tag => <Chip key={tag}>{tag}</Chip>)}
                </div>
            </Panel>
            <Panel className="p-4">
                <h3 className="font-bold mb-3 text-sm">Communities for you</h3>
                <div className="flex flex-col gap-3">
                    {communities.slice(0, 2).map(c => (
                        <div key={c.id} className="flex items-center gap-3">
                            <Avatar size="sm" />
                            <div className="flex-1">
                                <p className="font-bold text-sm">{c.name}</p>
                                <p className="text-xs text-[#9ba4b5]">{fmtCount(c.members)} members</p>
                            </div>
                            <Button className="text-xs px-3 py-1">{c.joined ? 'Joined' : 'Join'}</Button>
                        </div>
                    ))}
                </div>
            </Panel>
            <Panel className="p-4">
                <h3 className="font-bold mb-3 text-sm">Upcoming events</h3>
                <div className="flex flex-col gap-3">
                    {events.slice(0,2).map(ev => (
                        <div key={ev.id} className="flex items-center gap-3">
                            <Avatar size="sm" />
                            <div className="flex-1">
                                <p className="font-bold text-sm">{ev.title}</p>
                                <p className="text-xs text-[#9ba4b5]">{new Date(ev.when).toLocaleDateString()}</p>
                            </div>
                            <Button className="text-xs px-3 py-1">{ev.going ? 'Going' : 'Interested'}</Button>
                        </div>
                    ))}
                </div>
            </Panel>
        </aside>
    );
};

export default RightRail;
