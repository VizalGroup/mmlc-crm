import React, { useState } from "react";
import flyer1 from "../../Img/flyer1.jpeg";
import flyer2 from "../../Img/flyer2.jpeg";
import axios from "axios";

const Formulario = () => {
  const [nombre, setNombre] = useState("");
  const [telefono, setTelefono] = useState("");
  const [localidad, setLocalidad] = useState("");
  const [contacto, setContacto] = useState("");
  const [plan, setPlan] = useState([]);
  const [selectedContactOption, setSelectedContactOption] = useState("");
  const baseUrl = "http://localhost/crmcrud/";
  const [data, setData] = useState([]);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const peticionPost = async (contactoData) => {
    const f = new FormData();

    for (let prop in contactoData) {
      f.append(prop, contactoData[prop]);
    }
    f.append("METHOD", "POST");

    try {
      const response = await axios.post(baseUrl, f);
      console.log("Respuesta:", response.data);
    } catch (error) {
      console.log("Error:", error);
      throw error;
    }
  };

  const opcionesContacto = ["Facebook", "Instagram", "Otros"];
  const opcionesPlan = [
    {
      nombre: "Plan Hogar Premium",
      descripcion: (
        <span className="text-muted small">
          Incluye 11 electrodomésticos para equipar tu hogar con la más alta
          calidad.
        </span>
      ),
    },
    {
      nombre: "Plan Hogar Básico",
      descripcion: (
        <span className="text-muted small">
          Contiene 5 electrodomésticos de primera necesidad para asegurar tu
          comodidad en casa.
        </span>
      ),
    },
    {
      nombre: "Plan Auto",
      descripcion: (
        <span className="text-muted small">
          Ofrece cobertura integral para tu vehículo, brindándote tranquilidad
          en cada viaje.
        </span>
      ),
    },
    {
      nombre: "Plan Dinero en Efectivo",
      descripcion: (
        <span className="text-muted small">
          Accede a dinero en efectivo para imprevistos, con flexibilidad en los
          plazos de pago.
        </span>
      ),
    },
    {
      nombre: "Plan Vivienda",
      descripcion: (
        <span className="text-muted small">
          Protege tu inversión más grande con un plan que cuida de tu hogar y su
          contenido.
        </span>
      ),
    },
    {
      nombre: "Plan Moto",
      descripcion: (
        <span className="text-muted small">
          Cobertura completa para tu motocicleta, garantizando tu movilidad con
          seguridad.
        </span>
      ),
    },
  ];

  const formatPhoneNumber = (phoneNumber) => {
    const cleanedPhoneNumber = phoneNumber.replace(/\D/g, "");
    const formattedPhoneNumber = cleanedPhoneNumber.replace(
      /^(\d{3})(\d{3})(\d{4})$/,
      "$1 $2-$3"
    );
    return formattedPhoneNumber;
  };

  const handleTelefonoChange = (e) => {
    const formattedValue = formatPhoneNumber(e.target.value);
    setTelefono(formattedValue);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const currentDate = new Date();
    const formattedDate = currentDate.toISOString().split("T")[0];

    const contactoData = {
      nombre,
      telefono,
      localidad,
      redSocial: selectedContactOption,
      plan,
      organizador: "Por asignar",
      fecha: formattedDate,
    };

    try {
      await peticionPost(contactoData);
      setSuccessMessage("Formulario enviado exitosamente");
    } catch (error) {
      setErrorMessage(
        "Hubo un error al enviar el formulario. Intenta más tarde o contáctanos en Facebook o Instagram."
      );
    }

    setNombre("");
    setTelefono("");
    setLocalidad("");
    setPlan([]);
    setSelectedContactOption("");
  };

  return (
    <div className="container">
      <div className="row align-items-center justify-content-center">
        <div className="col-md-3 mb-4">
          <img src={flyer1} alt="Imagen Izquierda" className="img-fluid" />
        </div>
        <div className="col-md-6">
          <h2 className="mb-2">Formulario</h2>
          <p className="mb-4">
            Completa este formulario y uno de nuestros prnpmoductores se
            comunicará contigo para asesorarte en todo lo relacionado con los
            planes en los que estés interesado.
          </p>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              {successMessage && (
                <div className="alert alert-success">{successMessage}</div>
              )}
              {errorMessage && (
                <div className="alert alert-danger">{errorMessage}</div>
              )}
            </div>
            <div className="mb-3">
              <label className="form-label">Nombre:</label>
              <input
                type="text"
                className="form-control"
                placeholder="Maria Lanus"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                name="nombre"
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Teléfono:</label>
              <input
                type="tel"
                className="form-control"
                value={telefono}
                onChange={handleTelefonoChange}
                placeholder="Ej: 280 597-2434"
                name="telefono"
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Localidad:</label>
              <input
                type="text"
                className="form-control"
                placeholder="Trelew, Chubut"
                name="localidad"
                value={localidad}
                onChange={(e) => setLocalidad(e.target.value)}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">¿Cómo nos conociste...?</label>
              <br />
              {opcionesContacto.map((opcion, index) => (
                <div key={index} className="form-check form-check-inline">
                  <input
                    type="radio"
                    name="redSocial"
                    className="form-check-input"
                    value={opcion}
                    checked={selectedContactOption === opcion}
                    onChange={(e) => setSelectedContactOption(e.target.value)}
                  />
                  <label className="form-check-label">{opcion}</label>
                </div>
              ))}
            </div>

            <div className="mb-3">
              <label className="form-label">Me interesa...</label>
              {opcionesPlan.map((opcion, index) => (
                <div key={index} className="form-check">
                  <input
                    type="checkbox"
                    name="plan"
                    className="form-check-input"
                    checked={plan.includes(opcion.nombre)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setPlan([...plan, opcion.nombre]);
                      } else {
                        setPlan(plan.filter((item) => item !== opcion.nombre));
                      }
                    }}
                  />
                  <label className="form-check-label">{opcion.nombre}</label>
                  <p>{opcion.descripcion}</p>
                </div>
              ))}
            </div>

            <button type="submit" className="btn btn-primary">
              Enviar
            </button>
          </form>
        </div>
        <div className="col-md-3 mb-4">
          <img src={flyer2} alt="Imagen Derecha" className="img-fluid" />
        </div>
      </div>
    </div>
  );
};

export default Formulario;
