import { useState } from 'react';
import { useEffect } from 'react';
import { getAllApplications, updateApplicationStatus } from '../../apiCalls/jobReq';
import { GrDocumentPdf } from "react-icons/gr";

import PureModal from 'react-pure-modal';




const JobRequest = () => {
  const [modal, setModal] = useState(false);
  const [modalData, setModalData] = useState({});
  const [searchTerm, setSearchTerm] = useState('');

  const [jobRequests, setJobRequests] = useState([]);

  const getApplications = async () => {

    const data = await getAllApplications();
    setJobRequests(data.applicationData)

  }


  useEffect(() => {

    getApplications();

  }, [])


  const currentStatus = [
    "pending",
    "accepted",
    "rejected",
  ]





  const handleModalData = (obj) => {
    setModalData(obj)
    setModal(true)
  }


  const handleChangedStatus = async (id, status) => {

    await updateApplicationStatus({ id, status });
    getApplications();

  }


  const handleSearch = () => {
    if (searchTerm) {
      const filteredJobRequests = jobRequests.filter((request) =>
        request._id.toLowerCase().includes(searchTerm.toLowerCase())

      );
      setJobRequests(filteredJobRequests);
    } else {
      getApplications();
    }
  };


  return (
    <div className="bg-white p-4 rounded-sm border border-gray-200 flex-1">
      <div className="flex justify-between items-center mb-3">
        <strong className="text-gray-700 font-medium">View Job Requests</strong>
        <div className="flex items-center">
          <input
            type="text"
            placeholder="Search Here ..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border mr-2 px-3 py-1 rounded w-[14rem]"
          />
          <button onClick={handleSearch} className="bg-blue-500 text-white px-3 py-1 rounded">
            Search
          </button>
        </div>
      </div>
      <div className=" max-h-screen overflow-auto mt-3 overflow-x-auto sticky top-0 h-[95vh]">
        <table className="w-full text-gray-700">
          <thead>
            <tr>
              <th className="py-2">Application ID</th>
              <th className="py-2">Applicant's ID</th>
              <th className="py-2">Job</th>
              <th className="py-2">Email</th>
              <th className="py-2">Phone</th>
              <th className="py-2">CV</th>
              <th className="py-2">Status</th>
              <th className="py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {jobRequests.map(request => (
              <tr key={request._id}>
                <td className="py-2">{request._id}</td>
                <td className="py-2">{request.applicant._id}</td>
                <td className="py-2 capitalize">{request.category.name}</td>
                <td className="py-2">{request.applicant.email}</td>
                <td className="py-2">{request.applicant.phone}</td>
                <td className="py-2">

                  <button className="button text-2xl" onClick={() => handleModalData({ cv: request.cv[0].secure_url, aid: request._id, aname: request.applicant.name })}><GrDocumentPdf /></button>
                </td>
                <td>
                  <span
                    className={`inline-block py-1 text-white px-2 rounded capitalize w-20 text-center ${request.status === 'pending' && 'bg-gray-700'} ${request.status === 'accepted' && 'bg-green-700'} ${request.status === 'rejected' && 'bg-red-700'}`}
                  >
                    {request.status}
                  </span>
                </td>
                <td className="py-2">
                  <select
                    name='status'
                    defaultValue={request.status}
                    className="w-24 lg:w-full border p-2 rounded capitalize"
                    onChange={(e) => handleChangedStatus(request._id, e.target.value)}
                  >
                    {
                      currentStatus.map((element) => (
                        <option key={element} value={element}>{element}</option>
                      ))
                    }
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>


      <PureModal
        isOpen={modal}
        width='680px'
        // closeButton="close"
        // closeButtonPosition="bottom"
        onClose={() => {
          setModal(false);
          return true;
        }}
      >
        <div>
          <h1 className='text-lg font-bold text-center underline underline-offset-4'>CV</h1>
          <div className='my-2'>
            <p className='text-sm text-gray-500'>Application ID: {modalData.aid}</p>
            <p className='text-sm text-gray-500'>Applicant's Name: {modalData.aname}</p>
          </div>
          <embed
            src={modalData.cv} // Use the modalData as the source URL
            type="application/pdf"
            className='w-full h-[450px]'
          />
        </div>

      </PureModal>



    </div>
  );
}

export default JobRequest;
