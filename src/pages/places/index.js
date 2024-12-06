import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './places.module.css';

const Places = () => {
  const [places, setPlaces] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const placesPerPage = 10;

  useEffect(() => {
    // Fetching data from backend
    const fetchPlaces = async () => {
      try {
        const response = await axios.get('/api/places');
        setPlaces(response.data);
      } catch (error) {
        console.error('Failed to fetch places:', error);
      }
    };
    fetchPlaces();
  }, []);

  // Pagination logic
  const indexOfLastPlace = currentPage * placesPerPage;
  const indexOfFirstPlace = indexOfLastPlace - placesPerPage;
  const currentPlaces = places.slice(indexOfFirstPlace, indexOfLastPlace);

  const totalPages = Math.ceil(places.length / placesPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>Tocloc</h1>
      </header>
      <main className={styles.main}>
        <h2 className={styles.pageTitle}>Locais Disponíveis</h2>
        <div className={styles.cardContainer}>
          {currentPlaces.map((place) => (
            <div key={place.id} className={styles.card}>
              <div className={styles.cardHeader}>
                <h3 className={styles.placeName}>{place.name}</h3>
                <span className={styles.placePrice}>R$ {place.pricePerHour}/h</span>
              </div>
              <p className={styles.placeDescription}>{place.description}</p>
              <p className={styles.placeAddress}>{place.address}</p>
              <button className={styles.rentButton}>Alugar</button>
            </div>
          ))}
        </div>
        <div className={styles.pagination}>
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index + 1}
              onClick={() => handlePageChange(index + 1)}
              className={`${styles.pageButton} ${
                currentPage === index + 1 ? styles.active : ''
              }`}
            >
              {index + 1}
            </button>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Places;
