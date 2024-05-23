import React, { useState } from "react";
import Modal from 'react-modal';
import { useSpring, animated } from 'react-spring';
import './SectionItem.css';

// Configuración del elemento raíz para el modal
Modal.setAppElement('#root');

// Función para la sección principal
function SectionItem() {

  // Estado para controlar la visibilidad del modal
  const [showAddItemModal, setShowAddItemModal] = useState(false);

  // Configuración de la animación del modal
  const modalAnimation = useSpring({
    opacity: showAddItemModal ? 1 : 0,
    transform: showAddItemModal ? 'translateY(0)' : 'translateY(-50px)',
    config: { duration: 600 }, // Duración de la animación en milisegundos
  });

  // Función para abrir el modal
  const handleOpenAddItemModal = () => {
    setShowAddItemModal(true);
  };

  // Función para cerrar el modal
  const handleCloseAddItemModal = () => {
    setShowAddItemModal(false);
  };

  return (
    <div className="main-section">
      <div className="title-section">
        <h2>Lista de Items</h2>
        <button className="add-item-button" onClick={handleOpenAddItemModal}>
          Agregar elemento +
        </button>
        <div className="navbar-search"> {/* Contenedor para el search */}
          <input type="text" placeholder="  Buscar item..." />
        </div>
      </div>

      {/* Formulario modal para agregar item */}
      <Modal
        isOpen={showAddItemModal}
        onRequestClose={handleCloseAddItemModal}
        className="Modal__content"
        overlayClassName="Modal__overlay"
      >
        <animated.div style={modalAnimation}>
          <div>
            <h2>Agregar elemento</h2>
            <form className="form-modal">
              <label htmlFor="itemName">Nombre</label>
              <input type="text" id="itemName" name="itemName" required />
              <label htmlFor="itemDescription">Descripción</label>
              <textarea id="itemDescription" name="itemDescription" rows="5" required />
              <label htmlFor="itemPhoto">Foto</label>
              <input type="file" id="itemPhoto" name="itemPhoto" />
              <button type="submit">Guardar</button>
              <button type="button" onClick={handleCloseAddItemModal}>Cancelar</button>
            </form>
          </div>
        </animated.div>
      </Modal>
    </div>
  );
}

export default SectionItem;
