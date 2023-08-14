import React, { useState, useEffect } from "react";
import DataTable from "../DataTable/DataTable";
import FilterOrganizer from "../FilterOrganizer/FilterOrganizer";
import Pagination from "../Pagination/Pagination";
import FrameworkModal from "../FrameworkModal/FrameworkModal";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";

import axios from "axios";

function Visor() {
  const baseUrl = "http://localhost/crmcrud/";
  const [data, setData] = useState([]);
  const [modalInsertar, setModalInsertar] = useState(false);
  const [modalEditar, setModalEditar] = useState(false);
  const [modalEliminar, setModalEliminar] = useState(false);
  const [frameworkSeleccionado, setFrameworkSeleccionado] = useState({
    id: "",
    nombre: "",
    plan: "",
    localidad: "",
    telefono:'',
    redSocial: "",
    fecha: "",
    organizador: "",
  });
  const [selectedItems, setSelectedItems] = useState([]);
  const [selectedOrganizer, setSelectedOrganizer] = useState("");
  const [selectedOrganizerDetails, setSelectedOrganizerDetails] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [
    selectedOrganizerForSelectedItems,
    setSelectedOrganizerForSelectedItems,
  ] = useState("");


  const [organizersList, setOrganizersList] = useState([]);
  const assignOrganizerToSelectedItems = async () => {
    const updatedData = data.map((framework) => {
      if (selectedItems.includes(framework.id)) {
        return {
          ...framework,
          organizador: selectedOrganizerForSelectedItems,
        };
      }
      return framework;
    });

    // Actualiza el estado local
    setData(updatedData);
    setSelectedOrganizerForSelectedItems("");
    setSelectedItems([]);

    // Realiza la llamada a la API para actualizar la base de datos
    try {
      const response = await axios.put(baseUrl + "update", {
        data: updatedData,
      }); // Ajusta la URL de la API
      console.log(response); // Verifica la respuesta en la consola
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFrameworkSeleccionado((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    console.log(frameworkSeleccionado);
  };

  const abrirCerrarModalInsertar = () => {
    setModalInsertar(!modalInsertar);
  };

  const abrirCerrarModalEditar = () => {
    setModalEditar(!modalEditar);
  };

  const abrirCerrarModalEliminar = () => {
    setModalEliminar(!modalEliminar);
  };

  const peticionGet = async () => {
    try {
      const response = await axios.get(baseUrl);
      setData(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getUniqueOrganizers = () => {
    const organizers = [
      ...data.map((framework) => framework.organizador),
      ...organizersList,
    ];
    return [...new Set(organizers)];
  };

  const seleccionarFramework = (framework, caso) => {
    setFrameworkSeleccionado(framework);

    caso === "Editar" ? abrirCerrarModalEditar() : abrirCerrarModalEliminar();
  };

  const toggleItemSelection = (itemId) => {
    if (selectedItems.includes(itemId)) {
      setSelectedItems(selectedItems.filter((id) => id !== itemId));
    } else {
      setSelectedItems([...selectedItems, itemId]);
    }
  };

  const shareSelectedViaWhatsApp = () => {
    const selectedFrameworks = data.filter((framework) =>
      selectedItems.includes(framework.id)
    );
    const messages = selectedFrameworks.map(
      (framework) =>
        `Nombre: ${framework.nombre}\n` +
        `Plan: ${framework.plan}\n` +
        `Telefono: ${framework.telefono}\n` +
        `Localidad: ${framework.localidad}\n` +
        `Red Social: ${framework.redSocial}\n` +
        `Fecha: ${framework.fecha}`
    );

    const message = `Hola, te comparto estos datos:\n\n${messages.join(
      "\n\n"
    )}`;

    const whatsappURL = `https://wa.me/?text=${encodeURIComponent(message)}`;
    window.open(whatsappURL);
  };

  const handleOrganizerSelect = (organizer) => {
    setSelectedOrganizer(organizer);
    if (organizer) {
      const organizerDetails = data.filter(
        (framework) => framework.organizador === organizer
      );
      setSelectedOrganizerDetails(organizerDetails);
    } else {
      setSelectedOrganizerDetails([]);
    }
  };

  useEffect(() => {
    peticionGet();
  }, []);

  return (
    <div style={{ textAlign: "center" }}>
      <br />

           <FrameworkModal   isOpenInsertar={modalInsertar}
  isOpenEditar={modalEditar}
  isOpenEliminar={modalEliminar}
  closeModalInsertar={() => setModalInsertar(false)}
  closeModalEditar={() => setModalEditar(false)}
  closeModalEliminar={() => setModalEliminar(false)}
  />
      <button
        className="btn btn-dark"
        onClick={shareSelectedViaWhatsApp}
        disabled={selectedItems.length === 0}
        style={{ marginLeft: "10px", marginBottom: "10px" }}
      >
        Compartir seleccionados via WhatsApp
      </button>
      <Link style={{ textDecoration: "none" }} to="/">
        <button
          className="btn btn-warning"
          style={{ marginLeft: "10px", marginBottom: "10px" }}
        >
          Logout
        </button>
      </Link>
      <br />
      <br />
      <br />
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          margin: "20px 0",
        }}
      >
        
      </div>
      <div
        style={{ display: "flex", alignItems: "center", marginBottom: "20px" }}
      >
        <label style={{ marginRight: "10px" }}>Seleccionar Organizador:</label>
        <select
          className="form-control"
          value={selectedOrganizerForSelectedItems}
          onChange={(e) => setSelectedOrganizerForSelectedItems(e.target.value)}
          style={{ width: "30vh", marginRight: "10px" }}
        >
          <option value="">Sin Organizador</option>
          {getUniqueOrganizers().map((organizer) => (
            <option key={organizer} value={organizer}>
              {organizer}
            </option>
          ))}
        </select>
        <button
          className="btn btn-dark"
          onClick={assignOrganizerToSelectedItems}
          disabled={
            selectedItems.length === 0 || !selectedOrganizerForSelectedItems
          }
        >
          Asignar Organizador a Seleccionados
        </button>
      </div>

      <FilterOrganizer
        handleOrganizerSelect={handleOrganizerSelect}
        getUniqueOrganizers={getUniqueOrganizers}
      />

      {/* ... Other UI elements ... */}
      <Pagination
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        data={data}
        selectedOrganizer={selectedOrganizer}
        selectedOrganizerDetails={selectedOrganizerDetails}
      />

      <DataTable
        data={data}
        selectedItems={selectedItems}
        toggleItemSelection={toggleItemSelection}
        seleccionarFramework={seleccionarFramework}
        selectedOrganizer={selectedOrganizer}
        selectedOrganizerDetails={selectedOrganizerDetails}
        currentPage={currentPage}
      />

 
    </div>
  );
}

export default Visor;
