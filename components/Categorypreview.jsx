import SwiperCore, { Navigation, Pagination, Scrollbar, A11y } from 'swiper';
import { useState, useRef, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import Category from './Category';


SwiperCore.use([Navigation, Pagination, Scrollbar, A11y]);
const Categorypreview  = ({categories}) => {

  const width = useRef()
  const [num, setnum] = useState()

  useEffect(() => {
    width.current = window?.innerWidth
      if(width.current > 1000){
          setnum(4)
          console.log('> 1000', width.current, num)
      }
      if(width.current > 800 && width.current < 1000){
          setnum(3)
          console.log('> 800 < 1000', width.current, num)
      }
      if(width.current < 800){
          setnum(2)
          console.log('< 800', width.current, num)
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
               categories.map(cat => (
                  <SwiperSlide key={cat._id}>
                     <Category category={cat} />
                  </SwiperSlide>
               ))   
            }
    </Swiper>
  );
};

export default Categorypreview;