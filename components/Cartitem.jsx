import ClearIcon from '@material-ui/icons/Clear';
import styles from '../styles/Product.module.css'
import { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../context/Globalcontext";
import  Link  from 'next/link';
import {removecartitem, changeitemamount, resetcartitems, setcartitems } from "../actions/product";

const Cartitem = (props) => {
    const { cartitems, dispatchcartitems} = useContext(GlobalContext)
    
    return (
        <>
            <div>
                 <div className={`flex justify-between align-center ${styles.cartitem} bluebg padding-x`}>
                    <img src={`${props.cartitem.image}`} className={`hides ${styles.cartitemimage}`} alt="" width='60px' hright='60px'/>
                    <div>{props.cartitem.name}</div>
                    <div className='blue'>${props.cartitem.price.toFixed(2)}</div>
                    <select name="" id="" value={props.cartitem.amount} onChange={e => {
                        dispatchcartitems(changeitemamount(cartitems, props.cartitem.id, parseInt(e.target.value)))
                        dispatchcartitems(resetcartitems())
                        dispatchcartitems(setcartitems())
                        }}>
                        {
                             [...Array(props.cartitem.countInStock).keys()].map(num => <option key={num} value={num + 1}>{num + 1} </option>)
                        }
                    </select>
                    <div  className='blue' >${(props.cartitem.price * props.cartitem.amount).toFixed(2)}</div>
                    <div className={`iconholder pointer`} onClick={e => {
                        
                        dispatchcartitems(removecartitem(props.cartitem, cartitems))
                      
                        }}>
                        <ClearIcon />     
                    </div>
                </div>
            </div>
        </>
    );
}

export default Cartitem;