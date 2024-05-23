import React from "react";

// Función para eliminar un producto por ID
const handleDeleteProduct = async (productId) => {
  try {
    // Envía una solicitud DELETE a la API para eliminar el producto específico
    const response = await fetch(`https://fakestoreapi.com/products/${productId}`, {
      method: "DELETE"
    });

    // Verifica si la eliminación fue exitosa
    if (response.ok) {
      // Filtra los productos para mantener solo aquellos cuyo ID no coincida con el ID del producto a eliminar
      const updatedProducts = products.filter(product => product.id !== productId);
      setProducts(updatedProducts);
      // Muestra una notificación de éxito
      setNotification({ show: true, message: 'Producto eliminado exitosamente', type: 'success' });
    } else {
      console.error('No se pudo eliminar el producto');
    }
  } catch (error) {
    console.error('Error al eliminar el producto:', error);
  }
};

export default DeleteItem;