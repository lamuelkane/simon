import styles from '../styles/Product.module.css'
import Productpreview from './Productpreview';
import DehazeIcon from '@material-ui/icons/Dehaze';
import { useState, useEffect, useContext } from 'react';
import { GlobalContext } from "../context/Globalcontext";
import {setproducts} from "../actions/product";
import Pagination from '@material-ui/lab/Pagination';
import {search} from './Search'
import LoadingBox from './LoadingBox'

const Productdisplay = () => {
    const {products, categories, dispatchproducts} = useContext(GlobalContext)
    const [show, setshow] = useState(false)
    const [sortbyprice, setsortbyprice] = useState(false)
    const [low, setlow] = useState(true)
    const [sortbyrating, setsortbyrating] = useState(false)
    const [sortbyrecentlyordered, setsortbyrecentlyordered] = useState(false)
    const [sortbymostreviewed, setsortbymostreviewed] = useState(false)
    const [sortbymostordered, setsortbymostordered] = useState(false)
    const [sortbyrecentlyreviewed, setsortbyrecentlyreviewed] = useState(false)
    const [sortbymostviewed, setsortbymostviewed] = useState(true)
    const [sortbyname, setsortbyname] = useState(false)
    const [clone, setclone] = useState([])
    const [pageNumber, setpageNumber] = useState(1)
    const [productperpage, setproductperpage] = useState(10)
    let pagesVited = pageNumber * productperpage
    
    const [productList, setproductList] = useState([])
    let setproducts = () => {
      setproductList(products.sort((a, b) => {
        if (sortbyprice) {
          if(low) return a.price - b.price;
          if(!low) return b.price - a.price;
        }
        if (sortbyrating) {
          if(low) return a.rating - b.rating;
          if(!low) return b.rating - a.rating;
        }
        if (sortbymostordered) {
          return b.numOrders - a.numOrders;
        }
        if (sortbyrecentlyordered) {
          let older = new Date(a.lastlyOrdered).getTime()
          let newer = new Date(b.lastlyOrdered).getTime()
          return older > newer? -1 : 1
        }
        if (sortbymostreviewed) {
          return b.numReviews - a.numReviews;
        }
        if (sortbymostviewed) {
          return b.numviews - a.numviews
        }
        if (sortbyrecentlyreviewed) {
          let older = new Date(a.lastlyreviewed).getTime()
          let newer = new Date(b.lastlyreviewed).getTime()
          return older > newer? -1 : 1
        }
         if(sortbyname) {
          let fa = a.name.toLowerCase(),
          fb = b.name.toLowerCase();
          if (fa < fb) {
              return -1;
          }
          if (fa > fb) {
              return 1;
          }
         }
        return 0;
      }).slice(pagesVited, pagesVited + 10))
    }
      useEffect(() => {
        setproducts()
        console.log(productList)
      },[products, pagesVited])


    let sortproducts = (e) => {
        if (e.target.value === "High Price") {
          setsortbyprice(true)
          setlow(false)
          setsortbyrating(false)
          setsortbymostviewed(false)
          setsortbyrecentlyordered(false)
          setsortbyrecentlyreviewed(false)
          setsortbymostordered(false)
          setsortbymostreviewed(false)
          setproducts()
          return
        }
    
        if (e.target.value === "Low Price") {
          setsortbyprice(true)
          setlow(true)
          setsortbyrating(false)
          setsortbymostviewed(false)
          setsortbyrecentlyordered(false)
          setsortbyrecentlyreviewed(false)
          setsortbymostordered(false)
          setsortbymostreviewed(false)
          setproducts()
          return
        }
        if (e.target.value === "Default Sorting") {
          setsortbyprice(false)
          setsortbyrating(false)
          setsortbymostviewed(false)
          setsortbyrecentlyordered(false)
          setsortbyrecentlyreviewed(false)
          setsortbymostordered(false)
          setsortbymostreviewed(false)
          setproducts()
          return
        }
        if (e.target.value === "High Rating") {
          setsortbyrating(true)
          setlow(false)
          setsortbyprice(false)
          setsortbymostviewed(false)
          setsortbyrecentlyordered(false)
          setsortbyrecentlyreviewed(false)
          setsortbymostordered(false)
          setsortbymostreviewed(false)
          setproducts()
            return
        }
        if (e.target.value === "Low Rating") {
          setsortbyrating(true)
          setlow(true)
          setsortbyprice(false)
          setsortbymostviewed(false)
          setsortbyrecentlyordered(false)
          setsortbyrecentlyreviewed(false)
          setsortbymostordered(false)
          setsortbymostreviewed(false)
          setproducts()
          return
        }
        if (e.target.value === "recentlyordered") {
          setsortbyrating(false)
          setsortbyprice(false)
          setsortbymostviewed(false)
          setsortbyrecentlyordered(true)
          setsortbyrecentlyreviewed(false)
          setsortbymostordered(false)
          setsortbymostreviewed(false)
          setproducts()
          return
        }
        if (e.target.value === "mostreviewed") {
          setsortbyrating(false)
          setsortbyprice(false)
          setsortbymostviewed(false)
          setsortbyrecentlyordered(false)
          setsortbyrecentlyreviewed(false)
          setsortbymostordered(false)
          setsortbymostreviewed(true)
          setproducts()
          return
        }
        if (e.target.value === "mostordered") {
          setsortbyrating(false)
          setsortbyprice(false)
          setsortbymostviewed(false)
          setsortbyrecentlyordered(false)
          setsortbyrecentlyreviewed(false)
          setsortbymostordered(true)
          setsortbymostreviewed(false)
          setproducts()
          return
        }
        if (e.target.value === "recentlyreviewed") {
          setsortbyrating(false)
          setsortbyprice(false)
          setsortbymostviewed(false)
          setsortbyrecentlyordered(false)
          setsortbyrecentlyreviewed(true)
          setsortbymostordered(false)
          setsortbymostreviewed(false)
          setproducts()
          return
        }
        if (e.target.value === "mostviewed") {
          setsortbyrating(false)
          setsortbyprice(false)
          setsortbymostviewed(true)
          setsortbyrecentlyordered(false)
          setsortbyrecentlyreviewed(false)
          setsortbymostordered(false)
          setsortbymostreviewed(false)
          setproducts()
          return
        }
        
      }

      const handleChange = (event, value) => {
        setpageNumber(value)
      };

    return (
        <>
            <section className={`padding bluebg`}>
                <div className={`flex justify-between ${styles.productdisplay}`}>
                <div className={`${styles.productsidenavwrapper}`}>
                    <div className={`${styles.productsidebar} margin-right ${show && styles.show}`}>
                        <div className={`${styles.productsidebaritem}`}>
                            <div className={`${styles.description}`}>
                                SEARCH PRODUCTS
                            </div>
                            <div>
                                <input type="text" className={`${styles.prodsidebaritemselect}`} onChange={e => {
                                  clearTimeout(query)
                                  let query = setTimeout(() => {
                                    dispatchproducts(setproducts(search(products, e.target.value)))
                                    console.clear()
                                    console.log(e.target.value, products, search(products, e.target.value))
                                  }, 3000);
                                }} />
                            </div>
                        </div>
                        <div className={`${styles.productsidebaritem}`}>
                            <div className={`${styles.description}`}>
                                  SORT PRODUCTS BY
                            </div>
                            <div>
                                <select name="select"  className={`${styles.prodsidebaritemselect}`} onChange={sortproducts}>
                                  <option selected="selected">Default Sorting</option>
                                  <option>Low Rating</option>
                                  <option>High Rating</option>
                                  <option>High Price</option>
                                  <option>Low Price</option>
                                  <option>recentlyordered</option>
                                  <option>mostreviewed</option>
                                  <option>mostordered</option>
                                  <option>recentlyreviewed</option>
                                  <option>mostviewed</option>
                                </select>
                            </div>  
                        </div>
                        <div className={`${styles.productsidebaritem}`}>
                            <div className={`${styles.description}`}>
                                SELECT CATEGORY
                            </div>
                            <div>
                                <select name="select"  className={`${styles.prodsidebaritemselect}`}>
                                    {
                                      categories.map(cat => (
                                        <option value={cat.category} key={cat._id}>{cat.category}</option>
                                      ))                                      
                                    }
                                </select>
                            </div>
                        </div>
                        <div className={`${styles.productsidebaritem}`}>
                            <div className={`${styles.description}`}>
                                section description
                            </div>
                            <div>
                                <select name="select"  className={`${styles.prodsidebaritemselect}`}>
                                    <option value="">option 1</option>
                                    <option value="">option 1</option>
                                    <option value="">option 1</option>
                                    <option value="">option 1</option>
                                    <option value="">option 1</option>
                                </select>
                            </div>
                        </div>
                        <Pagination count={Math.floor(products.length / 10)} page={pageNumber} onChange={handleChange} siblingCount={0} color="primary"/>
                        <div className={`${styles.showproductsidenav}`} onClick={e => setshow(!show)}> <DehazeIcon /> </div>
                    </div>
                </div> 
                    <div className={`${styles.productdisplay}`}>
                        {
                          products[0]?
                          <Productpreview products={productList} />
                          : <LoadingBox />
                        }
                    </div>
                </div>
            </section>
        </>
    );
}

export default Productdisplay;