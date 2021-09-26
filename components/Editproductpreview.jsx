import React from 'react'
import Product from './Product';
import axios from 'axios'
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import styles from '../styles/Dashboard.module.css'
import Link from 'next/link';
import {GlobalContext} from '../context/Globalcontext'
import { useState, useEffect, useContext } from 'react';
import Pagination from '@material-ui/lab/Pagination';
import AlertDialog from './dialog'
import LoadingBox from './LoadingBox'
import {Notification} from './Notification'

const Editproductpreview = () => {
    const {sever} = useContext(GlobalContext)
    const [id, setid] = useState()
    const [show, setshow] = useState()
    const [products, setproducts] = useState([])
    const [pageNumber, setpageNumber] = useState(1)
    let pagesVited = pageNumber * 10

    const getproducts = async() => {
        try {
            const {data} = await axios.get(`${sever}/api/products/other`)
        setproducts(data)
        } catch (error) {
            alert('an error occured', error.response.message)
        }
    }

    const close = async() => {
        try {
            const {data} = await axios.get(`${sever}/api/products/delete/${id}`)
            Notification({
                title:"Product deleted successfully",
                message:`you have successfully deleted product id: ${id}`,
                type:"success",
                container:"top-right",
                insert:"top",
                animationIn:"fadeInUp",
                animationOut:"fadeOut",
                duration:5000
              })
            getproducts()
        } catch(error) {
           console.log(error)
        }
        setid('')
        setshow(!show)
    }

    useEffect(() => {
            getproducts()
    },[products, pagesVited])

    const handleChange = (event, value) => {
        setpageNumber(value)
      };

    return products[0]? (
        <div>
            
            <div className="flex justify-between w-s-100 wrap">
            {
                products.slice(pagesVited, pagesVited + 10).map(prod => (
                <div className={`${styles.productwrapper}`} key={prod._id}>
                    <AlertDialog close={close} text={`If you delete product id: ${id}? this action can not be undone`} heading='Are you sure you want to delete this product?' setopen={setshow}  open={show} />
                <Product product={prod} key={prod.name} />
                    <div className={`${styles.productactionwrapper}`}>
                        <div className={`margin-bottom pointer red`} onClick={e => {
                            setshow(true)
                            setid(prod._id)
                        }}>
                            <DeleteIcon />
                        </div>
                        <div className={`margin-bottom link`}>
                        <Link color="inherit" href={`/editproduct/${prod._id}`}>       
                            <EditIcon />
                        </Link>
                        </div>
                    </div>
                </div>
                ))
            }
            </div>
            <Pagination count={Math.floor(products.length / 10)} page={pageNumber} onChange={handleChange} siblingCount={0} color="primary"/>
        </div>
    ) : (<LoadingBox />)
}

export default Editproductpreview
