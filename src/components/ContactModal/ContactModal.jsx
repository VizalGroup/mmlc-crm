import React, { useState } from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import axios from "axios";

function ContactModal() {
  const baseUrl = "http://localhost/crmcrud/";
  const [data, setData] = useState([]);
  const [modalInsertar, setModalInsertar] = useState(false);
  const [contactSeleccionado, setcontactSeleccionado] = useState({
    id: "",
    nombre: "",
    plan: [],
    localidad: "",
    telefono: "",
    redSocial: "",
    fecha: "",
    organizador: "",
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      const updatedPlans = checked
        ? [...contactSeleccionado.plan, value]
        : contactSeleccionado.plan.filter((plan) => plan !== value);

      setcontactSeleccionado((prevState) => ({
        ...prevState,
        plan: updatedPlans,
      }));
    } else if (name === "telefono") {
      const formattedPhoneNumber = formatPhoneNumber(value);
      setcontactSeleccionado((prevState) => ({
        ...prevState,
        [name]: formattedPhoneNumber,
      }));
    } else {
      setcontactSeleccionado((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  const abrirCerrarModalInsertar = () => {
    setModalInsertar(!modalInsertar);
  };

  const peticionPost = async () => {
    const f = new FormData();

    for (let prop in contactSeleccionado) {
      f.append(prop, contactSeleccionado[prop]);
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

  const opcionesPlanes = [
    { id: 1, nombre: "Plan Hogar Premium" },
    { id: 2, nombre: "Plan Hogar Básico" },
    { id: 3, nombre: "Plan Auto" },
    { id: 4, nombre: "Plan Dinero en Efectivo" },
    { id: 5, nombre: "Plan Vivienda" },
    { id: 6, nombre: "Plan Moto" },
  ];

  const opcionesRedesSociales = [
    { id: 1, nombre: "Facebook" },
    { id: 2, nombre: "Instagram" },
    { id: 3, nombre: "Otros" },
  ];

  function formatPhoneNumber(phoneNumber) {
    const cleanedNumber = phoneNumber.replace(/\D/g, "");
    const formattedNumber = cleanedNumber.replace(
      /(\d{3})(\d{3})(\d{4})/,
      "$1 $2-$3"
    );

    return formattedNumber;
  }

  

  return (
    <>
      <button
        className="btn btn-warning"
        style={{ marginRight: "10px", marginBottom: "10px" }}
        onClick={abrirCerrarModalInsertar}
      >
        Agregar Contacto
      </button>
      <Modal isOpen={modalInsertar}>
        <ModalHeader>Agregar Contacto</ModalHeader>
        <ModalBody>
          <div className="form-group">
            <label>Nombre: </label>
            <br />
            <input
              type="text"
              className="form-control"
              name="nombre"
              onChange={handleChange}
              placeholder="Francisco Garcia"
            />
            <br />
            <label>Plan:</label>
            <br />
            {opcionesPlanes.map((plan) => (
              <div key={plan.id}>
                <input
                  type="checkbox"
                  name="plan"
                  value={plan.nombre}
                  onChange={handleChange}
                  checked={contactSeleccionado.plan.includes(plan.nombre)}
                />
                <label>{plan.nombre}</label>
              </div>
            ))}
            <br />
            <label>Teléfono: </label>
            <br />
            <input
              type="text"
              className="form-control"
              name="telefono"
              onChange={handleChange}
              value={contactSeleccionado.telefono}
              placeholder="280 207-9515"
            />
            <br />
            <label>localidad: </label>
            <br />
            <input
              type="text"
              className="form-control"
              name="localidad"
              onChange={handleChange}
              placeholder="Rawson, Chubut"
            />
            <br />
            <label>Red Social:</label>
            <br />
            <select
              className="form-control"
              name="redSocial"
              onChange={handleChange}
              value={contactSeleccionado.redSocial}
            >
              <option value="">Selecciona una red social</option>
              {opcionesRedesSociales.map((redSocial) => (
                <option key={redSocial.id} value={redSocial.nombre}>
                  {redSocial.nombre}
                </option>
              ))}
            </select>
            <br />
            <label>Fecha: </label>
            <br />
            <input
              type="text"
              className="form-control"
              name="fecha"
              onChange={handleChange}
              placeholder="2023-08-23"
            />
            <br />
            <label>Organizador: </label>
            <br />
            <input
              type="text"
              className="form-control"
              name="organizador"
              onChange={handleChange}
            />
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
    </>
  );
}

export default ContactModal;
