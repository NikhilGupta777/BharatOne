
import React from 'react';
import { Button } from './common';
import { BellIcon } from './Icons';

interface TopbarProps {
    onComposeClick: () => void;
    onNotifsClick: () => void;
    notifsCount: number;
}

const Topbar: React.FC<TopbarProps> = ({ onComposeClick, onNotifsClick, notifsCount }) => {
  return (
    <header className="sticky top-0 z-50 grid items-center gap-4 border-b border-[#232a36] bg-opacity-75 bg-[#0d1117] p-3 backdrop-blur-md md:grid-cols-[220px_1fr_420px] md:px-4">
      <div className="brand flex items-center gap-2.5">
        <div className="logo h-9 w-9 rounded-[10px] bg-[radial-gradient(120%_150%_at_0%_0%,#ffd166_0%,#ff7a00_35%,#c2410c_75%)] shadow-[inset_0_0_0_2px_rgba(255,255,255,.08),0_10px_30px_rgba(0,0,0,.35)]"></div>
        <h1 className="text-lg font-bold tracking-wide">BharatOne</h1>
      </div>
      <div className="search hidden md:block">
        <input
          className="w-full rounded-xl border border-[#232a36] bg-[#0b0f14] p-2.5 text-sm text-[#e6e6e6] placeholder-[#9ba4b5] focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          type="text"
          placeholder="Search posts, people, tags, communities..."
        />
      </div>
      <div className="actions flex items-center justify-end gap-2.5">
        <Button onClick={onComposeClick} variant="primary">+ Compose</Button>
        <Button onClick={onNotifsClick} variant="secondary" className="relative">
          <BellIcon />
          {notifsCount > 0 && (
            <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-xs font-bold text-white">{notifsCount}</span>
          )}
        </Button>
        <div className="h-9 w-9 cursor-pointer rounded-full bg-indigo-500"></div>
      </div>
    </header>
  );
};

export default Topbar;
