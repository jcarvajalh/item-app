import React, { useState, useEffect } from "react";
import { useSpring, animated } from 'react-spring';
import Modal from 'react-modal';
import axios from 'axios'; // Importa Axios para realizar solicitudes HTTP
import SearchBar from './searchBar.jsx';
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

  // Función para agregar un nuevo producto
  const handleAddProduct = async (newProduct) => {
    try {
      const response = await fetch('https://fakestoreapi.com/products');
      const productsFromAPI = await response.json();

      const isProductValid = productsFromAPI.some(product =>
        product.title === newProduct.title &&
        product.price === newProduct.price &&
        product.description === newProduct.description &&
        product.category === newProduct.category &&
        product.image === newProduct.image
      );

      if (isProductValid) {
        const addProductResponse = await fetch('https://fakestoreapi.com/products', {
          method: "POST",
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(newProduct)
        });

        if (addProductResponse.ok) {
          const product = await addProductResponse.json();
          setProducts([...products, product]);
          setNotification({ show: true, message: 'Producto agregado exitosamente', type: 'success' });
        } else {
          setNotification({ show: true, message: 'No se pudo agregar el producto. Datos incorrectos.', type: 'error' });
        }
      } else {
        setNotification({ show: true, message: 'No se pudieron agregar los productos. Datos incorrectos', type: 'error' });
      }
    } catch (error) {
      console.error('Error al verificar los productos:', error);
      setNotification({ show: true, message: 'Ocurrió un error al verificar los productos.', type: 'error' });
    }
    handleCloseAddItemModal();
  };

  //Función para eliminar un prodcuto de la lista
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
        setProducts(updatedProducts); // Actualiza el estado con la lista de productos actualizada
        // Muestra una notificación de éxito
        setNotification({ show: true, message: 'Producto eliminado exitosamente', type: 'success' });
      } else {
        console.error('No se pudo eliminar el producto');
      }
    } catch (error) {
      console.error('Error al eliminar el producto:', error);
    }
  };  
  
  //Efecto para la ocultación de la notificación al eliminar el producto
  useEffect(() => {
    let timer;
    if (notification.show) {
      // Si la notificación está visible, establece un temporizador para ocultarla después de 3 segundos
      timer = setTimeout(() => {
        setNotification(prev => ({ ...prev, show: false }));
      }, 2000);
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

  // Obtener la lista de productos cuando el componente se monta
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('https://fakestoreapi.com/products');
        setProducts(response.data);
      } catch (error) {
        console.error('Error al obtener los productos:', error);
      }
    };

    fetchProducts();
  }, []);

  //Longitud maxima de la descripción
  const maxLength = 100;
  const [showFullDescription, setShowFullDescription] = useState(false);

  // Función para manejar el clic en el botón "Leer más"
  const handleReadMore = () => {
    setShowFullDescription(true);
  };

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
              <button type="submit">Guardar</button>
              <button type="button" onClick={handleCloseAddItemModal}>Cancelar</button>
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
                <p>
                   {/* Mostrar una parte de la descripción */}
                   {showFullDescription ? product.description : `${product.description.slice(0, maxLength)}...`}
                   {/* Mostrar el botón "Leer más" si la descripción es más larga que la longitud máxima */}
                   {product.description.length > maxLength && (
                     <button className="leer-mas" onClick={handleReadMore}>
                       Leer más...
                     </button>
                )}
              </p>
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

