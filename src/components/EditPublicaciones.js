import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const endpoint = 'http://localhost:8000/api';

const EditPublicaciones = () => {
    const { id } = useParams(); // ID de la publicación
    const navigate = useNavigate();

    const [titulo, setTitulo] = useState('');
    const [contenido, setContenido] = useState('');
    const [imagen, setImagen] = useState('');
    const [autorId, setAutorId] = useState(null); // Se almacena el ID del autor

    useEffect(() => {
        getPublicacionById();
    }, []);

    // Obtener la publicación para editar
    const getPublicacionById = async () => {
        try {
            const response = await axios.get(`${endpoint}/publicaciones/listar_id/${id}`);
            setTitulo(response.data.titulo);
            setContenido(response.data.contenido);
            setImagen(response.data.imagen);
            setAutorId(response.data.autor_id); // Guardar el autor_id correcto
        } catch (error) {
            console.error('Error al obtener la publicación:', error);
        }
    };

    // Actualizar la publicación
    const updatePublicacion = async (e) => {
        e.preventDefault();

        const datosActualizados = {
            titulo,
            contenido,
            imagen,
            autor_id: autorId, // Se mantiene el autor original
        };

        console.log('Enviando datos:', datosActualizados);

        try {
            await axios.put(`${endpoint}/publicaciones/actualizar/${id}`, datosActualizados, {
                headers: { 'Content-Type': 'application/json' }
            });

            navigate('/'); // Redirige al listado después de actualizar
        } catch (error) {
            console.error('Error al actualizar:', error.response?.data || error.message);
            alert('Error al actualizar la publicación. Revisa los datos.');
        }
    };

    return (
        <div className="container mt-5">
            <h3>Editar Publicación</h3>
            <form onSubmit={updatePublicacion}>
                <div className="mb-3">
                    <label className="form-label">Título</label>
                    <input 
                        type="text" 
                        className="form-control" 
                        value={titulo} 
                        onChange={(e) => setTitulo(e.target.value)} 
                        required 
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label">Contenido</label>
                    <textarea 
                        className="form-control" 
                        value={contenido} 
                        onChange={(e) => setContenido(e.target.value)} 
                        required 
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label">Imagen (URL)</label>
                    <input 
                        type="text" 
                        className="form-control" 
                        value={imagen} 
                        onChange={(e) => setImagen(e.target.value)} 
                    />
                </div>

                <button type="submit" className="btn btn-primary">Actualizar</button>
                <button type="button" className="btn btn-secondary ms-2" onClick={() => navigate('/')}>Cancelar</button>
            </form>
        </div>
    );
};

export default EditPublicaciones;
