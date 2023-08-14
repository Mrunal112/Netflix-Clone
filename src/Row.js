import React, { useEffect, useState } from 'react'
import axios from './axios'
import './row.css'
import YouTube from 'react-youtube';
import movieTrailer from 'movie-trailer';

const base_url = "https://image.tmdb.org/t/p/original";

function Row({ title, fetchUrl, isLargeRow }) {
  const [movies, setMovies] = useState([]);
  const [trailerUrl, setTrailerUrl] = useState("");

  useEffect(() => {
    // If [], run once and then when the row loads, and dont run agian
    async function fetchData() {
      const request = await axios.get(fetchUrl);
      setMovies(request.data.results);
      return request;
    }
    fetchData();
  }, [fetchUrl]);

  // console.table(movies);

  const opts = {
    height: "480",
    width: "100%",
    playerVars: {
      autoplay: 1,
    }
  }

  const handleClick = (movie) => {
    // console.table(movie?.title)
    if (trailerUrl) {
      setTrailerUrl('')
    } else {
      movieTrailer(movie?.title || "")
        .then(url => {
          const urlParams = new URLSearchParams(new URL(url).search);
          setTrailerUrl(urlParams.get('v'));
        }).catch((error) => console.log(error));
    }
  }

  // const handleClick = (movie) => {
  //   // console.table(movie?.title)
  //   if (trailerUrl) {
  //     setTrailerUrl('')
  //   } else {
  //     movieTrailer(null, { tmdbId: movie.id })
  //       .then((url) => {
  //         console.log("url is " + url);
  //         const urlParams = new URLSearchParams(new URL(url).search);
  //         console.log("urlParamsn" + urlParams);
  //         setTrailerUrl(urlParams.get("v"));
  //       })
  //       .catch((error) => console.log(error));
  //   }
  // }


return (
  <div className="row" >
    <h2 className="posters__title">{title}</h2>
    <div className="row__posters">
      { }
      {movies.map(movie => {
        return <img
          key={movie.id}
          onClick={() => handleClick(movie)}
          className={`row__poster ${isLargeRow && "row_posterLarge"}`}
          src={`${base_url}${isLargeRow ? movie.poster_path : movie.backdrop_path}`} alt={movie.name} />
      })}
    </div>
    {trailerUrl && <YouTube videoId={trailerUrl} opts={opts} />}
  </div>
)
}

export default Row