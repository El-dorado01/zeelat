// resources/js/components/Toast.jsx
import { useEffect, useState } from 'react';

const Toast = ({ message, type = 'success', duration = 3000, onClose }) => {
    const styles = {
        toast: {
            position: 'fixed',
            bottom: '16px',
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: '1000',
            maxWidth: '400px',
            width: '90%',
            padding: '12px 16px',
            borderRadius: '8px',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
            fontSize: '16px',
            transition: 'opacity 0.3s ease-in-out, transform 0.3s ease-in-out',
            color: '#fff',
        },
        toastSuccess: {
            backgroundColor: '#28a745',
        },
        toastError: {
            backgroundColor: '#dc3545',
        },
        toastInfo: {
            backgroundColor: '#007bff',
        },
        toastShow: {
            opacity: '1',
            transform: 'translateX(-50%) translateY(0)', 
        },
        toastHide: {
            opacity: '0',
            transform: 'translateX(-50%) translateY(20px)',
        },
        toastContent: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
        },
        toastClose: {
            background: 'none',
            border: 'none',
            color: 'inherit',
            fontSize: '18px',
            cursor: 'pointer',
            padding: '0 8px',
            lineHeight: '1',
        },
    };

    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        if (message) {
            setIsVisible(true);
            const timer = setTimeout(() => {
                setIsVisible(false);
                if (onClose) onClose();
            }, duration);
            return () => clearTimeout(timer); 
        }
    }, [message, duration, onClose]);

    if (!message || !isVisible) return null;

    const toastStyle = {
        ...styles.toast,
        ...(type === 'success' ? styles.toastSuccess : type === 'error' ? styles.toastError : styles.toastInfo),
        ...(isVisible ? styles.toastShow : styles.toastHide),
    };

    return (
        <div style={toastStyle}>
            <div style={styles.toastContent}>
                <span>{message}</span>
                <button onClick={() => setIsVisible(false)} style={styles.toastClose}>
                    ✕
                </button>
            </div>
        </div>
    );
};

export default Toast;
