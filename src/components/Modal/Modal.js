import { useEffect, useRef, useState } from "react";
import axios from "axios";
import "./Modal.css";
import { img_500, unavailable } from "../../config/config";
import Carousel from "../Carousel/Carousel";
import YouTubeIcon from "@mui/icons-material/YouTube";


const Modal = ({ showModal, setShowModal, id, type }) => {
  const [content, setContent] = useState();
  const [video, setVideo] = useState();
  const ModalRef = useRef();

  const closeModal = (e) => {
    if (ModalRef.current === e.target) {
      setShowModal(false);
    }
  };

  const fetchData = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/${type}/${id}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
    );

    setContent(data);
  };

  const fetchVideo = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/${type}/${id}/videos?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
    );

    setVideo(data.results[0]?.key);
  };

  useEffect(() => {
    fetchData();
    fetchVideo();
    // eslint-disable-next-line
  }, []);

  return (
    <>
      {showModal && content && (
        <div className="modal" onClick={closeModal} ref={ModalRef}>
          <div className="content">
            <img
              src={
                content.poster_path
                  ? `${img_500}${content.poster_path}`
                  : unavailable
              }
              alt={content.name || content.title}
              className="content-image"
            />
            <div className="content-about">
              <h1 className="content-heading">
                {content.name || content.title} (
                {(
                  content.first_air_date ||
                  content.release_date ||
                  "-----"
                ).substring(0, 4)}
                )
              </h1>
              {content.tagline && <i className="tagline">{content.tagline}</i>}
              <p className="content-desc">{content.overview}</p>
              <Carousel id={id} type={type} />
              <a
                target="__blank"
                href={`https://www.youtube.com/watch?v=${video}`}
                className="btnYtb"
              >
                <YouTubeIcon className="icon" />
                Watch the Trailer
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;
