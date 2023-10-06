import React, { useState } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import Login from './components/Login/Login';
import Visor from './components/Visor/Visor';
import NewProspectoPublico from './components/NewProspectoPublic/NewProspectoPublico';
import LotteryResultConfig from './components/LotteryResultConfig/LotteryResultConfig';

const PrivateRoute = ({ element }) => {
  // Usa un estado para rastrear si el usuario ha iniciado sesión o no.
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Función para verificar si el usuario ha iniciado sesión o no (puedes implementar tu lógica aquí).
  const checkLoggedIn = () => {
    // Para este ejemplo, asumiremos que el usuario ha iniciado sesión si hay un nombre de usuario en el almacenamiento local.
    return !!localStorage.getItem('username');
  };

  // Comprueba si el usuario ha iniciado sesión o no.
  const loggedIn = checkLoggedIn();

  return loggedIn ? element : <Navigate to="/" />;
};

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/visor" element={<PrivateRoute element={<Visor />} />} />
        <Route path="/sumate" element={<NewProspectoPublico />}/>
        <Route path="/configlotterynumber" element={<LotteryResultConfig/>}/>
      </Routes>
    </div>
  );
}

export default App;
