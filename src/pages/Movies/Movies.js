import axios from "axios";
import { useEffect, useState } from "react";
import Genres from "../../components/Genres/Genres";
import MovieItem from "../../components/MovieItem/MovieItem";
import CustomPagination from "../../components/Pagination/Pagination";
import useGenre from "../../hooks/useGenres";

const Movies = () => {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [numberOfPage, setNumberOfPage] = useState();
  const [genres, setGenres] = useState([]);
  const [selectedGenres, setSelectedGenres] = useState([]);
  const genresURL = useGenre(selectedGenres);

  const fetchMovies = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}&with_genres=${genresURL}`
    );
    setMovies(data.results);
    setNumberOfPage(data.total_pages);
  };
  useEffect(() => {
    window.scroll(0, 0);
    fetchMovies();
    // eslint-disable-next-line
  }, [genresURL, page]);

  return (
    <div>
      <h1 className="heading">DISCOVER SERIES</h1>
      <Genres
        selectedGenres={selectedGenres}
        setSelectedGenres={setSelectedGenres}
        genres={genres}
        setGenres={setGenres}
        type="movie"
        setPage={setPage}
      />
      <div className="trending">
        {movies &&
          movies.map((mv, idx) => (
            <MovieItem
              key={idx}
              id={mv.id}
              title={mv.title ? mv.title : mv.name}
              poster_path={mv.poster_path}
              vote_average={mv.vote_average}
              type="movie"
              date={mv.release_date ? mv.release_date : mv.first_air_date}
            />
          ))}
      </div>
      {numberOfPage > 1 && (
        <CustomPagination setPage={setPage} numberOfPage={numberOfPage} />
      )}
    </div>
  );
};

export default Movies;
