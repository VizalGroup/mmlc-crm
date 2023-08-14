import React from "react";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";

function Pagination({ currentPage, setCurrentPage, data, selectedOrganizer, selectedOrganizerDetails }) {
  const totalPages = Math.ceil(
    (!selectedOrganizer || selectedOrganizer === "")
      ? data.length / 9
      : selectedOrganizerDetails.length / 9
  );

  return (
    <div className="pagination">
       <button
      style={{ marginLeft: "10px" }}
      className="btn btn-warning"
      onClick={() => setCurrentPage(currentPage - 1)}
      disabled={currentPage === 1}
    >
      <AiOutlineLeft />
    </button>
    <span style={{ marginLeft: "10px" }} className="page-number">
      {currentPage}
    </span>
    <button
      style={{ marginLeft: "10px" }}
      className="btn btn-warning"
      onClick={() => setCurrentPage(currentPage + 1)}
      disabled={
        (!selectedOrganizer || selectedOrganizer === "") ?
        currentPage * 9 >= data.length :
        currentPage * 9 >= selectedOrganizerDetails.length
      }
    >
      <AiOutlineRight />
    </button>
    </div>
  );
}

export default Pagination;
