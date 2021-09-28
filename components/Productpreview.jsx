import { useEffect } from 'react';
import styles from '../styles/Product.module.css'
import Product from './Product';
// import {products} from '../Api/product'

const Productpreview = ({products}) => {

    return (
        <>
            <div className="flex justify-between w-s-100 wrap">
                {
                   products[0] && products?.map(prod => (
                        <Product product={prod} key={prod.name} />
                    ))
                }
            </div>
        </>
    );
}

export default Productpreview;