import React from 'react';
import './ImageButton.css'; // Import your CSS file

const ImageButton = ({ onClick, src, alt }) => {
  return (
    <button className="image-button" onClick={onClick}>
      <img src={src} alt={alt} />
    </button>
  );
};

export default ImageButton;
