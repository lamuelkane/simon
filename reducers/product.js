export const Product = (state, action) => {
    switch (action.type) {
        case 'SET_PRODUCT':
            return ( action.payload)
        case 'REMOVE_PRODUCT':
            return (action.payload)
        default:
            return state
    }
}  


export const Categories = (state, action) => {
    switch (action.type) {
        case 'SET_CATEGORIES':
            return ( action.payload)
        default:
            return state
    }
}  

export const Products = (state, action) => {
    switch (action.type) {
        case 'SET_PRODUCTS':
            return ( action.payload)
        default:
            return state
    }
}  

export const cartactions = (state, action) => {
    switch (action.type) {
        case 'ADD_CART_ITEM':
            return ( action.payload)
        case 'REMOVE_CART_ITEM':
            return (action.payload)
        case 'CHANGE_ITEM_AMOUNT':
            return (action.payload)
        case 'SET_CART_ITEMS':
            return (action.payload)
        case 'RESET_CART_ITEMS':
            return (action.payload)
        default:
            return state
    }
}  