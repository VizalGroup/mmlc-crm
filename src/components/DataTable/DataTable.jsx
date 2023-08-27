import React, { useState } from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import axios from "axios";

function DataTable({
  data,
  selectedItems,
  toggleItemSelection,
  seleccionarFramework,
  selectedOrganizer,
  selectedOrganizerDetails,
  currentPage,
}) {
  const frameworksToDisplay = selectedOrganizer
    ? selectedOrganizerDetails.slice((currentPage - 1) * 9, currentPage * 9)
    : data.slice((currentPage - 1) * 9, currentPage * 9);

  const [modalEditar, setModalEditar] = useState(false);
  const [frameworkSeleccionado, setFrameworkSeleccionado] = useState({
    id: "",
    nombre: "",
    plan: "",
    localidad: "",
    telefono: "",
    redSocial: "",
    fecha: "",
    organizador: "",
  });
  const baseUrl = "https://gestionenfoque.online/crmcrud/";

  const abrirCerrarModalEditar = () => {
    setModalEditar(!modalEditar);
  };

  const toggleModalEditar = (framework) => {
    setFrameworkSeleccionado(framework);
    setModalEditar(!modalEditar);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFrameworkSeleccionado((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const peticionPut = async () => {
    const f = new FormData();
    for (let prop in frameworkSeleccionado) {
      f.append(prop, frameworkSeleccionado[prop]);
    }
    f.append("METHOD", "PUT");

    try {
      const response = await axios.post(baseUrl, f, {
        params: { id: frameworkSeleccionado.id },
      });
      window.location.href = "/visor";
      abrirCerrarModalEditar();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Seleccion</th>
            <th>Nombre</th>
            <th>Plan</th>
            <th>Telefono</th>
            <th>Localidad</th>
            <th>Red Social</th>
            <th>Fecha</th>
            <th>Organizador</th>
            <th>Opciones</th>
          </tr>
        </thead>
        <tbody>
          {frameworksToDisplay.map((framework) => (
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
              <td>{framework.plan}</td>
              <td>{framework.telefono}</td>
              <td>{framework.localidad}</td>
              <td>{framework.redSocial}</td>
              <td>{framework.fecha}</td>
              <td>{framework.organizador}</td>
              <td>
                <button
                  className="btn btn-warning"
                  onClick={() => toggleModalEditar(framework)}
                >
                  Editar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Modal isOpen={modalEditar} toggle={toggleModalEditar}>
        <ModalHeader>Editar Contacto</ModalHeader>
        <ModalBody>
          <div className="form-group">
            <label>Nombre: </label>
            <input
              type="text"
              className="form-control"
              name="nombre"
              onChange={handleChange}
              value={frameworkSeleccionado.nombre}
            />
            <br />
            <label>Plan: </label>
            <input
              type="text"
              className="form-control"
              name="plan"
              onChange={handleChange}
              value={frameworkSeleccionado.plan}
            />
            <br />
            <label>Telefono: </label>
            <input
              type="text"
              className="form-control"
              name="telefono"
              onChange={handleChange}
              value={frameworkSeleccionado.telefono}
            />
            <br />
            <label>Localidad: </label>
            <input
              type="text"
              className="form-control"
              name="localidad"
              onChange={handleChange}
              value={frameworkSeleccionado.localidad}
            />
            <br />
            <label>Red Social: </label>
            <input
              type="text"
              className="form-control"
              name="redSocial"
              onChange={handleChange}
              value={frameworkSeleccionado.redSocial}
            />
            <br />
            <label>Fecha: </label>
            <input
              type="text"
              className="form-control"
              name="fecha"
              onChange={handleChange}
              value={frameworkSeleccionado.fecha}
            />
            <br />
            <label>Organizador: </label>
            <input
              type="text"
              className="form-control"
              name="organizador"
              onChange={handleChange}
              value={frameworkSeleccionado.organizador}
            />
            <br />
          </div>
        </ModalBody>
        <ModalFooter>
          <button className="btn btn-warning" onClick={() => peticionPut()}>
            Editar
          </button>
          <button className="btn btn-dark" onClick={toggleModalEditar}>
            Cancelar
          </button>
        </ModalFooter>
      </Modal>
    </>
  );
}

export default DataTable;
