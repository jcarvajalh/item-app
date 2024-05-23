import React, { useState, useEffect } from "react";
import Modal from 'react-modal';
import { useSpring, animated } from 'react-spring';
import './SectionItem.css';

// Configuración del elemento raíz para el modal
Modal.setAppElement('#root');

// Función para la sección principal
function SectionItem() {
  // Estado para controlar la visibilidad del modal
  const [showAddItemModal, setShowAddItemModal] = useState(false);

  // Estado para almacenar la lista de productos
  const [products, setProducts] = useState([]);

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

  useEffect(() => {
    let timer;
    if (notification.show) {
      timer = setTimeout(() => {
        setNotification(prev => ({ ...prev, show: false }));
      }, 5000); //Tiempo que dura la animación
    }

    return () => clearTimeout(timer); //Reiniciar notificación
  }, [notification]);

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
            <h2>Agregar elementos</h2>
            <form className="form-modal" onSubmit={(e) => {
              e.preventDefault(); // Evita que se recargue la página al enviar el formulario
              const formData = new FormData(e.target);
              const newProduct = {
                title: formData.get('itemName'),
                price: parseFloat(formData.get('itemPrice')),
                description: formData.get('itemDescription'),
                category: formData.get('itemCateg'),
                image: formData.get('itemPhoto'), // Obtiene la URL de la imagen del campo de entrada
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

      {/* Muestra la lista de productos */}
      <div className="product-list">
        {products.map(product => (
          <div key={product.id} className="product-card">
            <img src={product.image} alt={product.title} />
            <h3>{product.title}</h3>
            <p>{product.description}</p>
            <p>Precio: {product.price} USD</p>
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
