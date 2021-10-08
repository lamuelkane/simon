
import { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../context/Globalcontext";
import {setproduct } from "../actions/product";
import {troncate} from './troncate'

const Footerproduct = (props) => {
    const {dispatchproduct} = useContext(GlobalContext)

    return (
        <>
            <div className={`flex margin-top`}>
                <img src={props.product.image} height='65px' width='65px' alt="" className={`margin-right pointer`} onClick={e => {
                    dispatchproduct(setproduct(props.product))
            }}/>
                <div className={`flex column`}>
                    <span>{troncate(props.product.name, 20)}</span>
                    <span>${props.product.price.toFixed(2)}</span>
                    <span>{props.text}</span>
                </div>
            </div>
        </>
    );
}

export default Footerproduct;