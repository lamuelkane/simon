
import Head from 'next/head'
import Header from '../components/Header'
import Jumbotron from '../components/Jumbotron'
import styles from '../styles/Home.module.css'
import  Link  from 'next/link';
import {useContext, useState, useEffect} from 'react'
import Footer from '../components/Footer';
import Swipers from '../components/Swipers';
import Categorypreview from '../components/Categorypreview';
import Productpreview from '../components/Productpreview';
import LoadingBox from '../components/LoadingBox'
import { GlobalContext } from "../context/Globalcontext";

export default function Home() {
  const [products, setproducts] = useState([])
  let {products: createdproducts, categories} = useContext(GlobalContext)

  useEffect(() => {
    setproducts(createdproducts)
  }, [createdproducts])

  return (
    <>
      <Head>
        <title>HOME - RELEIFWEED420</title>
        <meta name="description" content="Generated by create next app" />
        
        <link rel="icon" href="./assets/images/logo.png" />
        {/* <script src="//code.tidio.co/ftuqj1khsqhmuxgwhvmultjlstv4bcw8.js" async></script> */}
        {/* <script type="text/javascript" id="hs-script-loader" async defer src="//js-eu1.hs-scripts.com/25151583.js"></script> */}
      </Head>
      <Header />
      <Jumbotron />
      <section className={`w-70 w-s-100 margin-auto padding`}>
        <h2 className=' xx-large text-center'>Available Product Categories</h2>
        {
          products[0]?
          <Categorypreview products={products} categories={categories} />   
          : <LoadingBox />
        }
      </section>

      <div className={`flex justify-center align-center column padding ${styles.goldenofffer}`}>
        <h3>Golden Offer</h3>
        <h1 className={`${styles.offerh1}`}>GET UP TO 7 DAYS MONEY BACK GUARANTEE</h1>
        <button className={`${styles.offerbtn}`}>
            <Link href='/shop' >Shop Now</Link>
        </button>
      </div>

      <section className={`flex justify-around wrap padding  ${styles.productpreview}`}>
        <div className={`w-80 w-s-100`}>
           <h2 className=' xx-large text-center'>Preview Products</h2>
            {
              products[0]?
              <Productpreview products={products.sort((a, b) => {
                                let older = new Date(a.lastlyOrdered).getTime()
                                let newer = new Date(b.lastlyOrdered).getTime()
                                return older > newer? -1 : 1
                            }).slice(0, 10)} />   
                            : <LoadingBox />
            }
        </div>
      </section>

      <div className={`flex justify-center align-center column padding ${styles.goldenofffer}`}>
        <h3>How To Order</h3>
        <p className={` center`}>If you???ve been wondering how to order weed online,
         then you???ve come to the right place. Take a look at our selection of weed for sale
          & cannabis-related products, then simply click on the image of what you???d like to purchase. 
          We???ll guide you through the check-out process with various prompts once you???ve selected an item.
           You buy everything else online, why not weed, too? With ReleifWeed420,
         it???s ???never been easier to have your weed delivered straight to your door</p>
        <button className={`${styles.offerbtn}`}>
            <Link href='/shop' >Shop Now</Link>
        </button>
      </div>

      <div className={`bluebg`}>
          {
            categories.slice(0, 5).map( cat => (
              <section className={`padding`} key={cat._id}>
              <h2 className=' xx-large'> {cat.category} Collection</h2>
             { 
              products[0]?
             <div className="flex justify-around wrap">
                <div className={`w-60 w-s-100`}>
                  <Swipers products={products.filter(prod => prod.category.toLowerCase() === cat.category.toLowerCase())} />
                </div>
                  <div className={`flex justify-center `}>
                      <img src={products.sort((a, b) => {
                                let older = new Date(a.lastlyOrdered).getTime()
                                let newer = new Date(b.lastlyOrdered).getTime()
                                return older > newer? -1 : 1
                            }).find(pro => pro.category.toLowerCase() === cat.category.toLowerCase())?.image} alt="" className={`round`} width='200px' height='200px'/>
                  </div>   
              </div>
               : <LoadingBox />
              }
            </section>
            ))
          }
      </div>
      
      <Footer />
    </>  
  )
}
