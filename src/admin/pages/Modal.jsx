import React from "react";

const Modal = ({ isVisible, onClose, imageUrl }) => {
  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-4 rounded-lg shadow-md max-w-md w-full">
        <button className="text-gray-700 float-right" onClick={onClose}>
          &times;
        </button>
        <img
          src={imageUrl}
          alt="Prescription"
          className="w-full h-full object-cover rounded-lg"
        />
      </div>
    </div>
  );
};

export default Modal;
