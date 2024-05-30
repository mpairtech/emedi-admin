const userRegister = async (user) => {

    const response = await fetch(`https://rapid-home-solution-server.vercel.app/api/user/register`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    });

    const data = await response.json();
    return data;

}


const userLogin = async (user) => {

    const response = await fetch(`https://rapid-home-solution-server.vercel.app/api/user/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)

    })

    const data = await response.json();
    return data;

}



const getUser = async () => {
    const response = await fetch(`https://rapid-home-solution-server.vercel.app/api/user/get-user`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'authorization': `Bearer ${localStorage.getItem('token')}`
        },
        // body: JSON.stringify(user)

    })

    const data = await response.json();
    return data;

}

const getAllUsers = async () => {
    const response = await fetch(`https://rapid-home-solution-server.vercel.app/api/user/get-all-users`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'authorization': `Bearer ${localStorage.getItem('token')}`
        },
        // body: JSON.stringify(user)

    })

    const data = await response.json();
    return data;

}


const getAllEmployees = async () => {
    const response = await fetch(`https://rapid-home-solution-server.vercel.app/api/user/get-all-employees`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'authorization': `Bearer ${localStorage.getItem('token')}`
        },
        // body: JSON.stringify(user)

    })

    const data = await response.json();
    return data;

}





const updateUser = async (obj) => {

    const response = await fetch(`https://rapid-home-solution-server.vercel.app/api/user/update-user`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(obj)

    })

    const data = await response.json();
    return data;

}


const updateRole = async (obj) => {

    const response = await fetch(`https://rapid-home-solution-server.vercel.app/api/user/update-role`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(obj)

    })

    const data = await response.json();
    return data;

}


const trackingIp = async () => {
    const request = await fetch(`https://ipinfo.io/json?token=${import.meta.env.VITE_IP_TOKEN}`)
    const jsonResponse = await request.json()

    return jsonResponse;
}


const updateBookStatus = async (obj) => {

    const response = await fetch(`https://rapid-home-solution-server.vercel.app/api/user/update-book-status`, {
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



const updateEmployeeCategory = async (obj) => {

    const response = await fetch(`https://rapid-home-solution-server.vercel.app/api/user/update-employee-category`, {
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




export { userRegister, userLogin, getUser, getAllUsers, updateUser, trackingIp, updateRole, getAllEmployees, updateBookStatus, updateEmployeeCategory };
