import axios from "axios";
import "./Genres.css";
import { Chip } from "@mui/material";
import { useEffect } from "react";

const Genres = ({
  selectedGenres,
  setSelectedGenres,
  genres,
  setGenres,
  type,
  setPage,
}) => {
  const handleAdd = (genre) => {
    setSelectedGenres([...selectedGenres, genre]);
    setGenres(genres.filter((g) => g.id !== genre.id));
    setPage(1);
  };

  const handleRemove = (genre) => {
    setGenres([...genres, genre]);
    setSelectedGenres(
      selectedGenres.filter((selected) => selected.id !== genre.id)
    );
    setPage(1);
  };

  const fetchGenres = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/genre/${type}/list?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
    );
    setGenres(data.genres);
  };

  useEffect(() => {
    fetchGenres();
    return () => {
      setGenres({}); // unmounting
    };
    // eslint-disable-next-line
  }, []);

  return (
    <div className="genres">
      {selectedGenres &&
        selectedGenres.map((genre) => (
          <Chip
            label={genre.name}
            key={genre.id}
            size="large"
            clickable
            className="chip"
            style={{ backgroundColor: "#545a96" }}
            onDelete={() => handleRemove(genre)}
          />
        ))}
      {genres &&
        genres.map((genre) => (
          <Chip
            label={genre.name}
            key={genre.id}
            size="large"
            clickable
            className="chip"
            style={{ backgroundColor: "#373b69" }}
            onClick={() => handleAdd(genre)}
          />
        ))}
    </div>
  );
};

export default Genres;
