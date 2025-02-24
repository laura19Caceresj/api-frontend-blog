import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const endpoint = 'http://localhost:8000/api/autores/crear';

const CreateAutor = () => {
    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('');
    const navigate = useNavigate();

    const store = async (e) => {
        e.preventDefault();
        try {
            await axios.post(endpoint, { nombre, apellido });
            navigate('/autores'); // Redirige a la lista de autores
        } catch (error) {
            console.error('Error al crear el autor:', error.response?.data || error.message);
        }
    };

    return (
        <div className="container mt-4">
            <h3>Crear Autor</h3>
            <form onSubmit={store}>
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
                <button type="submit" className="btn btn-success">Guardar</button>
            </form>
        </div>
    );
};

export default CreateAutor;
