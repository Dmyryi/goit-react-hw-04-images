import React, { useState, useEffect } from 'react';
import { CirclesWithBar } from 'react-loader-spinner';
import styles from './App.module.css';
import Searchbar from './SearchBar/SearchBar';
import ImageGallery from './GalleryImage/ImageGallery';
import Button from './Button/Button';
import Modaling from './Modal/Modaling';
import { fetchImages } from '../api';

function App() {
  const [searchWords, setSearchWords] = useState('');
  const [images, setImages] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [modalImage, setModalImage] = useState('');
  const [showLoader, setShowLoader] = useState(false);
  const [loadMore, setLoadMore] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalHits, setTotalHits] = useState(0);

  useEffect(() => {
    setShowLoader(true);

    fetchImages(searchWords, currentPage)
      .then(response => {
        pushImagesToState(response);
        setTotalHits(response.data.totalHits);
        setLoadMore(currentPage < Math.ceil(totalHits / 12));
      })
      .catch(error => {
        console.error('Error fetching images:', error);
      })
      .finally(() => {
        setShowLoader(false);
      });
    // eslint-disable-next-line
  }, [searchWords, currentPage]);

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const pushImagesToState = response => {
    const imagesFromResponse = response.data.hits;
    let newSearchArray = [...images, ...imagesFromResponse];
    setImages(newSearchArray);
  };

  const sModalImage = linkImg => {
    setModalImage(linkImg);
  };

  const openLargeImage = linkImg => {
    sModalImage(linkImg);
    toggleModal();
  };

  const loaderToggle = bool => {
    setShowLoader(bool);
  };

  const searchFormSubmit = event => {
    event.preventDefault();
    setImages([]);
    setShowModal(false);
    setModalImage('');
    setCurrentPage(1);
    const searchWordsValue = event.target[1].value;
    setSearchWords(searchWordsValue);
    event.target.reset();
  };

  const loadMoreFn = () => {
    setCurrentPage(prevCurrentPage => prevCurrentPage + 1);
    loaderToggle(true);
  };

  return (
    <div className={styles.App}>
      {showModal && (
        <Modaling closeFn={toggleModal} loader={loaderToggle} id="modal-root">
          <img src={modalImage} alt="modal" />
        </Modaling>
      )}
      <Searchbar onSubmit={searchFormSubmit} />

      {searchWords !== '' && (
        <ImageGallery
          loader={loaderToggle}
          imagesArray={images}
          modalFn={openLargeImage}
        />
      )}
      {showLoader && (
        <CirclesWithBar
          className={styles.spin}
          type="Bars"
          color="#00BFFF"
          height={80}
          width={80}
        />
      )}

      {loadMore && <Button fn={loadMoreFn} />}
    </div>
  );
}

export default App;
