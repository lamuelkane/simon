import Footerproduct from "./Footerproduct";
import { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../context/Globalcontext";
import {setcartitems} from "../actions/product";
import ProductDetails from "./ProductDetails";
import axios from 'axios';


const Footer = (props) => {   
  const [category, setcategory] = useState()
  const {products} = useContext(GlobalContext)

    return (
        <>
                <ProductDetails />
            <footer className={``}>
                <div className={`flex justify-evenly wrap columnl margin-top`}>
                    <div className={`flex-3 margin-right`}>
                        <h3 className={`footertitle`}>section title</h3>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
                        <input type="text" id='search' className={``} placeholder='search products'/>
                    </div>
                    <div className={`flex-3 margin-right`}>
                    <h3 className={`footertitle`}>Most Rated Products</h3>
                        {
                            products.slice(0, 4).map(prod => (
                                <Footerproduct product={prod} key={prod.name} />
                            ))
                        }
                    </div>
                    <div className={`flex-3 margin-right`}>
                    <h3 className={`footertitle`}>Recntly Ordered Products</h3>
                        {
                            products.slice(0, 4).map(prod => (
                                <Footerproduct product={prod} key={prod.name} />
                            ))
                        }
                    </div>
                    <div className={`flex-3 margin-right`}>
                    <h3 className={`footertitle`}>Most Ordered Products</h3>
                        {
                            products.slice(0, 4).map(prod => (
                                <Footerproduct product={prod} key={prod.name} />
                            ))
                        }
                    </div>
                </div>
            </footer>
        </>
    );
}


export default Footer;
