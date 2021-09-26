import styles from '../styles/Product.module.css'
import Rating from './Rating'
import { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../context/Globalcontext";
import {setproduct } from "../actions/product";
import axios from 'axios'


const Product = (props) => {
    const {product, dispatchproduct, sever} = useContext(GlobalContext)


    return (
        <>
            <div className={`${styles.product}`}>
        <div>
        </div>
                <img src={props.product?.image} alt=""  className={`${styles.productimg} pointer`} onClick={async(e )=> {
                    props.product.numviews ++
                    const {data} = await axios.post(`${sever}/api/products/updateproduct`, props.product)
                    console.log(data)
                    dispatchproduct(setproduct(props.product))
            }}/>
            <div className={`flex justify-center column`}>
                        <span className={`${styles.productname}`}>{props.product?.name}</span>
                        <div className={`${styles.productprice} blue`}>
                        {
                               props.product?.options[0]?
                               <div >{`$${props.product?.options.sort((a, b) => {
                                return a.price - b.price;
                            })[0].price.toFixed(2)} - $${props.product?.options.sort((a, b) => {
                              return a.price - b.price;
                          })[props.product?.options.length - 1].price.toFixed(2)}`}</div>
                              :
                               <div >${props.product?.price.toFixed(2)}</div>
                             }
                        </div>
                        <span className={`${styles.productrating} flex justify-center`}>
                        <Rating
                            value={props.product.rating}
                            text={props.product.numReviews}
                        />
                        </span>
                </div>
            </div>
        </>
    );
}

export default Product;