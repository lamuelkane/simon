import styles from '../styles/Product.module.css'
import Productpreview from './Productpreview';
import DehazeIcon from '@material-ui/icons/Dehaze';
import { useState, useEffect, useContext } from 'react';
import { GlobalContext } from "../context/Globalcontext";
import {setproducts} from "../actions/product";
import Pagination from '@material-ui/lab/Pagination';
import {search} from './Search'
import LoadingBox from './LoadingBox'
import Footerproduct from './Footerproduct';

const Productdisplay = () => {
    const [products, setproducts] = useState([])
    const {products : createdproducts, categories, dispatchproducts} = useContext(GlobalContext)
    const [show, setshow] = useState(false)
    const [clone, setclone] = useState([])
    const [pageNumber, setpageNumber] = useState(1)
    const [productperpage, setproductperpage] = useState(10)
    let pagesVited = pageNumber * productperpage
    
    const [productList, setproductList] = useState([])
      useEffect(() => {
        setproducts(createdproducts)
        setproductList(products.sort((a, b) => {
          let fa = a.name.toLowerCase(),
          fb = b.name.toLowerCase();
          if (fa < fb) {
              return -1;
          }
          if (fa > fb) {
              return 1;
          }
      }).slice(pagesVited, pagesVited + 20))
        setclone(createdproducts)
      },[pagesVited, createdproducts])
      const handleChange = (event, value) => {
        setpageNumber(value)
      };

    return (
        <>
            <section className={`padding bluebg`}>
                <div className={`flex justify-between ${styles.productdisplay}`}>
                <div className={`${styles.productsidenavwrapper} ${show && styles.show}`}>
                    <div className={`${styles.productsidebar} margin-right ${show && styles.show}`}>
                        <div className={`${styles.productsidebaritem}`}>
                            <div className={`${styles.description} white margin-bottom main-bg`}>
                                SEARCH PRODUCTS
                            </div>
                            <div>
                                <input type="text" className={`${styles.prodsidebaritemselect}`} onChange={e => {
                                  clearTimeout(query)
                                  const {value} = e.target
                                  let query = setTimeout(() => {
                                    setproductList(search(products, value).slice(0, 20))
                                  }, 3000);
                                }} />
                            </div>
                        </div>
                        <div className={`${styles.productsidebaritem}`}>

                            <div className={`${styles.description} white main-bg`}>
                                  SORT PRODUCTS BY
                            </div>
                            <div>
                                <div name="select">
                                  <div className={`${styles.sidenavitem}`} onClick={e => {
                                    setproductList(products.sort((a, b) => {
                                        return a.rating - b.rating;
                                    }).slice(0, 20))
                                  }}>RATING(lowest)</div>
                                  <div className={`${styles.sidenavitem}`} onClick={e => {
                                     setproductList(products.sort((a, b) => {
                                      return b.rating - a.rating;
                                      }).slice(0,  20))
                                  }}>RATING(highest)</div>
                                  <div className={`${styles.sidenavitem}`} onClick={e => {
                                    setproductList(products.sort((a, b) => {
                                          return b.price - a.price;
                                      }).slice(0,  20))}}>PRICE(high -> low)</div>
                                  <div className={`${styles.sidenavitem}`} onClick={e => {
                                      setproductList(products.sort((a, b) => {
                                         return a.price - b.price;
                                      }).slice(0,  20))
                                  }}>PRICE(low -> high)</div>
                                  <div className={`${styles.sidenavitem}`} onClick={e => {
                                   setproductList(products.sort((a, b) => {
                                          let older = new Date(a.lastlyOrdered).getTime()
                                          let newer = new Date(b.lastlyOrdered).getTime()
                                          return older > newer? -1 : 1

                                      }).slice(0, 20))
                                  }}>LASTLY ORDERED</div>
                                  <div className={`${styles.sidenavitem}`} onClick={e => {
                                     setproductList(products.sort((a, b) => {
                                      return b.numReviews - a.numReviews;
                                  
                                  }).slice(0, 20))
                                  }}>MOST REVIEWED</div>
                                  <div className={`${styles.sidenavitem}`} onClick={e => {
                                    setproductList(products.sort((a, b) => {
                                        return b.numOrders - a.numOrders;
                                    }).slice(0, 20))
                                  }}>MOST ORDERED</div>
                                  <div className={`${styles.sidenavitem}`} onClick={e => {
                                  setproductList(products.sort((a, b) => {
                                      let older = new Date(a.lastlyreviewed).getTime()
                                      let newer = new Date(b.lastlyreviewed).getTime()
                                      return older > newer? -1 : 1
                                  }).slice(0, 20))
                                  }}>LASTLY RATED</div>
                                  <div className={`${styles.sidenavitem}`} onClick={e => {
                                    setproductList(products.sort((a, b) => {
                                    return b.numviews - a.numviews
                                }).slice(0, 20))
                                  }}>MOSTVIEWED</div>
                                  <div className={`${styles.sidenavitem}`} onClick={e => {
                                    setproductList(products.sort((a, b) => {
                                    let fa = a.name.toLowerCase(),
                                        fb = b.name.toLowerCase();
                                        if (fa < fb) {
                                            return -1;
                                        }
                                        if (fa > fb) {
                                            return 1;
                                        }
                                }).slice(0, 20))
                                  }}>NAME</div>
                                </div>
                            </div>  
                        </div>
                        <div className={`${styles.productsidebaritem}`}>

                            <div className={`${styles.description} white main-bg`}>
                                AVAILABLE CATEGORY
                            </div>
                            <div>
                                <div className={`${styles.prodsidebaritemselect}`}>
                                    {
                                      categories.map(cat => (
                                        <div className={`${styles.sidenavitem}`} value={cat.category} key={cat._id}>{cat.category}</div>
                                      ))                                      
                                    }
                                </div>
                            </div>
                        </div>
                        <div className={`${styles.productsidebaritem} margin-bottom`}>
                            <div className={`${styles.description} white main-bg`}>
                                BEST SELLERS
                            </div>
                            <div>
                                <div name="select"  className={`${styles.prodsidebaritemselect}`}>
                                    {
                                      clone.sort((a, b) => {
                                        return b.numOrders - a.numOrders;
                                    }).slice(0, 5).map(prod => (
                                        <Footerproduct key={prod?._id} product={prod} text={`ordered ${prod.numOrders} ${prod.numOrders > 1? 'times' : 'time'} `} />
                                      ))
                                    }
                                </div>
                            </div>
                        </div>
                        <Pagination count={Math.floor(products.length / 10)} page={pageNumber} onChange={handleChange} siblingCount={0} color="primary"/>
                    </div>
                        <div className={`${styles.showproductsidenav}`} onClick={e => setshow(!show)}> <DehazeIcon /> </div>
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