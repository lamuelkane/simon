
import styles from '../styles/Product.module.css'
import Button from '@material-ui/core/Button';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart'
import { ProductDescription } from './ProductDescription';
import Rating from 'material-ui-rating';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { useContext, useEffect, useState, useRef } from "react";
import { GlobalContext } from "../context/Globalcontext";
import  Link  from 'next/link';
import {removeproduct, addcartitem } from "../actions/product";
import ShoppingCartOutlinedIcon from '@material-ui/icons/ShoppingCartOutlined';
import {Notification} from './Notification'



const ProductDetails = () => {
    const [amount, setamt] = useState(1)
    const [option, setoption] = useState(null)
    const {product, dispatchproduct, cartitems, dispatchcartitems, sever} = useContext(GlobalContext)
    const [price, setprice] = useState()
    const error = useRef()
    const success = useRef()
    
   

    useEffect(() => {
        setprice(product?.price)
        setoption('')
    }, [product])

    return (
        <>
        <audio src="./notification/success.mp3" ref={success} ></audio>
        <audio src="./notification/error.mp3" ref={error} ></audio>
        <div className={`${styles.productdetials} ${product && 'comeup'}`}>
            <div className={`${styles.productdetailswrapper} padding`}>
                <div className={`${styles.closeproductdetails} pointer`} onClick={e => {
                    dispatchproduct(removeproduct())
                    }}><ExpandMoreIcon /></div>
                <div className={`margin-auto w-90 flex justify-between ${styles.productdetials2}`}>
                    <div>
                        <img src={product?.image} alt="" className={`${styles.productdetailsimg} margin-right margin-y hidexs `}/>
                    </div> 
                    <div>
                        <div className={`flex justify-between wrap`}>
                            <div className='margin-x'> 
                                <h1>{product?.name}</h1>
                                {
                               product?.options[0]?
                                    <div >{`$${product?.options.sort((a, b) => {
                                        return a.price - b.price;
                                    })[0].price.toFixed(2)} - $${product?.options.sort((a, b) => {
                                    return a.price - b.price;
                                })[product?.options.length - 1].price.toFixed(2)}`}</div>
                                    :
                               <div >${product?.price.toFixed(2)}</div>
                                 }
                                 <div>
                                     <span>${price}</span>
                                     <span className={`margin-x`}>X</span>
                                     <span>{amount}</span>
                                     <span>   = {'   '}{price * amount}</span>
                                 </div>
                                <div>
                                    <Rating
                                        value={product?.rating}
                                        max={5}
                                        readOnly
                                    />
                                </div>
                            </div>
                            <div>
                                <div>
                                   {product?.options[0] && <div className={` ${styles.productoptions}`}>
                                        {
                                            product.options.map(opt => (
                                                <div className='flex nowrap justify-between padding' key={opt.name}>
                                                    <span>{opt.name}</span>
                                                    <span>${opt.price}</span>
                                                </div>
                                            ))
                                        }
                                    </div>}
                                    <div>
                                    <div className={`flex justify-between align-center`}>                                
                                          { product?.options[0] && <select
                                            value={option}
                                            onChange={e => {
                                                setprice(product.options.find(opt => opt.name === e.target.value).price)
                                                setoption(e.target.value)
                                            }}
                                            className={`${styles.productamt}`}
                                            >
                                                {
                                                    product?.options.map(opt => (
                                                            <option value={opt.name} data-id={opt.price} key={opt.name} >{opt.name}</option>
                                                    ))
                                                }
                                            </select>}
                                            <select
                                            value={amount}
                                            onChange={e => setamt(parseInt(e.target.value))}
                                            className={`${styles.productamt}`}
                                            >
                                               {
                                                   [...Array(product?.countInStock).keys()].map(num => <option key={num} value={num + 1}>{num + 1} </option>)
                                               }
                                            </select>
                                    </div>
                                </div>
                                <div className={`margin-y`}>
                                    <div onClick={e => {
                                    let item =  cartitems.find(item => item.id === product._id)
                                    if (item) {
                                    Notification({
                                        title:"Cart Item Exist",
                                        message:`The Item you are trying to add already Exist visit cart page to edit the quantity`,
                                        type:"info",
                                        container:"top-right",
                                        insert:"top",
                                        animationIn:"fadeInUp",
                                        animationOut:"fadeOut",
                                        duration:5000
                                      })
                                    error.current.play()
                                        return
                                    }
                                    let image = product.image.includes(sever)? product.image : 'https://releifweed420.herokuapp.com' + product.image.replace('./', '/')
                                    // console.log(image)      
                                        dispatchcartitems(addcartitem({
                                        price,
                                        amount,
                                        countInStock: product.countInStock,
                                        name: product.name,
                                        id:product._id,
                                        option,
                                        image
                                    }, cartitems))

                                    Notification({
                                        title:"Cart Item Added",
                                        message:`Sucessfuly Added "${product.name}" in cart for $${price * amount}`,
                                        type:"success",
                                        container:"top-right",
                                        insert:"top",
                                        animationIn:"fadeInUp",
                                        animationOut:"fadeOut",
                                        duration:5000
                                      })
                                    success.current.play()
                                    }}>
                                        <Button variant="contained" color="primary" startIcon={<AddShoppingCartIcon />}>
                                            ADD TO CART
                                        </Button>
                                    </div>
                                    <div className="">
                                    <Link href='/cart'>
                                        <Button variant="contained" color="secondary" startIcon={<ShoppingCartOutlinedIcon />}>
                                            CART
                                        </Button>
                                    </Link>
                                    </div>
                                </div>
                                </div>
                            </div>
                        </div>
                        <div className={`${styles.ProductDescription}`}>
                            <ProductDescription product={product} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </>
    );
}

export default ProductDetails;