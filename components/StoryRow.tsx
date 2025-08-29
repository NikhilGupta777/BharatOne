
import React from 'react';
import type { Story } from '../types';
import { Avatar } from './common';

interface StoryRowProps {
  stories: Story[];
}

const StoryItem: React.FC<{ story: Story }> = ({ story }) => (
  <div className="flex flex-col items-center gap-2 cursor-pointer w-20 flex-shrink-0">
    <div className="w-16 h-16 rounded-full p-0.5 bg-gradient-to-tr from-orange-500 via-yellow-400 to-teal-400">
      <div className="w-full h-full rounded-full bg-[#0b0f14] p-0.5">
        <img src={story.img} alt={story.user} className="w-full h-full rounded-full object-cover"/>
      </div>
    </div>
    <p className="text-xs text-center truncate w-full">{story.user}</p>
  </div>
);

const StoryRow: React.FC<StoryRowProps> = ({ stories }) => {
  return (
    <div className="border-y border-dashed border-[#232a36] py-3 px-2">
      <div className="flex gap-4 overflow-x-auto pb-2 -mb-2">
        {stories.map(story => <StoryItem key={story.id} story={story} />)}
      </div>
    </div>
  );
};

export default StoryRow;
