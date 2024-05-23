import React from "react";

const DeleteItem = ({ productId, onDelete }) => {
  // Función para manejar la eliminación del producto
  const handleDelete = () => {
    onDelete(productId);
  };

  return (
    <button onClick={handleDelete}>
      Eliminar
    </button>
  );
};

export default DeleteItem;
