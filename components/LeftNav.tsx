
import React from 'react';
import type { Route } from '../types';
import { Panel } from './common';
import { HomeIcon, ExploreIcon, CommunitiesIcon, EventsIcon, BookmarksIcon, ProfileIcon, AdminIcon } from './Icons';

interface LeftNavProps {
  route: Route;
  setRoute: (route: Route) => void;
}

const navItems = [
  { route: 'home' as Route, label: 'Home', icon: HomeIcon },
  { route: 'explore' as Route, label: 'Explore', icon: ExploreIcon },
  { route: 'communities' as Route, label: 'Communities', icon: CommunitiesIcon },
  { route: 'events' as Route, label: 'Events', icon: EventsIcon },
  { route: 'bookmarks' as Route, label: 'Bookmarks', icon: BookmarksIcon },
  { route: 'profile' as Route, label: 'Profile', icon: ProfileIcon },
  { route: 'admin' as Route, label: 'Admin', icon: AdminIcon },
];

const NavItem: React.FC<{
  label: string;
  icon: React.ElementType;
  isActive: boolean;
  onClick: () => void;
}> = ({ label, icon: Icon, isActive, onClick }) => (
  <div
    className={`flex cursor-pointer items-center gap-2.5 rounded-xl p-3 text-sm transition-colors ${isActive ? 'bg-[#1a1f2b] font-semibold' : 'hover:bg-[#1a1f2b]'}`}
    onClick={onClick}
  >
    <Icon className="h-5 w-5" />
    <span>{label}</span>
  </div>
);

const LeftNav: React.FC<LeftNavProps> = ({ route, setRoute }) => {
  return (
    <nav className="sticky top-[72px] hidden self-start lg:block">
      <Panel className="p-3">
        <div className="flex flex-col gap-1">
          {navItems.map(item => (
            <NavItem 
              key={item.route}
              label={item.label}
              icon={item.icon}
              isActive={route === item.route}
              onClick={() => setRoute(item.route)}
            />
          ))}
        </div>
        <div className="my-3 border-t border-[#232a36]"></div>
        <div className="text-xs text-[#9ba4b5] space-y-2 p-2">
            <p>Shortcuts:</p>
            <div className="flex flex-wrap gap-2">
                <span className="bg-[#0d1220] px-1.5 py-0.5 rounded-md border border-[#232a36]">/</span> search
                <span className="bg-[#0d1220] px-1.5 py-0.5 rounded-md border border-[#232a36]">C</span> compose
                <span className="bg-[#0d1220] px-1.5 py-0.5 rounded-md border border-[#232a36]">N</span> notifs
            </div>
        </div>
      </Panel>
    </nav>
  );
};

export default LeftNav;
