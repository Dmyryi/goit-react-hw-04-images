import React, { useEffect, useCallback } from 'react';
import styles from './Modal.module.css';

const Modal = ({ closeFn, children }) => {
  const handleKeyDown = useCallback(
    e => {
      if (e.code === 'Escape') {
        closeFn();
      }
    },
    [closeFn]
  );

  const handleBackdrop = e => {
    if (e.currentTarget === e.target) {
      closeFn();
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);

    // Cleanup function
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown]);

  return (
    <div className={styles.Overlay} onClick={handleBackdrop}>
      <div className={styles.Modal}>{children}</div>
    </div>
  );
};

export default Modal;
