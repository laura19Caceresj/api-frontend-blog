import './App.css';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

// Importar nuestros componentes
import ShowPublicaciones from './components/ShowPublicaciones';
import CreatePublicaciones from './components/CreatePublicaciones';
import EditPublicaciones from './components/EditPublicaciones';
import ShowAutor from './components/ShowAutor';
import CreateAutor from './components/CreateAutor';
import EditAutor from './components/EditAutor';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        {/* Menú de navegación */}
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
          <div className="container">
            <Link className="navbar-brand" to="/">Blog</Link>
            <div className="collapse navbar-collapse">
              <ul className="navbar-nav me-auto">
                <li className="nav-item">
                  <Link className="nav-link" to="/publicaciones">Publicaciones</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/autores">Autores</Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>

        {/* Definir rutas */}
        <Routes>
          <Route path="/" element={<ShowPublicaciones />} />
          <Route path="/publicaciones" element={<ShowPublicaciones />} />
          <Route path="/crear" element={<CreatePublicaciones />} />
          <Route path="/editar/:id" element={<EditPublicaciones />} />

          <Route path="/autores" element={<ShowAutor />} />
          <Route path="/crearAutor" element={<CreateAutor />} />
          <Route path="/autores/editarAutor/:id" element={<EditAutor />} />  {/* ✅ Agregamos la ruta para editar */}


        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;