import React, { useEffect, useState } from "react";
import Modal from "./Modal";
import { useSearchParams } from "react-router-dom";
import { getAllPrescriptionsByUser } from "../../apiCalls/prescription";
import Loading from "../../pages/Loading/Loading";
import { domain } from "../../../secret";

const Prescription = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const [isLoading, setIsLoading] = useState(true);
  const [prescriptions, setPrescriptions] = useState([]);

  const [selectedImage, setSelectedImage] = useState("");

  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");

  const getPrescriptions = async () => {
    setIsLoading(true);
    const data = await getAllPrescriptionsByUser(id);
    setPrescriptions(data.prescriptions);

    setIsLoading(false);
  };

  useEffect(() => {
    getPrescriptions();
  }, [id]);

  const handleCardClick = (imageUrl) => {
    setSelectedImage(imageUrl);
    setIsModalVisible(true);
  };

  const closeModal = () => {
    setIsModalVisible(false);
    setSelectedImage("");
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-8 text-center">Prescriptions</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {prescriptions.map((prescription) => (
          <div
            key={prescription.id}
            className="bg-white p-4 rounded-lg shadow-md cursor-pointer"
            onClick={() =>
              handleCardClick(`${domain}/files/${prescription.image}`)
            }
          >
            <img
              src={`${domain}/files/${prescription.image}`}
              alt="Prescription"
              className="w-full h-48 object-cover rounded-t-lg mb-4"
            />
          </div>
        ))}
      </div>
      <Modal
        isVisible={isModalVisible}
        onClose={closeModal}
        imageUrl={selectedImage}
      />
    </div>
  );
};

export default Prescription;
