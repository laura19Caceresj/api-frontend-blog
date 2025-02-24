import React, {useEffect, useState} from 'react'
import axios from 'axios'

import {Link} from 'react-router-dom'

const endpoint ='http://localhost:8000/api'

const ShowAutor = () => {
   
    const [ autores, setAutores ] = useState( [] )

    useEffect (()=>{
        getAllAutores()
    }, [])


    const getAllAutores = async () => {
        const response= await axios.get(`${endpoint}/autores/listar`)
        setAutores(response.data)
    }

    const deleteAutores = async (id) => {
        try {
            await axios.delete(`${endpoint}/autores/eliminar/${id}`);
            getAllAutores(); // Recargar la lista
        } catch (error) {
            console.error('Error al eliminar el autor:', error.response?.data || error.message);
        }
    };
    
  return (
    <div>
        <div className='d-grid gap-2'>
            <Link to="/crearAutor" className='btn btn-success btn-lg mt-2 mb-2 text-white'>Crear</Link>

        </div>
        <table className='table table-striped'>
            <thead className='bg-primary text-white'>
                <tr>
                    <th>Nombre</th>
                    <th>Apellido</th>
                    <th>Accion</th>

                </tr>
            </thead>
            <tbody>
                {autores.map( (autores) =>(
                   <tr key={autores.id}>
                        <td> {autores.nombre}</td>
                        <td> {autores.apellido}</td>

                        <td>
                        <Link to={`/autores/editarAutor/${autores.id}`} className='btn btn-warning'>Editar</Link>
                        <button onClick={()=>deleteAutores(autores.id) } className='btn btn-danger' >Eliminar</button>
                        </td>

                   </tr> 
                ))}
            </tbody>
        </table>
    </div>
  )
}

export default ShowAutor