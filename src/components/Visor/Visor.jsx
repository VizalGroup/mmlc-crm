import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import axios from "axios";
import { Link } from "react-router-dom";
import { AiOutlineLeft,AiOutlineRight } from "react-icons/ai";

function Visor() {
  const baseUrl = "http://localhost/crudmmlc/";
  const [data, setData] = useState([]);
  const [modalInsertar, setModalInsertar] = useState(false);
  const [modalEditar, setModalEditar] = useState(false);
  const [modalEliminar, setModalEliminar] = useState(false);
  const [frameworkSeleccionado, setFrameworkSeleccionado] = useState({
    id: "",
    nombre: "",
    telefono: "",
    email: "",
    redSocial: "",
    fecha: "",
    organizador: "",
  });
  const [selectedItems, setSelectedItems] = useState([]);
  const [selectedOrganizer, setSelectedOrganizer] = useState("");
  const [selectedOrganizerDetails, setSelectedOrganizerDetails] = useState([]);
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedOrganizerForSelectedItems, setSelectedOrganizerForSelectedItems] = useState("");
  const [organizersList, setOrganizersList] = useState([]);

  const assignOrganizerToSelectedItems = () => {
    const updatedData = data.map((framework) => {
      if (selectedItems.includes(framework.id)) {
        return {
          ...framework,
          organizador: selectedOrganizerForSelectedItems,
        };
      }
      return framework;
    });
  
    setData(updatedData);
    setSelectedOrganizerForSelectedItems("");
    setSelectedItems([]);
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

  const peticionPost = async () => {
    const f = new FormData();
    f.append("nombre", frameworkSeleccionado.nombre);
    f.append("telefono", frameworkSeleccionado.telefono);
    f.append("email", frameworkSeleccionado.email);
    f.append("redSocial", frameworkSeleccionado.redSocial);
    f.append("fecha", frameworkSeleccionado.fecha);
    f.append("organizador", frameworkSeleccionado.organizador);
    f.append("METHOD", "POST");
  
    try {
      const response = await axios.post(baseUrl, f);
      setData([...data, response.data]);
      setOrganizersList([...organizersList, frameworkSeleccionado.organizador]);
      abrirCerrarModalInsertar();
    } catch (error) {
      console.log(error);
    }
  };
  
  
  const getUniqueOrganizers = () => {
    const organizers = [...data.map((framework) => framework.organizador), ...organizersList];
    return [...new Set(organizers)];
  };
  

  const peticionPut = async () => {
    const f = new FormData();
    f.append("nombre", frameworkSeleccionado.nombre);
    f.append("telefono", frameworkSeleccionado.telefono);
    f.append("email", frameworkSeleccionado.email);
    f.append("redSocial", frameworkSeleccionado.redSocial);
    f.append("fecha", frameworkSeleccionado.fecha);
    f.append("organizador", frameworkSeleccionado.organizador);
    f.append("METHOD", "PUT");

    try {
      const response = await axios.post(baseUrl, f, { params: { id: frameworkSeleccionado.id } });
      const dataNueva = data.map((framework) =>
        framework.id === frameworkSeleccionado.id ? frameworkSeleccionado : framework
      );
      setData(dataNueva);
      abrirCerrarModalEditar();
    } catch (error) {
      console.log(error);
    }
  };

  const peticionDelete = async () => {
    const f = new FormData();
    f.append("METHOD", "DELETE");

    try {
      await axios.post(baseUrl, f, { params: { id: frameworkSeleccionado.id } });
      setData(data.filter((framework) => framework.id !== frameworkSeleccionado.id));
      abrirCerrarModalEliminar();
    } catch (error) {
      console.log(error);
    }
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
        `Telefono: ${framework.telefono}\n` +
        `Localidad: ${framework.email}\n` +
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
      <button
        className="btn btn-warning"
        style={{ marginRight: "10px", marginBottom: "10px" }}
        onClick={abrirCerrarModalInsertar}
      >
        Nuevo Prospecto
      </button>
      <button
        className="btn btn-dark"
        onClick={shareSelectedViaWhatsApp}
        disabled={selectedItems.length === 0}
        style={{ marginLeft: "10px", marginBottom: "10px" }}
      >
        Compartir seleccionados (WhatsApp)
      </button>
      <Link style={{ textDecoration: "none" }} to="/">
        <button className="btn btn-warning" style={{ marginLeft: "10px", marginBottom: "10px" }}>
          Salir
        </button>
      </Link>
      <br />
      <br />
      <br />
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", margin: "20px 0" }}>
  <select className="form-control" style={{ width: "40vh" }} onChange={(e) => handleOrganizerSelect(e.target.value)}>
    <option value="">Filtrar Organizador</option>
    {getUniqueOrganizers().map((organizador) => (
      <option key={organizador} value={organizador}>
        {organizador}
      </option>
    ))}
  </select>
  <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
  <label style={{ marginRight: '10px' }}>Seleccionar Organizador:</label>
  <select
    className="form-control"
    value={selectedOrganizerForSelectedItems}
    onChange={(e) => setSelectedOrganizerForSelectedItems(e.target.value)}
    style={{ width: '30vh', marginRight: '10px' }}
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
    disabled={selectedItems.length === 0 || !selectedOrganizerForSelectedItems}
  >
    Asignar Organizador a Seleccionados
  </button>
</div>
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
</div>
      <br />
      <br/>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Seleccion</th>
            <th>Nombre</th>
            <th>Telefono</th>
            <th>Localidad</th>
            <th>Red Social</th>
            <th>Fecha</th>
            <th>Organizador</th>
            <th>Opciones</th>
          </tr>
        </thead>
        <tbody>
          {!selectedOrganizer || selectedOrganizer === "" ? (
            data
            .slice((currentPage - 1) * 9, currentPage * 9)
            .map((framework) => (
              <tr key={framework.id}>
                <td>
                  <input
                    className="form-check-input"
                    type="checkbox"
                    style={{ marginLeft: "10px" }}
                    checked={selectedItems.includes(framework.id)}
                    onChange={() => toggleItemSelection(framework.id)}
                  />
                </td>
                <td>{framework.nombre}</td>
                <td>{framework.telefono}</td>
                <td>{framework.email}</td>
                <td>{framework.redSocial}</td>
                <td>{framework.fecha}</td>
                <td>{framework.organizador}</td>
                <td>
                  <button
                    className="btn btn-warning"
                    onClick={() => seleccionarFramework(framework, "Editar")}
                  >
                    Editar
                  </button>{" "}
                  {"  "}
                  <button
                    className="btn btn-dark"
                    onClick={() => seleccionarFramework(framework, "Eliminar")}
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))
          ) : (
            selectedOrganizerDetails
            .slice((currentPage - 1) * 9, currentPage * 9)
            .map((framework) => (
              <tr key={framework.id}>
                <td>
                  <input
                    className="form-check-input"
                    type="checkbox"
                    style={{ marginLeft: "10px" }}
                    checked={selectedItems.includes(framework.id)}
                    onChange={() => toggleItemSelection(framework.id)}
                  />
                </td>
                <td>{framework.nombre}</td>
                <td>{framework.telefono}</td>
                <td>{framework.email}</td>
                <td>{framework.redSocial}</td>
                <td>{framework.fecha}</td>
                <td>{framework.organizador}</td>
                <td>
                  <button
                    className="btn btn-warning"
                    onClick={() => seleccionarFramework(framework, "Editar")}
                  >
                    Editar
                  </button>{" "}
                  {"  "}
                  <button
                    className="btn btn-dark"
                    onClick={() => seleccionarFramework(framework, "Eliminar")}
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
      <Modal isOpen={modalInsertar}>
        <ModalHeader>Agregar Prospecto</ModalHeader>
        <ModalBody>
          <div className="form-group">
            <label>Nombre: </label>
            <br />
            <input
              type="text"
              className="form-control"
              name="nombre"
              onChange={handleChange}
            />
            <br />
            <label>Telefono: </label>
            <br />
            <input
              type="text"
              className="form-control"
              name="telefono"
              onChange={handleChange}
            />
            <br />
            <label>Localidad: </label>
            <br />
            <input
              type="text"
              className="form-control"
              name="email"
              onChange={handleChange}
            />
            <br />
            <label>Red Social: </label>
            <br />
            <input
              type="text"
              className="form-control"
              name="redSocial"
              onChange={handleChange}
            />
            <br />
            <label>Fecha: </label>
            <br />
            <input
              type="text"
              className="form-control"
              name="fecha"
              onChange={handleChange}
              placeholder={new Date().toLocaleDateString()}
            />
            <br />
            
            <br />
          </div>
        </ModalBody>
        <ModalFooter>
          <button className="btn btn-warning" onClick={() => peticionPost()}>
            Insertar
          </button>
          {"   "}
          <button
            className="btn btn-dark"
            onClick={() => abrirCerrarModalInsertar()}
          >
            Cancelar
          </button>
        </ModalFooter>
      </Modal>

      <Modal isOpen={modalEditar}>
        <ModalHeader>Editar Datos</ModalHeader>
        <ModalBody>
          <div className="form-group">
            <label>Nombre: </label>
            <br />
            <input
              type="text"
              className="form-control"
              name="nombre"
              onChange={handleChange}
              value={frameworkSeleccionado && frameworkSeleccionado.nombre}
            />
            <br />
            <label>Telefono: </label>
            <br />
            <input
              type="text"
              className="form-control"
              name="telefono"
              onChange={handleChange}
              value={frameworkSeleccionado && frameworkSeleccionado.lanzamiento}
            />
            <br />
            <label>Localidad: </label>
            <br />
            <input
              type="text"
              className="form-control"
              name="email"
              onChange={handleChange}
              value={
                frameworkSeleccionado && frameworkSeleccionado.desarrollador
              }
            />
            <br />
            <label>Red Social: </label>
            <br />
            <input
              type="text"
              className="form-control"
              name="redSocial"
              onChange={handleChange}
              value={
                frameworkSeleccionado && frameworkSeleccionado.desarrollador
              }
            />
            <br />
            <label>Fecha: </label>
            <br />
            <input
              type="text"
              className="form-control"
              name="fecha"
              onChange={handleChange}
              placeholder={new Date().toLocaleDateString()}
              value={
                frameworkSeleccionado && frameworkSeleccionado.desarrollador
              }
            />
            <br />
            <label>Organizador: </label>
            <br />
            <input
              type="text"
              className="form-control"
              name="organizador"
              onChange={handleChange}
              value={
                frameworkSeleccionado && frameworkSeleccionado.desarrollador
              }
            />
          </div>
        </ModalBody>
        <ModalFooter>
          <button className="btn btn-primary" onClick={() => peticionPut()}>
            Editar
          </button>
          {"   "}
          <button
            className="btn btn-danger"
            onClick={() => abrirCerrarModalEditar()}
          >
            Cancelar
          </button>
        </ModalFooter>
      </Modal>

      <Modal isOpen={modalEliminar}>
        <ModalBody>
          ¿Estás seguro que deseas eliminar el prospecto de{" "}
          {frameworkSeleccionado && frameworkSeleccionado.nombre}?
        </ModalBody>
        <ModalFooter>
          <button className="btn btn-danger" onClick={() => peticionDelete()}>
            Sí
          </button>
          <button
            className="btn btn-secondary"
            onClick={() => abrirCerrarModalEliminar()}
          >
            No
          </button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default Visor;
