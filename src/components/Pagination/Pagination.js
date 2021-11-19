import Pagination from "@mui/material/Pagination";
import "./Pagination.css";
const CustomPagination = ({ setPage, numberOfPage = 500 }) => {
  const handleChange = (e, value) => {
    setPage(value);
    window.scroll(0, 0);
  };
  return (
    <div className="pag">
      <Pagination
        count={numberOfPage}
        size="large"
        hidePrevButton
        hideNextButton
        onChange={handleChange}
        className="pag-menu"
      />
    </div>
  );
};

export default CustomPagination;
