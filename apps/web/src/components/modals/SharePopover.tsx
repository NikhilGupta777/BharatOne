import React, { useEffect, useRef } from 'react';
import { useI18n } from '../../i18n/I18nProvider';

interface SharePopoverProps {
    onClose: () => void;
    onCopyLink: () => void;
}

const SharePopover: React.FC<SharePopoverProps> = ({ onClose, onCopyLink }) => {
    const { t } = useI18n();
    const popoverRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (popoverRef.current && !popoverRef.current.contains(event.target as Node)) {
                onClose();
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [onClose]);

    return (
        <div 
            ref={popoverRef}
            className="absolute bottom-full mb-2 right-0 w-36 bg-panel-2 border border-border-color rounded-lg shadow-lg z-10"
        >
            <button 
                onClick={onCopyLink}
                className="w-full text-left text-sm px-3 py-2 hover:bg-[#222b3f] rounded-lg"
            >
                {t('copyLink')}
            </button>
        </div>
    );
};

export default SharePopover;
