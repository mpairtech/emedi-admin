const getOrders = async(userId)=>{
    const response = await fetch(`https://rapid-home-solution-server.vercel.app/api/orders/get-orders/${userId}`, {
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



const updateRating = async (obj) => {
    const response = await fetch(`https://rapid-home-solution-server.vercel.app/api/orders/update-rating`, {
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



const getAllOrders = async()=>{
    const response = await fetch(`https://rapid-home-solution-server.vercel.app/api/orders/get-all-orders`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'authorization': `Bearer ${localStorage.getItem("token")}`
        },
 

    })

    const data = await response.json();
    return data;
}




const getRecentOrders = async()=>{
    const response = await fetch(`https://rapid-home-solution-server.vercel.app/api/orders/get-recent-orders`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'authorization': `Bearer ${localStorage.getItem("token")}`
        },
 

    })

    const data = await response.json();
    return data;
}





const updateOrderStatus = async (obj) => {
    const response = await fetch(`https://rapid-home-solution-server.vercel.app/api/orders/update-order-status`, {
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



export  {getOrders, updateRating, getAllOrders, updateOrderStatus, getRecentOrders};