import Axios from 'axios';
import './App.css';
import {useState} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';

import Swal from 'sweetalert2';
// import withReactContent from 'sweetalert2-react-content';

// const noti = withReactContent(Swal);

function App() {  
  
  const [nombre, setNombre] = useState("");
  const [edad, setEdad] = useState("");
  const [pais, setPais] = useState("");
  const [cargo, setCargo] = useState("");
  const [anios, setAnios] = useState("");
  const [id, setId] = useState("");
  
  const [editar, setEditar] = useState(false);
  const [empleadosList,setEmpleados] = useState([]);

  const add = ()=>{
    Axios.post("http://localhost:3001/create",{
      nombre:nombre,
      edad:edad,
      pais:pais,
      cargo:cargo,
      anios:anios
    }).then(()=>{
      getEmpleados();
      limpiarCampos();
      Swal.fire({
        title: "<strong>Registro exitoso!!!</strong>",
        html: `<i>Empleado <strong>${nombre}</strong> registrado con éxito</i>`,
        icon: 'success',
        timer: 3000
      });
    }).catch((e)=>{
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Intentalo nuevamente',
        footer: JSON.parse(JSON.stringify(e)).message
      });
    });
  }

  const update = ()=>{
    Axios.put("http://localhost:3001/update",{
      nombre:nombre,
      edad:edad,
      pais:pais,
      cargo:cargo,
      anios:anios,
      id:id
    }).then(()=>{
      getEmpleados();
      limpiarCampos();
      Swal.fire({
        title: "<strong>Actualización exitosa!!!</strong>",
        html: `<i>Empleado <strong>${nombre}</strong> actualizado con éxito</i>`,
        icon: 'success',
        timer: 3000
      });
    }).catch((e)=>{
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Intentalo nuevamente',
        footer: JSON.parse(JSON.stringify(e)).message
      });
    });
  }

  const deleteEmp = (value)=>{

    Swal.fire({
      title: "<strong>Eliminar empleado</strong>",
      html: `<i>Desea eliminar al empleado <strong>${value.nombre}</strong>?</i>`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar'
    }).then((result)=>{
      if(result.isConfirmed){
        Axios.delete(`http://localhost:3001/delete/${value.id}`).then(()=>{
          getEmpleados();
          limpiarCampos();
          Swal.fire(
            'Eliminado!',
            `${value.nombre} eliminado con exito`,
            'success'
          );
        }).catch((e)=>{
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Intentalo nuevamente',
            footer: JSON.parse(JSON.stringify(e)).message
          });
        });
      }
    });
  }

  const limpiarCampos = ()=>{
    setAnios("");
    setNombre("");
    setCargo("");
    setEdad("");
    setPais("");
    setEditar(false);
  }

  const editarEmpleado = (val)=>{
    setEditar(true);

    setNombre(val.nombre);
    setEdad(val.edad);
    setCargo(val.cargo);
    setPais(val.pais);
    setAnios(val.anios);
    setId(val.id);
  }

  const getEmpleados = ()=>{
    Axios.get("http://localhost:3001/empleados").then((res)=>{setEmpleados(res.data);});
  }

   getEmpleados();

  return (
    <div className='container'>

      <div className="card text-center">
        <div className="card-header">
          Gestión de empleados
        </div>
        <div className="card-body">
          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">Nombre:</span>
            <input onChange={(event)=>{setNombre(event.target.value);}} value={nombre} type="text" className="form-control" placeholder="Ingrese el nombre" aria-label="Username" aria-describedby="basic-addon1"/>
          </div>
          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">Edad:</span>
            <input onChange={(event)=>{setEdad(event.target.value);}} value={edad} type="number" className="form-control" placeholder="Ingrese la edad" aria-label="Username" aria-describedby="basic-addon1"/>
          </div>
          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">País:</span>
            <input onChange={(event)=>{setPais(event.target.value);}} value={pais} type="text" className="form-control" placeholder="Ingrese el país" aria-label="Username" aria-describedby="basic-addon1"/>
          </div>
          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">Cargo:</span>
            <input onChange={(event)=>{setCargo(event.target.value);}} value={cargo} type="text" className="form-control" placeholder="Ingrese el cargo" aria-label="Username" aria-describedby="basic-addon1"/>
          </div>
          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">Años:</span>
            <input onChange={(event)=>{setAnios(event.target.value);}} value={anios} type="number" className="form-control" placeholder="Ingrese los años" aria-label="Username" aria-describedby="basic-addon1"/>
          </div>
        </div>               
        <div className="card-footer text-muted">        
          {
            editar===true?
            <div>
            <button className='btn btn-warning m-2' onClick={update}>Actualizar</button> 
            <button className='btn btn-info m-2' onClick={limpiarCampos}>Cancelar</button>
            </div>
            :<button className='btn btn-success' onClick={add}>Registrar</button>
          }      
        </div>
      </div>

      <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Nombre</th>
            <th scope="col">Edad</th>
            <th scope="col">País</th>
            <th scope="col">Cargo</th>
            <th scope="col">Experiencia</th>
            <th scope="col">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {
            empleadosList.map((value,key)=>{
            return <tr key={value.id}>
              <th>{value.id}</th>
              <td>{value.nombre}</td>
              <td>{value.edad}</td>
              <td>{value.pais}</td>
              <td>{value.cargo}</td>
              <td>{value.anios}</td>
              <td>
              <div className="btn-group" role="group" aria-label="Basic example">
                <button type="button" onClick={()=>{editarEmpleado(value)}} className="btn btn-primary">Editar</button>
                <button type="button" onClick={()=>{deleteEmp(value)}} className="btn btn-danger">Eliminar</button>
              </div>
              </td>
            </tr>
            })
          }
        </tbody>
      </table>

    </div>
  );
}

export default App;
