import React, { useState, useEffect } from "react";
import { useSpring, animated } from 'react-spring';
import Modal from 'react-modal';
import axios from 'axios'; // Importa Axios para realizar solicitudes HTTP
import SearchBar from "../Busqueda/searchBar";
import './SectionItem.css';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';

// Configuración del elemento raíz para el modal
Modal.setAppElement('#root');

// Función para la sección principal
function SectionItem() {

  // Estado para controlar la visibilidad del modal
  const [showAddItemModal, setShowAddItemModal] = useState(false);

  // Estado para almacenar la lista de productos
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]); // Estado para los productos filtrados

  //Estado para las notificaciones
  const [notification, setNotification] = useState({ show: false, message: '', type: '' });

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

  //Funcion para agregar el producto
  const handleAddProduct = async (newProduct) => {
    try {
      // Obtener todos los productos de la API
      const response = await fetch('https://fakestoreapi.com/products');
      const productsFromAPI = await response.json();
  
      // Verificar si el nuevo producto está duplicado
      const isProductDuplicate = products.some(product =>
        product.title === newProduct.title &&
        product.price === newProduct.price &&
        product.description === newProduct.description &&
        product.category === newProduct.category &&
        product.image === newProduct.image
      );
  
      if (isProductDuplicate) {
        // Si el producto ya existe, mostrar una notificación de error
        setNotification({ show: true, message: 'El producto ya existe', type: 'error' });
      } else {
        // Verificar si el nuevo producto coincide exactamente con algún producto de la API
        const isProductValid = productsFromAPI.some(product =>
          product.title === newProduct.title &&
          product.price === newProduct.price &&
          product.description === newProduct.description &&
          product.category === newProduct.category &&
          product.image === newProduct.image
        );
  
        if (isProductValid) {
          // Si el producto es válido, realizar la solicitud POST para agregar el producto
          const addProductResponse = await fetch('https://fakestoreapi.com/products', {
            method: "POST",
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(newProduct)
          });
  
          if (addProductResponse.ok) {
            const product = await addProductResponse.json();
            setProducts(prevProducts => [...prevProducts, product]);
            setFilteredProducts(prevProducts => [...prevProducts, product]);
            setNotification({ show: true, message: 'Producto agregado exitosamente', type: 'success' });
          } else {
            setNotification({ show: true, message: 'No se pudo agregar el producto. Datos incorrectos.', type: 'error' });
          }
        } else {
          // Si el producto no es válido, mostrar una notificación de error
          setNotification({ show: true, message: 'No se pudo agregar el producto. Datos incorrectos.', type: 'error' });
        }
      }
    } catch (error) {
      console.error('Error al verificar los productos:', error);
      setNotification({ show: true, message: 'Ocurrió un error al verificar los productos.', type: 'error' });
    }
    handleCloseAddItemModal();
  };
  
  
  // Función para eliminar un producto de la lista
const handleDeleteProduct = async (productId) => {
  try {
    const response = await fetch(`https://fakestoreapi.com/products/${productId}`, {
      method: 'DELETE'
    });

    if (response.ok) {
      const updatedProducts = products.filter(product => product.id !== productId);
      setProducts(updatedProducts);
      setNotification({ show: true, message: 'Producto eliminado exitosamente', type: 'success' });
    } else {
      console.error('No se pudo eliminar el producto');
    }
  } catch (error) {
    console.error('Error al eliminar el producto:', error);
  }
};
  
  // Efecto para la ocultación de la notificación al eliminar el producto
  useEffect(() => {
    let timer;
    if (notification.show) {
      // Si la notificación está visible, establece un temporizador para ocultarla después de 3 segundos
      timer = setTimeout(() => {
        setNotification(prev => ({ ...prev, show: false }));
      }, 3000); // Tiempo que dura la animación
    }
    return () => clearTimeout(timer); // Reiniciar la animación
  }, [notification]);

  

  // Función para buscar productos por su nombre/título
  const searchProducts = (searchTerm) => {
    const filtered = products.filter(product =>
      product.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredProducts(filtered);
  };

  // Obtener la lista de productos
  useEffect(() => {
    
  }, []);

  return (
    <div className="main-section">
      <div className="title-section">
        <h2>Lista de Items</h2>
        <button className="add-item-button" onClick={handleOpenAddItemModal}>
          Agregar elemento +
        </button>
        <div className="navbar-search"> {/* Contenedor para el search */}
          {/* Utiliza el componente SearchBar para la barra de búsqueda */}
          <SearchBar onSearch={searchProducts} />
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
            <h2>Agregar elementos</h2>
            <form className="form-modal" onSubmit={(e) => {
              e.preventDefault(); // Evita que se recargue la página al enviar el formulario
              const formData = new FormData(e.target);
              const newProduct = {
                title: formData.get('itemName'),
                price: parseFloat(formData.get('itemPrice')),
                description: formData.get('itemDescription'),
                category: formData.get('itemCateg'),
                image: formData.get('itemPhoto'), // Obtiener la URL de la imagen del campo de entrada
              };
              handleAddProduct(newProduct); // Agrega el nuevo producto a la lista
            }}>
              <label htmlFor="itemName">Nombre</label>
              <input type="text" id="itemName" name="itemName" required />
              <label htmlFor="itemPrice">Precio</label>
              <input type="number" id="itemPrice" name="itemPrice" step="0.01" required />
              <label htmlFor="itemDescription">Descripción</label>
              <textarea id="itemDescription" name="itemDescription" rows="5" required />
              <label htmlFor="itemCateg">Categoria</label>
              <input type="text" id="itemCateg" name="itemCateg" required />
              <label htmlFor="itemPhoto">URL de la Foto</label>
              <input type="text" id="itemPhoto" name="itemPhoto" required />
              <div className="button-container">
                 {/* Contenedor para los botones */}
              <button type="submit">Guardar</button>
              <button type="button" onClick={handleCloseAddItemModal}>Cancelar</button>
            </div>
            </form>
          </div>
        </animated.div>
      </Modal>

      {/* Lista de productos */}
    <div className="product-list">
          {/* Usar filteredProducts en lugar de products para mostrar solo los productos filtrados */}
          {filteredProducts.map(product => (
            <div key={product.id} className="product-card">
            
              {/* Mostrar título, descripción, precio e imagen del producto */}
              <img src={product.image} alt={product.title} />
              <h3>{product.title}</h3>
              <div className="description-box">
                {/* Mostrar la descripción completa si supera los 125 caracteres */}
              <div className="description-container">
                {product.description.length > 125 ? (
                  <p className="scrollable-description">{product.description}</p>
                ) : (
                  <p>{product.description}</p>
                )}
              </div>
            </div>

        <p>Precio: {product.price} USD</p>

        {/* Botón de eliminar */}
        <IconButton onClick={() => handleDeleteProduct(product.id)} aria-label="Eliminar" color="error"
          sx={{ bgcolor:'#ffffff',
                border: '2px solid transparent', // Borde transparente normal
                borderRadius: '50%', // Borde redondo
                height: '50px',
                width: '50px',
                transition: 'border-color 0.5s ease',
                '&:hover': {
                  bgcolor: 'white', // Color de fondo al pasar el mouse
                  borderColor: 'black', // Color del borde al pasar el mouse
                  },
              }} >
            <DeleteIcon />
          </IconButton>
        </div>
      ))}
    </div>

      {/* Mostrar notificación */}
      {notification.show && (
        <div className={`notification ${notification.type} ${notification.show ? '' : 'hide'}`}>
          {notification.message}
        </div>
      )}
    </div>
  );
}

export default SectionItem;

