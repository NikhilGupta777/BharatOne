import React from 'react';
import { useAppContext } from '../hooks/useAppContext';
import Topbar from '../components/layout/Topbar';
import LeftNav from '../components/layout/LeftNav';
import RightRail from '../components/layout/RightRail';
import MainContent from '../components/main/MainContent';
import ComposerModal from '../components/modals/ComposerModal';
import NotificationsPanel from '../components/modals/NotificationsPanel';
import CommentsModal from '../components/modals/CommentsModal';
import { ToastContainer } from '../components/shared/Toast';

const App: React.FC = () => {
  const {
    data,
    isComposerOpen,
    setComposerOpen,
    isNotifsOpen,
    setNotifsOpen,
    commentsModalPostId,
    setCommentsModalPostId,
  } = useAppContext();

  return (
    <div className="min-h-screen bg-background text-text-primary">
      <Topbar 
        onComposeClick={() => setComposerOpen(true)} 
        onNotifsClick={() => setNotifsOpen(true)} 
        notifsCount={data.notifs.length} 
      />
      <div className="app-grid-container mx-auto max-w-[1400px] gap-4 p-4">
        <LeftNav />
        <MainContent />
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
      <CommentsModal
        postId={commentsModalPostId}
        isOpen={!!commentsModalPostId}
        onClose={() => setCommentsModalPostId(null)}
      />
      <ToastContainer />
    </div>
  );
};

export default App;
