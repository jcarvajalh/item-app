import React, { useState }  from "react";
import Modal                from 'react-modal'; // Importar Modal de react-modal
import './SectionItem.css';

  function SectionItem () {
     // Estado para controlar la visibilidad del modal
     const [showAddItemModal, setShowAddItemModal] = useState(false);
      
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
              <input type="text" placeholder="  Buscar item..."/>
          </div>
       </div>
   
       {/* Formulario modal para agregar item */}
       <Modal
         isOpen={showAddItemModal}
         onClose={handleCloseAddItemModal}
         style={{ content: { margin: 'auto' } }} // Centrar el modal
       >
         <h2>Agregar elemento</h2>
         <form>
           <label htmlFor="itemName">Nombre</label>
           <input type="text" id="itemName" name="itemName" required />
   
           <label htmlFor="itemDescription">Descripción</label>
           <textarea id="itemDescription" name="itemDescription" rows="5" required />
   
           <label htmlFor="itemPhoto">Foto</label>
           <input type="file" id="itemPhoto" name="itemPhoto" />
   
           <button type="submit">Guardar</button>
           <button type="button" onClick={handleCloseAddItemModal}>
             Cancelar
           </button>
         </form>
       </Modal>
     </div>
  );
};

export default SectionItem;

