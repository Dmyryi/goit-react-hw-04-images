import React from 'react';
import styles from './SearchBar.module.css';

function Searchbar(props) {
  return (
    <header className={styles.Searchbar}>
      <form
        className={styles.SearchForm}
        onSubmit={event => props.onSubmit(event)}
      >
        <button type="submit" className={styles.SearchForm_button}>
          <span className={styles.SearchForm_button_label}>Search</span>
        </button>

        <input
          className={styles.SearchForm_input}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
      </form>
    </header>
  );
}

export default Searchbar;
