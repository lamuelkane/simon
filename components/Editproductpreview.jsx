import React from 'react'
import Product from './Product';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import styles from '../styles/Dashboard.module.css'
import Link from 'next/Link';
import {GlobalContext} from '../context/Globalcontext'
import { useState, useEffect, useContext } from 'react';
import { setproducts} from "../actions/product";
import Pagination from '@material-ui/lab/Pagination';

const Editproductpreview = () => {
    const {products} = useContext(GlobalContext)
    const [pageNumber, setpageNumber] = useState(1)
    let pagesVited = pageNumber * 10

    useEffect(() => {
            dispatchproducts(setproducts(JSON.parse(localStorage.getItem('products'))))
    },[products, pagesVited])

    const handleChange = (event, value) => {
        setpageNumber(value)
      };

    return (
        <div>
            <div className="flex justify-between w-s-100 wrap">
            {
                products.slice(pagesVited, pagesVited + 10).map(prod => (
                <div className={`${styles.productwrapper}`} key={prod._id}>
                <Product product={prod} key={prod.name} />
                    <div className={`${styles.productactionwrapper}`}>
                        <div className={`margin-bottom red`}>
                            <DeleteIcon />
                        </div>
                        <div className={`margin-bottom link`}>
                        <Link color="inherit" href={`/editproduct/${prod._id}`}>       
                            <EditIcon />
                        </Link>
                        </div>
                    </div>
                </div>
                ))
            }
            </div>
            <Pagination count={Math.floor(products.length / 10)} page={pageNumber} onChange={handleChange} siblingCount={0} color="primary"/>
        </div>
    )
}

export default Editproductpreview
