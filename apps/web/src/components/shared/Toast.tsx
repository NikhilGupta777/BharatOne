import React, { useState, useEffect } from 'react';
import { useAppContext } from '../../hooks/useAppContext';
import type { Toast as ToastType } from '../../lib/types';

const Toast: React.FC<{ toast: ToastType }> = ({ toast }) => {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        setVisible(true); // Trigger fade in
        const timer = setTimeout(() => setVisible(false), 2700); // Start fade out before removal
        return () => clearTimeout(timer);
    }, []);

    const baseClasses = "transition-all duration-300 ease-in-out transform";
    const visibilityClasses = visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4";
    
    return (
        <div className={`bg-[#131a26] border border-border-color py-2.5 px-4 rounded-lg shadow-lg text-sm text-text-primary ${baseClasses} ${visibilityClasses}`}>
            {toast.message}
        </div>
    );
};

export const ToastContainer: React.FC = () => {
    const { toasts } = useAppContext();

    return (
        <div className="fixed bottom-4 right-4 z-[100] flex flex-col gap-3">
            {toasts.map(toast => <Toast key={toast.id} toast={toast} />)}
        </div>
    );
};
