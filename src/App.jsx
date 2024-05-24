import React, { useState } from 'react';
import Login from './login';
import NavBar from './Navegación/NavBar'; // Importar NavBar desde la nueva carpeta
import SectionItem from './Seccion-principal/SectionItem';



function App() {

  
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Función para manejar la autenticación exitosa
  const handleLoginSuccess = (token) => {
    // Aquí podrías guardar el token si lo necesitas más adelante
    localStorage.setItem('authToken', token); // Guardar el token en localStorage
    setIsAuthenticated(true); // Actualizamos el estado de autenticación
  };

  return (
    <div>
      {isAuthenticated ? (
        <>
          <NavBar />
          <SectionItem />
        </>
      ) : (
        <Login onLoginSuccess={handleLoginSuccess} />
      )}
    </div>
  );
}

export default App;
