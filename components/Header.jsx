import CallIcon from '@material-ui/icons/Call';
import EmailIcon from '@material-ui/icons/Email';
import SearchIcon from '@material-ui/icons/Search';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import styles from '../styles/Header.module.css'
import DehazeIcon from '@material-ui/icons/Dehaze';
import ClearIcon from '@material-ui/icons/Clear';
import  Link  from 'next/link';
import { useState, useEffect, useRef ,useContext} from 'react';
import { GlobalContext } from "../context/Globalcontext";
import Chatbox from './Chatbox';
import Totop from './Totop';
import ShoppingCartOutlinedIcon from '@material-ui/icons/ShoppingCartOutlined';
import Badge from '@material-ui/core/Badge';
import {setcartitems, setproducts, setcategories} from "../actions/product";
import ReactNotification from "react-notifications-component";
import axios from 'axios'

const Header = (props) => {
    const [showsidenav, setshowsidenav] = useState(false);
    const [showheader, setshowheader] = useState('')
    // const [categories, setcategories] = useState([])
    const header = useRef()
    let {cartitems, dispatchcartitems, dispatchcategories, dispatchproducts, sever, categories} = useContext(GlobalContext)
    const setproductcontext = async () => {
        const {data} = await axios.get(`${sever}/api/products/other`)
        const {data: cat} = await axios.get(`${sever}/api/products/categories`)
        dispatchproducts(setproducts(data))
        dispatchcategories(setcategories(cat))
    }

    useEffect(() => {
        window.onscroll = () => {
            if(window.pageYOffset < 500){
                setshowheader(styles.showheader)
            }
            else{

                setshowheader(styles.hideheader)
                // alert(showheader)
            }
        }
            dispatchcartitems(setcartitems())
            setproductcontext()
    }, []);

    return (
        <>
        <ReactNotification />
        <Chatbox />
        <Totop />
            <div className={`${styles.sideNav} ${!showsidenav && styles.hidesidenav}`}>
                <div className={`flex justify-between align-center`}>
                     <span>MENU</span>
                     <div onClick={e => setshowsidenav(false)} className={`iconholder`}>
                        <ClearIcon />
                     </div>
                 </div>
                 <hr/>
                <div>
                <div className={`flex column`}>
                                <div className={``}>
                                  <Link href='/shop'  >Shop</Link>
                                 {
                                     categories.map(cat => (
                                    <div className={`${styles.subsidenavitem}`} key={cat._id} >
                                        <Link href={`/shop?category=${cat.category}`}  >{cat.category}</Link>
                                    </div>
                                     ))
                                 }
                                <div className={`${styles.sidenavitem}`}>
                                    <Link href='/contactus' >ContactUs</Link>
                                </div>
                                <div className={`${styles.sidenavitem}`}>
                                    <Link href='/aboutus'>AboutUs</Link>
                                </div>
                                <div className={`${styles.sidenavitem}`}>
                                    <Link href='/checkout'>Checkout</Link>
                                </div>
                                <div className={`${styles.sidenavitem}`}>
                                    <Link href='/address'>shippingAddress</Link>
                                </div>
                        </div>
                </div>
                </div>
            </div>
            
            <div className={`${styles.headerwraper} padding ${showheader}`}>
                <div className={`${styles.header}`}>
                    <div className={`${styles.headertopwraper}`}>
                        <div className={`${styles.headertop} wrap`}>
                            <div className={`flex justify-between wrap`}>
                                <div  className={`flex justify-between padding-x align-center`}>
                                    <CallIcon />
                                    <a href="tel:+237671738952" className={`margin-x link`}>671738952</a>
                                </div>
                                <div className={`flex justify-between align-center padding-x`}>
                                    <EmailIcon />
                                    <a href="mailto:ashulemuel@gmail.com" className={`margin-x link`}>ashulemuel@gmail.com</a>
                                </div>
                            </div>
                            <div className={`hides`}>15% off! Coupon Code: ACKLSI  <span className='link'><Link href={{ pathname: '/shop'}}>Shop Now</Link></span></div>
                        </div>
                    </div>
                    <div className={`${styles.headerbottomwraper}`}>
                        <div className={`${styles.headerbottom}`}>
                            <div className={`flex justify-between`}>
                                {
                            
                             <div className={`hides flex justify-between`}>
                                    <div className={`margin-x`}>
                                        <div className={`link pointer iconholder hides`}>
                                            <Link href='#search' >
                                              <SearchIcon />
                                            </Link>
                                        </div>
                                    </div>
                                    <div className={`margin-x`}>
                                        <div className={`link pointer iconholder hides`}>
                                            <FavoriteBorderIcon />
                                        </div>
                                    </div>
                                </div>    
                                }
                           <div className={`hide shows`}>
                                <div className={`link pointer iconholder`} onClick={e => setshowsidenav(true)}>
                                    <DehazeIcon />
                                </div>
                           </div>
                            </div>
                            <div className={`flex align-center hides`}>
                                <div className={`margin-x`}>
                                    <Link href='/' >ContactUs</Link>
                                </div>
                                <div className={`margin-x`}>
                                    <Link href='/'>AboutUs</Link>
                                </div>
                                <div className={`margin-x`}>
                                    <Link href={{ pathname: '/login' }}>Login</Link>
                                </div>
                            </div>
                            <Link href={{ pathname: '/' }}>
                                    <img src="./assets/images/logo.jpg" alt="logo" className={`${styles.logo} round pointer`}/>
                            </Link>
                            <div className={`flex align-center hides`}>
                                <div className={`margin-x ${styles.shopcategories}`}>
                                <div  className={`${styles.shoplink}`}>
                                  <Link href={{ pathname: '/shop', query: {category: 'all-products'}}} as={`/shop?ctaegory='category'`} >Shop</Link>   
                                </div>
                                  {/* <div className={`${styles.shopcategoriesitems}`}> */}
                                <div className={`${styles.shopcategoriesitemswrapper}`}>
                                      
                                {
                                    categories.map(cat => (
                                    <div className={`${styles.subsidenavitem}`} key={cat.category}>
                                        <Link href={`/shop?category=${cat.category}`}  >{cat.category}</Link>
                                    </div>
                                    ))
                                }
                               
                                </div>
                                  {/* </div> */}
                                </div>
                                
                                <div className={`margin-x`}>
                                    <Link href={{ pathname: '/payment', query: { keyword: 'this way', category: 'category' } }}>Checkout</Link>
                                </div>
                                <div className={`margin-x`}>
                                    <Link href={{ pathname: '/shippingaddress'}}>shippingAddress</Link>
                                </div>
                            </div>
                            <div>
                                <div className={`link pointer iconholder`}>
                                    <div className={`relative`}>
                                        <div>
                                            <Link href={{ pathname: '/cart'}}>
                                                <Badge badgeContent={cartitems.reduce((a, c) => a + c.amount, 0)} color="secondary">
                                                    <ShoppingCartOutlinedIcon />
                                                </Badge>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                                
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        
        </>
    );
}



export default Header;

