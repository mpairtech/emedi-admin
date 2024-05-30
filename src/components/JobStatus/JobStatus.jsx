import React from 'react';

const JobStatus = ({ applicationData }) => {
    return (
        <div className='lg:col-span-2 px-5 md:px-5 max-h-screen shadow-lg border'>
            <div className='font-bold text-gray-700 mt-5'>
                Application Status
            </div>

            <div className="overflow-auto my-3 max-h-full">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>Application ID</th>
                            <th>Job Category</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>

                        {
                            applicationData.length > 0 &&
                            applicationData.map((element) => (
                                <tr key={element._id} className="text-gray-600">
                                    <td>{element._id}</td>
                                    <td className='capitalize'>{element.category.name}</td>
                                    <td className={`capitalize font-bold ${element.status === "accepted" && "text-green-600"} ${element.status === "rejected" && "text-red-600"} ${element.status === "pending" && "text-gray-600"}`}>{element.status}</td>
                                </tr>
                            ))
                        }

                    </tbody>
                </table>
            </div>

        </div>
    );
};

export default JobStatus;