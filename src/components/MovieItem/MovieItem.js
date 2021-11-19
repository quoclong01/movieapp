import { useState } from "react";
import { img_300, unavailable } from "./../../config/config";
import "./MovieItem.css";
import Modal from "../Modal/Modal";

const MovieItem = ({ id, title, poster_path, vote_average, type, date }) => {
  const [showModal, setShowModal] = useState(false);

  const openModal = () => {
    setShowModal((prev) => !prev);
  };

  const setVoteClass = (vote) => {
    if (vote >= 8) {
      return "green";
    } else if (vote >= 6) {
      return "orange";
    } else {
      return "red";
    }
  };

  return (
    <>
      <div className="movie" onClick={openModal}>
        <span className={`vote ${setVoteClass(vote_average)}`}>
          {vote_average}
        </span>
        <img
          className="poster"
          src={poster_path ? `${img_300}${poster_path}` : unavailable}
          alt="poster"
        />
        <h1 className="title">{title}</h1>
        <div className="info">
          <span className="type">{type === 'tv' ? 'TV Series' : type}</span>
          <span className="date">{date}</span>
        </div>
      </div>
      {showModal && (
        <Modal
          showModal={showModal}
          setShowModal={setShowModal}
          id={id}
          type={type}
        />
      )}
    </>
  );
};

export default MovieItem;
