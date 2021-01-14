import React, { useEffect, useState } from 'react';
import YouTube from 'react-youtube';
import axios from './axios';
import './Row.scss';
import movieTrailer from 'movie-trailer';

const imgBaseUrl = 'https://image.tmdb.org/t/p/original';

function Row({ title, fetchUrl, isLargeRow }) {
  const [movies, setMovies] = useState([]);
  const [trailerUrl, setTrailerUrl] = useState('');
  const [selectedMovie, setSelectedMovie] = useState('');
  const opts = {
    height: '390',
    width: '100%',
    playerVars: {
      autoplay: 1,
    },
  };

  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(fetchUrl);
      setMovies(request.data.results);
      return request;
    }
    fetchData();
  }, [fetchUrl]);

  const handleClick = (movie) => {
    setSelectedMovie(movie.id);
    if(movie.id === selectedMovie) {
      setTrailerUrl('')
    } else {
      movieTrailer(movie?.name || '').then((url) => {
        const urlParams = new URLSearchParams(new URL(url).search);
        setTrailerUrl(urlParams.get('v'));
      });
    }
  };

  return (
    <div className='row'>
      <h2>{title}</h2>
      <div className='row__posters'>
        {movies.map((movie) => (
          <img
            className={`row__poster ${isLargeRow && 'row__posterLarge'}`}
            key={movie.id}
            onClick={() => handleClick(movie)}
            src={`${imgBaseUrl}${
              isLargeRow ? movie?.poster_path : movie?.backdrop_path
            }`}
            alt={movie.name}
          ></img>
        ))}
      </div>
      {trailerUrl && <YouTube videoId={trailerUrl} opts={opts} />}
    </div>
  );
}

export default Row;
