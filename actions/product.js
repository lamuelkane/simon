export const setproduct = (payload) => ({
    type: 'SET_PRODUCT',
    payload
})

export const setproducts = (payload) => ({
    type: 'SET_PRODUCTS',
    payload
})

export const setcategories = (payload) => ({
    type: 'SET_CATEGORIES',
    payload
})

export const removeproduct = () => ({
    type: 'REMOVE_PRODUCT',
    payload: null
})

export const addcartitem = (item, cart) => {

    cart = [...cart, item]
    localStorage.setItem('cartitems', JSON.stringify(cart))
    return ({
        type: 'ADD_CART_ITEM',
        payload: cart,
    })
}

export const removecartitem = (item, cart) => {
    cart = cart.filter(i => i.id !== item.id)
    localStorage.setItem('cartitems', JSON.stringify(cart))
    return ({
        type: 'REMOVE_CART_ITEM',
        payload: cart,
    })
}

export const changeitemamount = (cart, id, value) => {
   const item = cart.find(i => i.id === id)
    item.amount = value
    localStorage.setItem('cartitems', JSON.stringify(cart))
    console.log(cart, item)
    return ({
        type: 'CHANGE_ITEM_AMOUNT',
        payload: cart,
    })
}

export const setcartitems = () => {
   const cart =  localStorage.getItem('cartitems')?JSON.parse(localStorage.getItem('cartitems')): []
    return ({
        type: 'SET_CART_ITEMS',
        payload: cart,
    })
}

export const resetcartitems = (clearstorage) => {
    if(clearstorage) localStorage.removeItem('cartitems')

     return ({
         type: 'SET_CART_ITEMS',
         payload: [],
     })
 }