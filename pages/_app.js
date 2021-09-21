import '../styles/globals.css'
import 'swiper/swiper.scss';
import 'swiper/components/navigation/navigation.scss';
import 'swiper/components/pagination/pagination.scss';
import 'swiper/components/scrollbar/scrollbar.scss';
import {GlobalProvider} from '../context/Globalcontext'
import "react-notifications-component/dist/theme.css"

function MyApp({ Component, pageProps }) {
  return <GlobalProvider>
            <Component {...pageProps} /> 
         </GlobalProvider>
  
}

export default MyApp
