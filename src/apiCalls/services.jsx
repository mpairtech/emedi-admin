const getAllServices = async (search="", filter="", page="", limit="") => {

    const response = await fetch(`https://rapid-home-solution-server.vercel.app/api/services/get-all-services?search=${search}&filter=${filter}&page=${page}&limit=${limit}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'authorization': `Bearer ${localStorage.getItem("token")}`
        },
        // body: JSON.stringify(obj)

    })

    const data = await response.json();
    return data;

}




const getServiceById = async (id, serviceType) => {

    const response = await fetch(`https://rapid-home-solution-server.vercel.app/api/services/get-service-by-id?id=${id}&serviceType=${serviceType}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'authorization': `Bearer ${localStorage.getItem("token")}`
        },
        // body: JSON.stringify(obj)

    })

    const data = await response.json();
    return data;

}



const addService = async (formData) => {

    const response = await fetch(`https://rapid-home-solution-server.vercel.app/api/services/add-service`, {
        method: 'POST',
        headers: {
            // 'Content-Type': 'application/json',
            'authorization': `Bearer ${localStorage.getItem("token")}`
        },
        body: formData

    })

    const data = await response.json();
    return data;

}


const updateService = async (obj) => {

    const response = await fetch(`https://rapid-home-solution-server.vercel.app/api/services/update-service`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'authorization': `Bearer ${localStorage.getItem("token")}`
        },
        body: JSON.stringify(obj)

    })

    const data = await response.json();
    return data;

}


const deleteService = async (id) => {

    const response = await fetch(`https://rapid-home-solution-server.vercel.app/api/services/delete-service/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'authorization': `Bearer ${localStorage.getItem("token")}`
        },

    })

    const data = await response.json();
    return data;

}


const getServiceRating = async (serviceId) => {

    const response = await fetch(`https://rapid-home-solution-server.vercel.app/api/services/get-service-rating/${serviceId}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'authorization': `Bearer ${localStorage.getItem("token")}`
        },

    })

    const data = await response.json();
    return data;

}






export {getAllServices, getServiceById, addService, updateService, deleteService, getServiceRating };