
import styles from '../styles/Home.module.css'
import  Link  from 'next/link';
import { GlobalContext } from '../context/Globalcontext';
import { useContext , useEffect} from 'react';

const Category = ({category}) => {
     const {products} = useContext(GlobalContext)
     const product = products.find(prod => prod.category.toLowerCase() === category.category.toLowerCase())

    return (
        <>
            <div className={`${styles.category}`}>
                <img src={product?.image} alt=""  className={`${styles.categoryImg}`}/>
                <div className={`${styles.categoryoverlay}`}></div>
                <span className={`${styles.categorylink} white`}>
                    <Link href={`/shop?category=${category.category}`} >{category.category.toUpperCase()}</Link>
                </span>
            </div> 
        </>
    );
}

export default Category;