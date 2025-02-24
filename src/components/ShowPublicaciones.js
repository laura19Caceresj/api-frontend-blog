import React, {useEffect, useState} from 'react'
import axios from 'axios'

import {Link} from 'react-router-dom'

const endpoint ='http://localhost:8000/api'



const ShowPublicaciones = () => {
   
    const [ publicaciones, setPublicaciones ] = useState( [] )

    useEffect (()=>{
        getAllPublicaciones()
    }, [])


    const getAllPublicaciones = async () => {
        const response = await axios.get(`${endpoint}/publicaciones/listar`);

        setPublicaciones(response.data)
    }

    const deletePublicaciones = async (id)=>{
        await axios.delete(`${endpoint}/publicaciones/eliminar/${id}`)
        getAllPublicaciones()

    }

  return (
    <div>
        <div className='d-grid gap-2'>
            <Link to="/crear" className='btn btn-success btn-lg mt-2 mb-2 text-white'>Crear</Link>

        </div>
        <table className='table table-striped'>
            <thead className='bg-primary text-white'>
                <tr>
                    <th>Titulo</th>
                    <th>Contenido</th>
                    <th>Imagen</th>
                    <th>ID_Autor</th>
                    <th>Accion</th>
                </tr>
            </thead>
            <tbody>
                {publicaciones.map( (publicaciones) =>(
                   <tr key={publicaciones.id}>
                        <td> {publicaciones.titulo}</td>
                        <td> {publicaciones.contenido}</td>
                        <td> {publicaciones.imagen}</td>
                        <td> {publicaciones.autor_id}</td>
                        <td>
                            <Link to={`/editar/${publicaciones.id}`} className='btn btn-warning'>Editar</Link>
                            <button onClick={()=>deletePublicaciones(publicaciones.id) } className='btn btn-danger' >Eliminar</button>
                        </td>

                   </tr> 
                ))}
            </tbody>
        </table>
    </div>
  )
}

export default ShowPublicaciones