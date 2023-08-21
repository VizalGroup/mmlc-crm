import React from "react";

function FilterOrganizer({ handleOrganizerSelect, getUniqueOrganizers }) {
  return (
    <div class="p-3 mb-2 bg-warning text-emphasis-dark">
    <div class="btn-group" role="group"  aria-label="Basic mixed styles example" style={{ display: "flex", justifyContent: "center" }}>
      <button
        className="btn btn-light btn-block"for="btnradio1"
        onClick={() => handleOrganizerSelect("")}
      >
        Mostrar Todos
      </button>
      {getUniqueOrganizers().map((organizer) => (
        <button
          key={organizer}
          className="btn btn-light btn-block "for="btnradio1"
          onClick={() => handleOrganizerSelect(organizer)}
        >
          {organizer}
        </button>
      ))}
    </div>
    </div>
  );
}

export default FilterOrganizer;
