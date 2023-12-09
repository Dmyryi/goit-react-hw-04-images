import React from 'react';
import styles from './Button.module.css';

function Button(props) {
  window.scrollTo({
    top: document.documentElement.scrollHeight,
    behavior: 'smooth',
  });
  return (
    <button className={styles.Button} type="button" onClick={e => props.fn()}>
      Load more
    </button>
  );
}

export default Button;
