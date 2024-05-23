import React from "react";
import './NavBar.css'; //Aqui se importa el css para el nav.


const NavBar = () => {
    return (
        
        <nav className="navbar">
            <div className="navbar-container"> {/* Contenedor para el contenido del navBar */}
                <div className="navbar-name"> {/* Contenedor para el nombre */}
                    <h1>Items Cloud Labs</h1>
                </div>
                
                <div className="navbar-actions"> {/* Contenedor para btn de cierre de sesión */}
                    <p>Bienvenid@</p>
                </div>
            </div>
        </nav>
    );
};
 
export default NavBar;