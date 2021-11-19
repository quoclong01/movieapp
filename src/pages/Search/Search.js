import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import SearchIcon from "@mui/icons-material/Search";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import "./Search.css";
import axios from "axios";
import { useEffect, useState } from "react";
import MovieItem from "../../components/MovieItem/MovieItem";
import CustomPagination from "../../components/Pagination/Pagination";

const Search = () => {
  const [type, setType] = useState(0);
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [numberOfPage, setNumberOfPage] = useState();
  const [searchText, setSearchText] = useState("");

  const fetchSearch = async () => {
    try {
      const { data } = await axios.get(
        `https://api.themoviedb.org/3/search/${type ? "tv" : "movie"}?api_key=${
          process.env.REACT_APP_API_KEY
        }&language=en-US&query=${searchText}&page=${page}&include_adult=false`
      );
      setMovies(data.results);
      setNumberOfPage(data.total_pages);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    window.scroll(0, 0);
    fetchSearch();
    // eslint-disable-next-line
  }, [type, page]);

  return (
    <div className="container-search">
      <h1 className="heading">Search Moives</h1>
      <div>
        <div className="search">
          <TextField
            id="standard-basic"
            label="Search"
            variant="filled"
            fullWidth
            size="normal"
            onChange={(e) => setSearchText(e.target.value)}
            className="input"
          />
          <Button
            variant="contained"
            style={{ marginLeft: 20 }}
            className="btnSearch"
            onClick={fetchSearch}
          >
            <SearchIcon fontSize="large" />
          </Button>
        </div>
        <Tabs
          value={type}
          aria-label="secondary tabs example"
          className="tabs"
          onChange={(e, value) => {
            setType(value);
            setPage(1);
          }}
        >
          <Tab style={{ width: "50%" }} label="Search Movies" />
          <Tab style={{ width: "50%" }} label="Search TV Series" />
        </Tabs>
      </div>
      <div className="trending">
        {movies &&
          movies.map((mv, idx) => (
            <MovieItem
              key={idx}
              id={mv.id}
              title={mv.title ? mv.title : mv.name}
              poster_path={mv.poster_path}
              vote_average={mv.vote_average}
              type={type ? "tv" : "movie"}
              date={mv.release_date ? mv.release_date : mv.first_air_date}
            />
          ))}
        {searchText &&
          !movies &&
          (type ? <h2>No Series Found</h2> : <h2>No Movie Found</h2>)}
      </div>
      {numberOfPage > 1 && (
        <CustomPagination setPage={setPage} numberOfPage={numberOfPage} />
      )}
    </div>
  );
};

export default Search;
