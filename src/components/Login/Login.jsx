import React from 'react';
import { Link } from 'react-router-dom';
import enfoque from '../../Img/enfoque.png';

function Login() {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh', // Asegura que el contenido esté centrado verticalmente
    }}>
      <img src={enfoque} className="img-fluid" alt="logo" style={{ width: '30vh' }} />
      <div style={{width:'30vh', marginTop:'20px'}}>
      <input class="form-control" type="text" placeholder="Ingrese su usuario" aria-label="default input example"></input>
      <label for="inputPassword5" class="form-label"></label>
<input type="password" id="inputPassword5" placeholder="Ingrese su contraseña" class="form-control" aria-describedby="passwordHelpBlock"/>
<div id="passwordHelpBlock" class="form-text">
  Your password must be 8-20 characters long, contain letters and numbers, and must not contain spaces, special characters, or emoji.
</div>
</div>
      <Link to='/visor'>
        <button style={{ marginTop: '20px' }} type="button" className="btn btn-warning">
          Iniciar sesión
        </button>
      </Link>
    </div>
  );
}

export default Login;
