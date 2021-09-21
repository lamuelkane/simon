import { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../context/Globalcontext";
import {setproduct } from "../actions/product";

const Footerproduct = (props) => {
    const {dispatchproduct} = useContext(GlobalContext)

    return (
        <>
            <div className={`flex margin-top`}>
                <img src={props.product.image} height='65px' width='65px' alt="" className={`margin-right pointer`} onClick={e => {
                    dispatchproduct(setproduct(props.product))
            }}/>
                <div className={`flex column`}>
                    <span>{props.product.name}</span>
                    <span>${props.product.price.toFixed(2)}</span>
                    <span>whatever</span>
                </div>
            </div>
        </>
    );
}

export default Footerproduct;