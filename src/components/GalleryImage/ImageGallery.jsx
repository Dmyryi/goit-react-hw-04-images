import React from 'react';
import styles from './ImageGallery.module.css';
import GalleryImageItem from './GalleryImageItem';

function ImageGallery(props) {
  return (
    <ul className={styles.ImageGallery}>
      {props.imagesArray.map((image, idx) => {
        return (
          <GalleryImageItem
            key={image.id}
            imageLink={image.webformatURL}
            imagAlt={image.tags}
            largeImageURL={image.largeImageURL}
            modalFn={props.modalFn}
          />
        );
      })}
    </ul>
  );
}

export default ImageGallery;
