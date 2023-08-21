import React from "react";

function FilterOrganizer({ handleOrganizerSelect, getUniqueOrganizers }) {
  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <button
        className="btn btn-outline-primary m-2"
        onClick={() => handleOrganizerSelect("")}
      >
        Mostrar Todos
      </button>
      {getUniqueOrganizers().map((organizer) => (
        <button
          key={organizer}
          className="btn btn-outline-primary m-2"
          onClick={() => handleOrganizerSelect(organizer)}
        >
          {organizer}
        </button>
      ))}
    </div>
  );
}

export default FilterOrganizer;
