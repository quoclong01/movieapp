import axios from "axios";
import { useEffect, useState } from "react";
import "./Treding.css";
import MovieItem from "../../components/MovieItem/MovieItem";
import CustomPagination from "../../components/Pagination/Pagination";

const Trending = () => {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);

  const fetchTreding = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/trending/all/day?api_key=${process.env.REACT_APP_API_KEY}&page=${page}`
    );
    setMovies(data.results);
  };
  useEffect(() => {
    window.scroll(0, 0);
    fetchTreding();
    // eslint-disable-next-line
  }, [page]);

  return (
    <div>
      <h1 className="heading">Trending Today</h1>
      <div className="trending">
        {movies &&
          movies.map((mv, idx) => (
            <MovieItem
              key={idx}
              id={mv.id}
              title={mv.title ? mv.title : mv.name}
              poster_path={mv.poster_path}
              vote_average={mv.vote_average}
              type={mv.media_type}
              date={mv.release_date ? mv.release_date : mv.first_air_date}
            />
          ))}
      </div>
      <CustomPagination setPage={setPage} />
    </div>
  );
};

export default Trending;
