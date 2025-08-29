import React from 'react';
import { useAppContext } from '../hooks/useAppContext';
import Topbar from '../components/layout/Topbar';
import LeftNav from '../components/layout/LeftNav';
import RightRail from '../components/layout/RightRail';
import MainContent from '../components/main/MainContent';
import ComposerModal from '../components/modals/ComposerModal';
import NotificationsPanel from '../components/modals/NotificationsPanel';

const App: React.FC = () => {
  const {
    data,
    route,
    setRoute,
    isComposerOpen,
    setComposerOpen,
    isNotifsOpen,
    setNotifsOpen
  } = useAppContext();

  return (
    <div className="min-h-screen bg-background text-text-primary">
      <Topbar 
        onComposeClick={() => setComposerOpen(true)} 
        onNotifsClick={() => setNotifsOpen(true)} 
        notifsCount={data.notifs.length} 
      />
      <div className="app-grid-container mx-auto max-w-[1400px] gap-4 p-4">
        {/* FIX: Removed props from LeftNav as it consumes data from context. */}
        <LeftNav />
        <MainContent />
        {/* FIX: Removed props from RightRail as it consumes data from context. */}
        <RightRail />
      </div>
      <ComposerModal 
        isOpen={isComposerOpen} 
        onClose={() => setComposerOpen(false)}
      />
      <NotificationsPanel
        isOpen={isNotifsOpen}
        onClose={() => setNotifsOpen(false)}
        notifications={data.notifs}
      />
    </div>
  );
};

export default App;