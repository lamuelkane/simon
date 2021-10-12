
import React, {createContext, useReducer, useRef, useEffect} from 'react'
import { Product, Products, cartactions, Categories } from "../reducers/product";

export const GlobalContext = createContext({})

export const GlobalProvider = ({children}) => {
    let cart = useRef([])
    useEffect(() => {
        cart.current = localStorage.getItem('cartitems')?JSON.parse(localStorage.getItem('cartitems')): []
    }, [])
    const [product, dispatchproduct] = useReducer(Product, null)
    const [cartitems, dispatchcartitems] = useReducer(cartactions, cart.current)
const [products, dispatchproducts] = useReducer(Products, [])
    const [categories, dispatchcategories] = useReducer(Categories, [])
    return (
        <GlobalContext.Provider value={{
            product,
            dispatchproduct,
            cartitems,
            dispatchcartitems,
            products,
            dispatchproducts,
            categories,
            dispatchcategories,
            sever:'https://releifweed420sever.herokuapp.com',
            // sever:'http://localhost:5000'
        }}>
            {children}
        </GlobalContext.Provider>
    )

}

