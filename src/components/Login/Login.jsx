import React from 'react'
import { Link } from 'react-router-dom'

function Login() {
  return (
    <div>
    <button>
        <Link style={{textDecoration:'none'}} to='/visor'>
        iniciar
        </Link>
    </button>
    </div>
  )
}

export default Login
