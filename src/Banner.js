import React, { useEffect, useState } from 'react';
import requests from './requests';
import axios from './axios';
import './Banner.scss';

const imgBaseUrl = 'https://image.tmdb.org/t/p/original';

function Banner() {
  const [movie, setMovie] = useState({});

  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(requests.fetchNetflixOriginals);
      const randomNo = Math.floor(
        Math.random() * request.data.results.length - 1
      );
      setMovie(request.data.results[randomNo]);
    }
    fetchData();
  }, []);

  function truncate(str, n) {
    return str?.length > n ? str.substr(0, n - 1) + '...' : str;
  }

  return (
    <header
      className='banner'
      style={{
        backgroundSize: 'cover',
        backgroundPosition: 'center center',
        backgroundImage: `url("${imgBaseUrl}${movie?.backdrop_path}")`,
      }}
    >
      <div className='banner__contents'>
        <h1 className='banner__title'>
          {movie?.title || movie?.name || movie?.original_name}
        </h1>
        <div className='banner__buttons'>
          <button type='button' className='banner__button'>
            Play
          </button>
          <button type='button' className='banner__button'>
            My List
          </button>
        </div>
        <p className='banner__description'>{truncate(movie?.overview, 150)}</p>
      </div>
    </header>
  );
}

export default Banner;
