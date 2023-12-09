import React from 'react';
import styles from './ImageGallery.module.css';
function ImageGalleryItem(props) {
  return (
    <li className={styles.ImageGalleryItem}>
      <img
        onClick={e => {
          props.modalFn(e.target.attributes[1].value);
          console.log(e);
        }}
        src={props.imageLink}
        alt={props.imageAlt}
        data-large={props.largeImageURL}
        className={styles.ImageGalleryItem_image}
      />
    </li>
  );
}

export default ImageGalleryItem;
