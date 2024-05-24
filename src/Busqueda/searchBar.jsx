import React, { useState } from "react";
import  '../Seccion-principal/SectionItem.css';

function SearchBar({ onSearch }) {
  const [searchTerm, setSearchTerm] = useState("");

  // Función para manejar cambios en la barra de búsqueda
  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  // Función para manejar la acción de búsqueda
  const handleSearch = () => {
    // Llama a la función de búsqueda pasada como prop
    onSearch(searchTerm);
  };

  return (
    <div>
      <input
        type="text"
        placeholder="  Buscar productos..."
        value={searchTerm}
        onChange={handleChange}
      />
      
      <button className="search-button" onClick={handleSearch}>Buscar</button>
    </div>
  );
}

export default SearchBar;
