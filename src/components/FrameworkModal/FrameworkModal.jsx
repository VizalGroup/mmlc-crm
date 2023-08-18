import React, { useState } from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import axios from "axios";

function FrameworkModal() {
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
    telefono: "",
    redSocial: "",
    fecha: "",
    organizador: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFrameworkSeleccionado((prevState) => ({
      ...prevState,
      [name]: value,
    }));
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

  const peticionPost = async () => {
    const f = new FormData();

    for (let prop in frameworkSeleccionado) {
      f.append(prop, frameworkSeleccionado[prop]);
    }
    f.append("METHOD", "POST");

    try {
      const response = await axios.post(baseUrl, f);
      console.log("Response:", response.data);
      abrirCerrarModalInsertar();
    } catch (error) {
      console.log("Error:", error);
    }
  };

  const peticionPut = async () => {
    const f = new FormData();
    f.append("nombre", frameworkSeleccionado.nombre);
    f.append("plan", frameworkSeleccionado.plan);
    f.append("telefono", frameworkSeleccionado.telefono);
    f.append("localidad", frameworkSeleccionado.localidad);
    f.append("redSocial", frameworkSeleccionado.redSocial);
    f.append("fecha", frameworkSeleccionado.fecha);
    f.append("organizador", frameworkSeleccionado.organizador); // Actualiza el organizador aquí
    f.append("METHOD", "PUT");

    try {
      const response = await axios.post(baseUrl, f, {
        params: { id: frameworkSeleccionado.id },
      });
      const dataNueva = data.map((framework) =>
        framework.id === frameworkSeleccionado.id
          ? frameworkSeleccionado
          : framework
      );
      setData(dataNueva);
      abrirCerrarModalEditar();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <button
        className="btn btn-outline-warning"
        style={{ marginRight: "10px", marginBottom: "10px" }}
        onClick={abrirCerrarModalInsertar}
      >
        Insertar Form
      </button>
      <Modal isOpen={modalInsertar}>
        <ModalHeader>Insertar Form</ModalHeader>
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
            <label>Plan: </label>
            <br />
            <input
              type="text"
              className="form-control"
              name="plan"
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
            <label>localidad: </label>
            <br />
            <input
              type="text"
              className="form-control"
              name="localidad"
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
        // <ModalHeader>Editar Form</ModalHeader>
        //{" "}
        <ModalBody>
          //{" "}
          <div className="form-group">
            // <label>Nombre: </label>
            // <br />
            //{" "}
            <input
              type="text"
              className="form-control"
              name="nombre"
              onChange={handleChange}
              value={frameworkSeleccionado && frameworkSeleccionado.nombre}
            />
            <br />
            <label>Plan: </label>
            // <br />
            //{" "}
            <input
              type="text"
              className="form-control"
              name="plan"
              onChange={handleChange}
              value={frameworkSeleccionado && frameworkSeleccionado.plan}
            />
            <br />
            <label>Telefono: </label>
            <br />
            <input
              type="text"
              className="form-control"
              name="telefono"
              onChange={handleChange}
              value={frameworkSeleccionado && frameworkSeleccionado.telefono}
            />
            <br />
            <label>localidad: </label>
            <br />
            <input
              type="text"
              className="form-control"
              name="localidad"
              onChange={handleChange}
              value={frameworkSeleccionado && frameworkSeleccionado.localidad}
            />
            <br />
            <label>Red Social: </label>
            <br />
            <input
              type="text"
              className="form-control"
              name="redSocial"
              onChange={handleChange}
              value={frameworkSeleccionado && frameworkSeleccionado.redSocial}
            />
            <br />
            <label>Fecha: </label>
            <br />
            <input
              type="text"
              className="form-control"
              name="fecha"
              onChange={handleChange}
              value={frameworkSeleccionado && frameworkSeleccionado.fecha}
            />
            <br />
            <br />
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
        //{" "}
      </Modal>
    </>
  );
}

export default FrameworkModal;
