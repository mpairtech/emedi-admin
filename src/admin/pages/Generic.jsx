import { useEffect } from "react";
import { useState } from "react";
import { Modal } from 'react-responsive-modal';
import { AiFillEdit } from "react-icons/ai";
import { MdDeleteForever } from "react-icons/md";
import Loading from "../../pages/Loading/Loading";
import {
  addGeneric,
  deleteGeneric,
  getAllGenerics,
  getSingleGeneric,
  updateGeneric,
} from "../../apiCalls/generic";

const Generic = () => {

  const [generics, setGenerics] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [editedValue, setEditedValue] = useState({})
  const [open, setOpen] = useState(false);



  const getGenerics = async () => {
    setIsLoading(true);
    const data = await getAllGenerics();
    setGenerics(data.generics);
    setIsLoading(false);
  };



  useEffect(() => {
    getGenerics();
  }, []);



  const genericSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;

    await addGeneric({ name: form.generic.value });

    await getGenerics();

    
  };


  const handleDelete = async (id) => {
    const data = await deleteGeneric(id);
    getGenerics();
  };





  const handleSearch = () => {
    // if (searchTerm) {
    //   const filteredServices = services.filter((service) =>
    //     service._id.toLowerCase().includes(searchTerm.toLowerCase())
    //   );
    //   setServices(filteredServices);
    // } else {
    //   getServices();
    // }
  };

  if (isLoading) {
    return <Loading />;
  }


  const onOpenModal = async (id) => {

    const data = await getSingleGeneric(id)
    setEditedValue(data.generic)
    setOpen(true)
  }
  const onCloseModal = () => setOpen(false);

  const handleEdit = async()=>{
    await updateGeneric({genericId: editedValue.id, name: editedValue.name})
    await getGenerics()

    onCloseModal()
  }

  const modalStyles = {
    modal: {
      maxWidth: '800px',
      width: '50%',
      padding: '20px',
  
    }
  };

  return (
    <div className="bg-white px-4 pt-3 pb-4 rounded-sm border border-gray-200 flex-1 lg:mx-32">

      <div className="mb-4">
        <strong className="text-gray-700 font-medium mb-2">
          Insert Generic Name
        </strong>
        <div className="bg-gray-100 p-4 rounded-sm items-start">
          <form onSubmit={genericSubmit}>

            <input
              type="text"
              name="generic"
              placeholder="Name"
              required
              className="w-2/3 border border-gray-400 m-5 p-2 mb-2"
            />



            <button
              className="bg-green-500 hover:bg-green-700 text-white font-bold p-1 px-2 rounded m-5"
              type="submit"
            >
              Add Generic Name
            </button>
          </form>
        </div>
      </div>

      <div className="flex justify-between items-center mb-3">
        <strong className="text-gray-700 font-medium">
          View Generic Names
        </strong>

        <div className="flex items-center">
          <input
            type="text"
            placeholder="Search Here ..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border mr-2 px-3 py-1 rounded w-[14rem]"
          />
          <button
            onClick={handleSearch}
            className="bg-blue-500 text-white px-3 py-1 rounded"
          >
            Search
          </button>
        </div>
      </div>
      <div className="border-x border-gray-200 rounded-sm mt-3 overflow-x-auto sticky top-0 h-[95vh]">
        <table className="w-full text-gray-700 text-xs">
          <thead>
            <tr>
              <th>Generic Name</th>


              <th>Created At</th>

              <th>Updated At</th>

              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {generics.map((generic) => (
              <tr key={generic.id}>
                <td>
                  {generic.name}
                </td>

                <td>{generic.createdAt}</td>
                <td>{generic.updatedAt}</td>

                <td>

                  <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded mr-1"
                    onClick={() => onOpenModal(generic.id)}
                  >
                    <AiFillEdit />
                  </button>

                  <button
                    className="bg-red-500 hover:bg-red-700 text-white py-1 px-2 rounded font-bold"
                    onClick={() => handleDelete(generic.id)}
                  >
                    <MdDeleteForever />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* modal */}

      <div>

        <Modal open={open} onClose={onCloseModal} center styles={modalStyles}>
          <label htmlFor="genericName">
            Edit Generic Name
            <input
              type="text"
              name="generic"
              placeholder="Name"
              defaultValue={editedValue.name}
              required
              className="w-full border border-gray-400 p-2 my-2"
              onChange={(e)=> setEditedValue({...editedValue, name: e.target.value})}
            />
          </label>

          <div className="text-center mt-3">
            <button onClick={handleEdit}  className="bg-blue-500 text-white px-3 py-1 rounded">Submit</button>
          </div>
        </Modal>
      </div>


    </div>
  );
};

export default Generic;
