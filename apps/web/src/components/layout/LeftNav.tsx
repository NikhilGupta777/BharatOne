import React from 'react';
import type { Route } from '../../lib/types';
import { Panel } from '../shared/common';
import { HomeIcon, ExploreIcon, CommunitiesIcon, EventsIcon, BookmarksIcon, ProfileIcon, AdminIcon } from '../shared/Icons';
import { useI18n } from '../../i18n/I18nProvider';
import { useAppContext } from '../../hooks/useAppContext';

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

const LeftNav: React.FC = () => {
  const { t } = useI18n();
  const { route, setRoute, actions, data } = useAppContext();
  
  const navItems = [
    { route: 'home' as Route, label: t('home'), icon: HomeIcon, action: () => setRoute('home') },
    { route: 'explore' as Route, label: t('explore'), icon: ExploreIcon, action: () => setRoute('explore') },
    { route: 'communities' as Route, label: t('communities'), icon: CommunitiesIcon, action: () => setRoute('communities') },
    { route: 'events' as Route, label: t('events'), icon: EventsIcon, action: () => setRoute('events') },
    { route: 'bookmarks' as Route, label: t('bookmarks'), icon: BookmarksIcon, action: () => setRoute('bookmarks') },
    { route: 'profile' as Route, label: t('profile'), icon: ProfileIcon, action: () => actions.viewProfile(data.user.id) },
    { route: 'admin' as Route, label: t('admin'), icon: AdminIcon, action: () => setRoute('admin') },
  ];

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
              onClick={item.action}
            />
          ))}
        </div>
        <div className="my-3 border-t border-border-color"></div>
        <div className="text-xs text-text-muted space-y-2 p-2">
            <p>{t('shortcuts')}:</p>
            <div className="flex flex-wrap gap-2">
                <span className="bg-[#0d1220] px-1.5 py-0.5 rounded-md border border-border-color">/</span> {t('search')}
                <span className="bg-[#0d1220] px-1.5 py-0.5 rounded-md border border-border-color">C</span> {t('compose')}
                <span className="bg-[#0d1220] px-1.5 py-0.5 rounded-md border border-border-color">N</span> {t('notifications')}
            </div>
        </div>
      </Panel>
    </nav>
  );
};

export default LeftNav;