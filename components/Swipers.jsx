import SwiperCore, { Navigation, Pagination, Scrollbar, A11y } from 'swiper';
import { useState, useRef, useEffect, useContext } from 'react';
import { GlobalContext } from "../context/Globalcontext";
import { Swiper, SwiperSlide } from 'swiper/react';
import Category from './Category';
import Product from './Product';

SwiperCore.use([Navigation, Pagination, Scrollbar, A11y]);
const Swipers  = ({products}) => {

  const width = useRef()
  const [num, setnum] = useState()

  useEffect(() => {
    width.current = window?.innerWidth
      if(width.current > 1000){
          setnum(4)
      }
      if(width.current > 800 && width.current < 1000){
          setnum(3)
      }
      if(width.current < 800){
          setnum(2)
      }
    //   window.onresize = () => {
    //     console.clear()
       
    // }
        
    },[width]);


  return (
    <Swiper
      spaceBetween={20}
      slidesPerView={num}
      navigation
      pagination={{ clickable: true }}
    //   scrollbar={{ draggable: true }}
    //   onSwiper={(swiper) => console.log(swiper)}
    //   onSlideChange={() => console.log('slide change')}
    >
           { 
            products.slice(0, 10).map(prod => (
                  <SwiperSlide key={prod.name} >
                     <Product product={prod} />
                  </SwiperSlide>
               ))
            }

    </Swiper>
  );
};

export default Swipers;