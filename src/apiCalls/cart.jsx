

const addToCart = async (obj) => {
    const response = await fetch(`https://rapid-home-solution-server.vercel.app/api/services/add-to-cart`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'authorization': `Bearer ${localStorage.getItem("token")}`
        },
        body: JSON.stringify(obj)

    })

    const data = await response.json();
    return data;
}


const getCart = async (userId) => {
    const response = await fetch(`https://rapid-home-solution-server.vercel.app/api/services/get-cart/${userId}`, {
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



const getCartByCartId = async (cartId) => {
    const response = await fetch(`https://rapid-home-solution-server.vercel.app/api/services/get-cart-by-cart-id/${cartId}`, {
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


const removeCart = async (cartId) => {
    const response = await fetch(`https://rapid-home-solution-server.vercel.app/api/services/remove-cart/${cartId}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'authorization': `Bearer ${localStorage.getItem("token")}`
        },
        // body: JSON.stringify(obj)

    })

    const data = await response.json();
    return data;
}


export { addToCart, getCart, getCartByCartId, removeCart };