const getAllEmployees = async () => {

    const response =await  fetch(`https://rapid-home-solution-server.vercel.app/api/employees/get-all-employees`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'authorization': `Bearer ${localStorage.getItem("token")}`
        },
        // body: JSON.stringify(obj)

    })

    const data =await  response.json();
    return data;

}


const getEmployeeById = async (id) => {
    
        const response =await  fetch(`https://rapid-home-solution-server.vercel.app/api/employees/get-employee-by-id/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'authorization': `Bearer ${localStorage.getItem("token")}`
            },
            // body: JSON.stringify(obj)
    
        })
    
        const data =await  response.json();
        return data;
    
    }


const addEmployee = async (obj) => {

    const response =await  fetch(`https://rapid-home-solution-server.vercel.app/api/employees/add-employee`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'authorization': `Bearer ${localStorage.getItem("token")}`
        },
        body: JSON.stringify(obj)

    })

    const data =await  response.json();
    return data;

}


const updateEmployee = async (obj) => {

    const response =await  fetch(`https://rapid-home-solution-server.vercel.app/api/employees/update-employee`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'authorization': `Bearer ${localStorage.getItem("token")}`
        },
        body: JSON.stringify(obj)

    })

    const data =await  response.json();
    return data;

}


const deleteEmployee = async (id) => {

    const response =await  fetch(`https://rapid-home-solution-server.vercel.app/api/employees/delete-employee/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'authorization': `Bearer ${localStorage.getItem("token")}`
        },
        // body: JSON.stringify(obj)

    })

    const data =await  response.json();
    return data;

}



const addWork = async (obj) => {

    const response =await  fetch(`https://rapid-home-solution-server.vercel.app/api/work/add-work`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'authorization': `Bearer ${localStorage.getItem("token")}`
        },
        body: JSON.stringify(obj)

    })

    const data =await  response.json();
    return data;

}


const getWork = async (employeeId) => {

    const response =await  fetch(`https://rapid-home-solution-server.vercel.app/api/work/get-work/${employeeId}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'authorization': `Bearer ${localStorage.getItem("token")}`
        },
        // body: JSON.stringify(obj)

    })

    const data =await  response.json();
    return data;

}




const getWorkHistory = async (employeeId) => {

    const response =await  fetch(`https://rapid-home-solution-server.vercel.app/api/work/get-work-history/${employeeId}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'authorization': `Bearer ${localStorage.getItem("token")}`
        },
        // body: JSON.stringify(obj)

    })

    const data =await  response.json();
    return data;

}




const updateWork = async (obj) => {

    const response =await  fetch(`https://rapid-home-solution-server.vercel.app/api/work/update-work`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'authorization': `Bearer ${localStorage.getItem("token")}`
        },
        body: JSON.stringify(obj)

    })

    const data =await  response.json();
    return data;

}



export {getAllEmployees, getEmployeeById, addEmployee, updateEmployee, deleteEmployee, addWork, getWork, updateWork, getWorkHistory};