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
        try {
            const {data} = await axios.get(`${sever}/api/products/other`)
            const {data: cat} = await axios.get(`${sever}/api/products/categories`)
            dispatchproducts(setproducts(data))
            dispatchcategories(setcategories(cat))
        } catch (error) {
            alert(error)
        }
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

    const loadchat2 = () => {
        let s1 = document.createElement("script")
        s1.type = 'text/javascript'
        s1.src = './livechat.js'
        const s2 = document.getElementsByTagName('script')[0]
        s2.parentNode.insertBefore(s1,s2)
    }

    useEffect(() => {
        // <script type="text/javascript">
                // {/* var Tawk_API=Tawk_API||{}, Tawk_LoadStart=new Date() */}
                // let loadchat = () => {
                //     let s1=document.createElement("script"),
                //     s0=document.getElementsByTagName("script")[0];
                //     s1.async=true;
                //     s1.src='https://embed.tawk.to/61e737b3f7cf527e84d2d52e/1fpnj3633';
                //     s1.charset='UTF-8';
                //     s1.setAttribute('crossorigin','*');
                //     s0.parentNode.insertBefore(s1,s0);
                // }

                // loadchat()
                // {/* function(){
                // // 
                // }(); */}
        // </script>
        // <!-- Smartsupp Live Chat script -->
                // <script type="text/javascript">
                // var _smartsupp = _smartsupp || {};
                // _smartsupp.key = 'ada946c7b8255ab5d4409f99a9595655375f0e4e';
                // window.smartsupp||(function(d) {
                // var s,c,o=_smartsupp=function(){ o._.push(arguments)};o._=[];
                // s=d.getElementsByTagName('script')[0];c=d.createElement('script');
                // c.type='text/javascript';c.charset='utf-8';c.async=true;
                // c.src='https://www.smartsuppchat.com/loader.js?';s.parentNode.insertBefore(c,s);
                // })(document);
                // </script>
                loadchat2()
    }, [])

    return (
        <>
        <ReactNotification />
        {/* <Chatbox /> */}
        <Totop />
            <div className={`${styles.sideNav} main-bg white ${!showsidenav && styles.hidesidenav}`}>
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
                                    <Link href='/payment'>Checkout</Link>
                                </div>
                                <div className={`${styles.sidenavitem}`}>
                                    <Link href='/shippingaddress'>shippingAddress</Link>
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
                                <div  className={`flex justify-between white padding-x align-center`}>
                                    <CallIcon />
                                    <a href="tel:+17759648771" className={`margin-x white link`}>+1-(775)-964-8771</a>
                                </div>
                                <div className={`flex white justify-between align-center padding-x`}>
                                    <EmailIcon />
                                    <a href="mailto:info@releifweed420.com" className={`margin-x white link`}>info@releifweed420.com</a>
                                </div>
                            </div>
                            <div className={`hides`}><span className='white'><Link href={{ pathname: '/shop'}}>Shop Now</Link></span></div>
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
                                    <Link href='/contactus' >ContactUs</Link>
                                </div>
                                <div className={`margin-x`}>
                                    <Link href='/aboutus'>AboutUs</Link>
                                </div>
                                <div className={`margin-x`}>
                                    <Link href={{ pathname: '/login' }}>Login</Link>
                                </div>
                            </div>
                            <Link href={{ pathname: '/' }}>
                                    <img src="./assets/images/logo.png" alt="logo" className={`${styles.logo} pointer`}/>
                            </Link>
                            <div className={`flex align-center hides`}>
                                <div className={`margin-x ${styles.shopcategories}`}>
                                <div  className={`${styles.shoplink}`}>
                                  <Link href={{ pathname: '/shop'}} >Shop</Link>   
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

