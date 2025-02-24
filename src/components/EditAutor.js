import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const endpoint = 'http://localhost:8000/api';

const EditAutor = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('');

    useEffect(() => {
        getAutorById();
    }, []);

    const getAutorById = async () => {
        try {
            const response = await axios.get(`${endpoint}/autores/listar_id/${id}`);
            setNombre(response.data.nombre);
            setApellido(response.data.apellido);
        } catch (error) {
            console.error('Error al obtener el autor:', error);
        }
    };

    const updateAutor = async (e) => {
        e.preventDefault();

        try {
            await axios.put(`${endpoint}/autores/actualizar/${id}`, {
                nombre,
                apellido
            }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            navigate('/autores');
        } catch (error) {
            console.error('Error al actualizar el autor:', error.response?.data || error.message);
        }
    };

    return (
        <div className="container mt-5">
            <h3>Editar Autor</h3>
            <form onSubmit={updateAutor}>
                <div className="mb-3">
                    <label className="form-label">Nombre</label>
                    <input 
                        type="text" 
                        className="form-control" 
                        value={nombre} 
                        onChange={(e) => setNombre(e.target.value)} 
                        required 
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label">Apellido</label>
                    <input 
                        type="text" 
                        className="form-control" 
                        value={apellido} 
                        onChange={(e) => setApellido(e.target.value)} 
                        required 
                    />
                </div>

                <button type="submit" className="btn btn-primary">Actualizar</button>
                <button type="button" className="btn btn-secondary ms-2" onClick={() => navigate('/autores')}>Cancelar</button>
            </form>
        </div>
    );
};

export default EditAutor;
