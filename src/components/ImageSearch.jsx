import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ImageSearch.module.css';

const ImageSearch = () => {
  const [query, setQuery] = useState('');
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const API_KEY = '45861214-76b95c96ea530b9f2dd96e8b0';
  const API_URL = 'https://pixabay.com/api/';

  useEffect(() => {
    if (!query) return;

    const fetchImages = async () => {
      setLoading(true);
      try {
        const response = await axios.get(API_URL, {
          params: {
            key: API_KEY,
            q: query,
            image_type: 'photo',
            per_page: 12,
          },
        });
        setImages(response.data.hits);
      } catch (error) {
        setError('Failed to fetch images. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchImages();
  }, [query]);

  const handleSearch = e => {
    e.preventDefault();
    setQuery(e.target.elements.query.value);
  };

  return (
    <div>
      <h1>Image Search</h1>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          name="query"
          placeholder="Search for images"
          required
        />
        <button type="submit">Search</button>
      </form>

      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}

      <div className="image-gallery">
        {images.length === 0 && !loading && <p>No images found.</p>}
        {images.map(image => (
          <div key={image.id} className="image-item">
            <img src={image.webformatURL} alt={image.tags} />
            <p>{image.tags}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageSearch;
