
import React from 'react';
import type { Notification } from '../types';
import { Avatar } from './common';
import { CloseIcon } from './Icons';

interface NotificationsPanelProps {
    isOpen: boolean;
    onClose: () => void;
    notifications: Notification[];
}

const NotificationsPanel: React.FC<NotificationsPanelProps> = ({ isOpen, onClose, notifications }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50">
            <div className="absolute inset-0 bg-black bg-opacity-50" onClick={onClose}></div>
            <div className="absolute top-0 right-0 h-full w-[min(500px,92vw)] bg-[#0d1117] border-l border-[#232a36] shadow-[0_10px_30px_rgba(0,0,0,.35)] flex flex-col">
                <div className="flex items-center justify-between border-b border-[#232a36] p-4 flex-shrink-0">
                    <h2 className="font-bold">Notifications</h2>
                    <button onClick={onClose} className="p-1 rounded-full hover:bg-[#1a2130]"><CloseIcon /></button>
                </div>
                <div className="overflow-y-auto p-3 space-y-2">
                    {notifications.length > 0 ? (
                        [...notifications].reverse().map(notif => (
                            <div key={notif.id} className="flex items-center gap-3 p-2.5 rounded-xl bg-[#121722] border border-[#232a36]">
                                <Avatar size="sm" />
                                <div className="text-sm">
                                    <p><span className="font-bold">{notif.actor}</span> {notif.msg}</p>
                                    <p className="text-xs text-[#9ba4b5] mt-0.5">{notif.time}</p>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className="text-center text-sm text-[#9ba4b5] p-8">No notifications yet.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default NotificationsPanel;
