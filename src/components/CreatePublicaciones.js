import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const endpoint = 'http://localhost:8000/api/publicaciones/crear';
const endpointAutores = 'http://localhost:8000/api/autores/listar';

const CreatePublicacion = () => {
    const [titulo, setTitulo] = useState('');
    const [contenido, setContenido] = useState('');
    const [imagen, setImagen] = useState('');
    const [autor_id, setAutorId] = useState('');
    const [autores, setAutores] = useState([]); // Estado para almacenar la lista de autores
    const navigate = useNavigate();

    // Obtener lista de autores al cargar el componente
    useEffect(() => {
        const fetchAutores = async () => {
            try {
                const response = await axios.get(endpointAutores);
                setAutores(response.data); 
            } catch (error) {
                console.error("Error al obtener la lista de autores:", error.response?.data);
            }
        };
        fetchAutores();
    }, []);

    const store = async (e) => {
        e.preventDefault();
        try {
            await axios.post(endpoint, { titulo, contenido, imagen, autor_id }, {
                headers: { 'Content-Type': 'application/json' }
            });
            navigate('/');
        } catch (error) {
            console.error("Error al crear la publicación:", error.response?.data);
        }
    };

    return (
        <div className="container mt-5">
            <h3>Crear Publicación</h3>
            <form onSubmit={store}>
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
                    ></textarea>
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
                <div className="mb-3">
                    <label className="form-label">Autor</label>
                    <select 
                        className="form-control" 
                        value={autor_id} 
                        onChange={(e) => setAutorId(e.target.value)} 
                        required
                    >
                        <option value="">Selecciona un autor</option>
                        {autores.map((autor) => (
                            <option key={autor.id} value={autor.id}>
                                {autor.nombre} {autor.apellido}
                            </option>
                        ))}
                    </select>
                </div>
                <button type="submit" className="btn btn-primary">Guardar</button>
            </form>
        </div>
    );
};

export default CreatePublicacion;
