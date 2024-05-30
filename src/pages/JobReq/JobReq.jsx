import React, { useEffect, useState } from 'react';
import { useContext } from 'react';
import { getApplicationsByUser } from '../../apiCalls/jobReq';
import ApplyJob from '../../components/ApplyJob/ApplyJob';
import JobStatus from '../../components/JobStatus/JobStatus';
import { AuthContext } from '../../components/providers/AuthProvider';


const JobReq = () => {

    const {user, loading} = useContext(AuthContext);
    const [applicationData, setApplicationData] = useState([]);


    const getApplications = async(id)=>{
        const data = await getApplicationsByUser(id)
        setApplicationData(data.applicationData)
    }

    useEffect(() => {
        if (!loading) {
            getApplications(user[0]?._id);
        }
    }, [user, loading]);

    return (
        <div className='grid grid-cols-1 lg:grid-cols-5 py-10 px-5 lg:px-8 gap-8 bg-green-50'>
            <ApplyJob getApplications={getApplications} />
            <JobStatus applicationData={applicationData} />
        </div>
    );
};

export default JobReq;