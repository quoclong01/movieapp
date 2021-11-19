import axios from "axios";
import { useEffect, useState } from "react";
import MovieItem from "../../components/MovieItem/MovieItem";
import CustomPagination from "../../components/Pagination/Pagination";
import useGenre from "../../hooks/useGenres";
import Genres from "../../components/Genres/Genres";

const Series = () => {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [numberOfPage, setNumberOfPage] = useState();
  const [genres, setGenres] = useState([]);
  const [selectedGenres, setSelectedGenres] = useState([]);
  const genresURL = useGenre(selectedGenres);

  const fetchSeries = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/discover/tv?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}&with_genres=${genresURL}`
    );
    setMovies(data.results);
    setNumberOfPage(data.total_pages);
  };
  useEffect(() => {
    window.scroll(0, 0);
    fetchSeries();
    // eslint-disable-next-line
  }, [genresURL, page]);

  return (
    <div>
      <h1 className="heading">discover series</h1>
      <Genres
        selectedGenres={selectedGenres}
        setSelectedGenres={setSelectedGenres}
        genres={genres}
        setGenres={setGenres}
        type="tv"
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
              type="tv"
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

export default Series;
