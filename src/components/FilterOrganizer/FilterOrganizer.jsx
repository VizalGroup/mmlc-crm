import React from "react";

function FilterOrganizer({ handleOrganizerSelect, getUniqueOrganizers }) {
  return (
    <select className="form-control" style={{ width: "40vh" }} onChange={(e) => handleOrganizerSelect(e.target.value)}>
      <option value="">Filtrar Organizador</option>
      {getUniqueOrganizers().map((organizer) => (
        <option key={organizer} value={organizer}>
          {organizer}
        </option>
      ))}
    </select>
  );
}

export default FilterOrganizer;
