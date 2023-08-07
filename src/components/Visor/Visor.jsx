
import React, {useState, useEffect} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Modal, ModalBody, ModalFooter, ModalHeader} from 'reactstrap';
import axios from 'axios';
import { Link } from 'react-router-dom';

function Visor() {
    const baseUrl="http://localhost/crudmmlc/";
    const [data, setData]=useState([]);
    const [modalInsertar, setModalInsertar]= useState(false);
    const [modalEditar, setModalEditar]= useState(false);
    const [modalEliminar, setModalEliminar]= useState(false);
    const [frameworkSeleccionado, setFrameworkSeleccionado]=useState({
      id: '',
      nombre: '',
      telefono: '',
      email: '',
      redSocial:'',
      fecha:'',
      organizador:''
    });
    const [selectedItems, setSelectedItems] = useState([]);
    const [modalInsertarOrganizador, setModalInsertarOrganizador]= useState(false);
    
  
    const handleChange=e=>{
      const {name, value}=e.target;
      setFrameworkSeleccionado((prevState)=>({
        ...prevState,
        [name]: value
      }))
      console.log(frameworkSeleccionado);
    }
  const abrirCerraModelOrganizador=()=>{
    setModalInsertarOrganizador(!modalInsertarOrganizador)
  }

    const abrirCerrarModalInsertar=()=>{
      setModalInsertar(!modalInsertar);
    }
  
    const abrirCerrarModalEditar=()=>{
      setModalEditar(!modalEditar);
    }
  
    const abrirCerrarModalEliminar=()=>{
      setModalEliminar(!modalEliminar);
    }
  
    const peticionGet=async()=>{
      await axios.get(baseUrl)
      .then(response=>{
        setData(response.data);
      }).catch(error=>{
        console.log(error);
      })
    }
  
    const peticionPost=async()=>{
      var f = new FormData();
      f.append("nombre", frameworkSeleccionado.nombre);
      f.append("telefono", frameworkSeleccionado.telefono);
      f.append("email", frameworkSeleccionado.email);
      f.append("redSociak", frameworkSeleccionado.redSocial);
      f.append("fecha", frameworkSeleccionado.fecha);
      f.append("organizador", frameworkSeleccionado.organizador);
      f.append("METHOD", "POST");
      await axios.post(baseUrl, f)
      .then(response=>{
        setData(data.concat(response.data));
        abrirCerrarModalInsertar();
      }).catch(error=>{
        console.log(error);
      })
    }
  
    const peticionPut=async()=>{
      var f = new FormData();
      f.append("nombre", frameworkSeleccionado.nombre);
      f.append("telefono", frameworkSeleccionado.telefono);
      f.append("email", frameworkSeleccionado.email);
      f.append("redSociak", frameworkSeleccionado.redSocial);
      f.append("fecha", frameworkSeleccionado.fecha);
      f.append("organizador", frameworkSeleccionado.organizador);
      f.append("METHOD", "PUT");
      await axios.post(baseUrl, f, {params: {id: frameworkSeleccionado.id}})
      .then(response=>{
        var dataNueva= data;
        dataNueva.map(framework=>{
          if(framework.id===frameworkSeleccionado.id){
            framework.nombre=frameworkSeleccionado.nombre;
            framework.telefono=frameworkSeleccionado.telefono;
            framework.email=frameworkSeleccionado.email;
            framework.redSocial=frameworkSeleccionado.redSocial;
            framework.fecha=frameworkSeleccionado.fecha;
            framework.organizador=frameworkSeleccionado.organizador;
          }
        });
        setData(dataNueva);
        abrirCerrarModalEditar();
      }).catch(error=>{
        console.log(error);
      })
    }
  
    const peticionDelete=async()=>{
      var f = new FormData();
      f.append("METHOD", "DELETE");
      await axios.post(baseUrl, f, {params: {id: frameworkSeleccionado.id}})
      .then(response=>{
        setData(data.filter(framework=>framework.id!==frameworkSeleccionado.id));
        abrirCerrarModalEliminar();
      }).catch(error=>{
        console.log(error);
      })
    }
  
    const seleccionarFramework=(framework, caso)=>{
      setFrameworkSeleccionado(framework);
  
      (caso==="Editar")?
      abrirCerrarModalEditar():
      abrirCerrarModalEliminar()
    }
  
    const toggleItemSelection = itemId => {
        if (selectedItems.includes(itemId)) {
            setSelectedItems(selectedItems.filter(id => id !== itemId));
        } else {
            setSelectedItems([...selectedItems, itemId]);
        }
    };

    const shareSelectedViaWhatsApp = () => {
        const selectedFrameworks = data.filter(framework => selectedItems.includes(framework.id));
        const messages = selectedFrameworks.map(framework => (
            `Nombre: ${framework.nombre}\n` +
            `Telefono: ${framework.telefono}\n` +
            `Email: ${framework.email}\n` +
            `Red Social: ${framework.redSocial}\n` +
            `Fecha: ${framework.fecha}`
        ));
    
        const message = `Hola, te comparto estos datos:\n\n${messages.join('\n\n')}`;
    
        const whatsappURL = `https://wa.me/?text=${encodeURIComponent(message)}`;
        window.open(whatsappURL);
    };
    
    
    useEffect(()=>{
      peticionGet();
    },[])
  
    return (
      <div style={{textAlign: 'center'}}>
        <br/>
        
  <br />
  <button className="btn btn-outline-dark " style={{marginRight:'10px'}} >Agregar Organizador</button>
        <button className="btn btn-outline-warning" onClick={()=>abrirCerrarModalInsertar()}>Insertar Form</button>
        <button className="btn btn-dark " onClick={shareSelectedViaWhatsApp} disabled={selectedItems.length === 0} style={{marginLeft:'10px'}}>
                Compartir seleccionados via WhatsApp
            </button>
            <Link style={{textDecoration:'none'}} to='/'>
        <button  class="btn btn-warning" style={{marginLeft:'10px'}}>Logout</button>
        </Link>
        <br /><br />
        <br/>
        <h6>Organizador</h6>
        <select></select>
        <br/>
      <table className="table table-striped">
        <thead >
          <tr >
            <th>ID</th>
            <th>Nombre</th>
            <th>Telefono</th>
            <th>Email</th>
            <th>Red Social</th>
            <th>Fecha</th>
           
            <th>Opciones</th>
            <th>Seleccion</th>
          </tr>
        </thead>
        <tbody>
          {data.map(framework=>(
            <tr key={framework.id} >
              <td>{framework.id}</td>
              <td>{framework.nombre}</td>
              <td>{framework.telefono}</td>
              <td>{framework.email}</td>
              <td>{framework.redSocial}</td>
              <td>{framework.fecha}</td>
             
            <td>
            <button className="btn btn-warning" onClick={()=>seleccionarFramework(framework, "Editar")}>Editar</button> {"  "}
            <button className="btn btn-dark" onClick={()=>seleccionarFramework(framework, "Eliminar")}>Eliminar</button>
           
            </td>
            <td>
            <input
                    className="form-check-input"
                    type="checkbox"
                    style={{marginLeft:'10px'}}
                    checked={selectedItems.includes(framework.id)}
                    onChange={() => toggleItemSelection(framework.id)}
                />
                    </td>
                </tr>
              ))}
      
      
            </tbody> 
      
          </table>
          
          <Modal isOpen={modalInsertarOrganizador}>
            <ModalHeader>Insertar Organizador</ModalHeader>
            <ModalBody>
                <div className="form-group">
                <br />
                <label>Organizador: </label>
                <br />
                <input type="text" className="form-control" name="organizador" onChange={handleChange}/>
                <br />
                </div>
                <ModalFooter>
                <button className="btn btn-primary" onClick={()=>peticionPost()}>Insertar</button>{"   "}
              <button className="btn btn-danger"  onClick={()=>abrirCerraModelOrganizador()}>Cancelar</button>
                </ModalFooter>
            </ModalBody>
          </Modal>
      
          <Modal isOpen={modalInsertar}>
            <ModalHeader>Insertar Form</ModalHeader>
            <ModalBody>
              <div className="form-group">
                <label>Nombre: </label>
                <br />
                <input type="text" className="form-control" name="nombre" onChange={handleChange}/>
                <br />
                <label>Telefono: </label>
                <br />
                <input type="text" className="form-control" name="telefono" onChange={handleChange}/>
                <br />
                <label>Email: </label>
                <br />
                <input type="text" className="form-control" name="email" onChange={handleChange}/>
                <br />
                <label>Red Social: </label>
                <br />
                <input type="text" className="form-control" name="redSocial" onChange={handleChange}/>
                <br />
                <label>Fecha: </label>
                <br />
                <input type="text" className="form-control" name="fecha" onChange={handleChange}/>
                <br />
                <label>Organizador: </label>
                <br />
                <input type="text" className="form-control" name="organizador" onChange={handleChange}/>
                <br />
              </div>
            </ModalBody>
            <ModalFooter>
              <button className="btn btn-primary" onClick={()=>peticionPost()}>Insertar</button>{"   "}
              <button className="btn btn-danger" onClick={()=>abrirCerrarModalInsertar()}>Cancelar</button>
            </ModalFooter>
          </Modal>
      
      
          
          <Modal isOpen={modalEditar}>
            <ModalHeader>Editar Form</ModalHeader>
            <ModalBody>
              <div className="form-group">
                <label>Nombre: </label>
                <br />
                <input type="text" className="form-control" name="nombre" onChange={handleChange} value={frameworkSeleccionado && frameworkSeleccionado.nombre}/>
                <br />
                <label>Telefono: </label>
                <br />
                <input type="text" className="form-control" name="telefono" onChange={handleChange} value={frameworkSeleccionado && frameworkSeleccionado.lanzamiento}/>
                <br />
                <label>Email: </label>
                <br />
                <input type="text" className="form-control" name="email" onChange={handleChange} value={frameworkSeleccionado && frameworkSeleccionado.desarrollador}/>
                <br />
                <label>Red Social: </label>
                <br />
                <input type="text" className="form-control" name="redSocial" onChange={handleChange} value={frameworkSeleccionado && frameworkSeleccionado.desarrollador}/>
                <br />
                <label>Fecha: </label>
                <br />
                <input type="text" className="form-control" name="fecha" onChange={handleChange} value={frameworkSeleccionado && frameworkSeleccionado.desarrollador}/>
                <br />
                <label>Organizador: </label>
                <br />
                <input type="text" className="form-control" name="organizador" onChange={handleChange} value={frameworkSeleccionado && frameworkSeleccionado.desarrollador}/>
                <br />
              </div>
            </ModalBody>
            <ModalFooter>
              <button className="btn btn-primary" onClick={()=>peticionPut()}>Editar</button>{"   "}
              <button className="btn btn-danger" onClick={()=>abrirCerrarModalEditar()}>Cancelar</button>
            </ModalFooter>
          </Modal>
      
          <Modal isOpen={modalEliminar}>
              <ModalBody>
              ¿Estás seguro que deseas eliminar el eliminar estos datos? {frameworkSeleccionado && frameworkSeleccionado.nombre}?
              </ModalBody>
              <ModalFooter>
                <button className="btn btn-danger" onClick={()=>peticionDelete()}>
                  Sí
                </button>
                <button
                  className="btn btn-secondary"
                  onClick={()=>abrirCerrarModalEliminar()}
                >
                  No
                </button>
              </ModalFooter>
            </Modal>
      
          </div>
        );
      }
    
    export default Visor
                  
        
         
            
          
            

