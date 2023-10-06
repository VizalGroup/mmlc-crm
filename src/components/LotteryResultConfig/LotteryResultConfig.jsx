import React, { useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function LotteryResultConfig() {
  const baseUrl = "https://enfoqueplanes.com/websiteEnfoque/";
  const [data, setData] = useState([]);
  const [lotteryNumber, setLotteryNumber] = useState({
    winner: "",
    fecha: "",
  });

  const peticionPut = async () => {
    var f = new FormData();
    f.append("id", "1");
    f.append("winner", lotteryNumber.winner);
    f.append("fecha", lotteryNumber.fecha);
    f.append("METHOD", "PUT");
    try {
      const response = await axios.post(baseUrl, f, { params: { id: 1 } });
      var dataNueva = data.map((lottery) => {
        if (lottery.id === 1) {
          return {
            ...lottery,
            winner: lotteryNumber.winner,
            fecha: lotteryNumber.fecha,
          };
        }
        return lottery;
      });
      setData(dataNueva);
      setLotteryNumber({
        winner: "",
        fecha: "",
      });
      toast.success("Cambios guardados con éxito");
    } catch (error) {
      console.log(error);
      toast.error("Error al guardar cambios");
    }
  };

  return (
    <div className="container mt-4">
      <h2>Editar Resultados de Lotería</h2>
      <form>
        <div className="form-group">
          <label>Número Ganador:</label>
          <input
            type="text"
            className="form-control"
            value={lotteryNumber.winner}
            onChange={(e) =>
              setLotteryNumber({ ...lotteryNumber, winner: e.target.value })
            }
          />
        </div>
        <div className="form-group">
          <label>Fecha:</label>
          <input
            type="text"
            className="form-control"
            value={lotteryNumber.fecha}
            onChange={(e) =>
              setLotteryNumber({ ...lotteryNumber, fecha: e.target.value })
            }
          />
        </div>
        <button
          type="button"
          className="btn btn-primary"
          onClick={peticionPut}
          style={{ marginTop: "10px" }}
        >
          Guardar Cambios
        </button>
        <a href="https://enfoqueplanes.com/" target="_blank">
          <button
            type="button"
            className="btn btn-link"
            style={{ marginTop: "10px", marginLeft: "10px" }}
          >
            Ir a enfoqueplanes.com
          </button>
        </a>
        <a
          href="https://www.lanacion.com.ar/loterias/quiniela-nacional/"
          target="_blank"
        >
          <button
            type="button"
            className="btn btn-link"
            style={{ marginTop: "10px", marginLeft: "10px" }}
          >
            Quiniela Nacional La Nacion
          </button>
        </a>
      </form>
      <ToastContainer />
    </div>
  );
}
