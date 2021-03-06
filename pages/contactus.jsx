
import Head from 'next/head'
import React, {useState, useContext} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Header from '../components/Header'
import TextField from '@material-ui/core/TextField';
import styles from '../styles/Product.module.css'
import Footer from '../components/Footer';
import Button from '@material-ui/core/Button';
import axios from 'axios'
import {GlobalContext} from '../context/Globalcontext'
import {Notification} from '../components/Notification'

const useStyles = makeStyles((theme) => ({      
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
}));

const Contactus = () => {
  const classes = useStyles();
  const [name, setname] = useState('')
  const [email, setemail] = useState('')
  const [message, setmessage] = useState('')
  const {sever} = useContext(GlobalContext)


    return (
        <div>
            <Head>
                <title>contactus</title>
                <meta name="description" content="Contact us" />
                <link rel="icon" href="./assets/images/logo.png" />
                {/* <script src="//code.tidio.co/ftuqj1khsqhmuxgwhvmultjlstv4bcw8.js" async></script> */}
                {/* <script type="text/javascript" id="hs-script-loader" async defer src="//js-eu1.hs-scripts.com/25151583.js"></script> */}
            </Head>
            <Header />
            <div className={`${styles.prodjum} flex justify-center curly xx-large align-center`}>
                        home/contactus
            </div>
            <div className={`w-70 w-s-90 flex wrap margin-auto justify-between margin-bottom  ${styles.cartitemswrapper}`}>
                <div>
                    <div className={`curly xx-large`}> You Talk We Listen</div>
                    <p><span>EMAIL: </span> <a  className={`margin-x white link`} href="mailto:info@releifweed420.com">info@releifweed420.com</a></p>
                    <p><span>PHONE:</span> <a href="tel:+17759648771" className={`margin-x white link`}>+1-(775)-964-8771</a></p>
                    <p>Location : Los Angeles California. USA</p>
                </div>
                <div>
                    <form className={`${classes.root} ${styles.cartitemswrappe}`} noValidate autoComplete="off">
                        <TextField id="standard-basic" label="Name" value={name} onChange={e => setname(e.target.value)}/>
                        <TextField id="filled-basic" label="Email" value={email} onChange={e => setemail(e.target.value)} type='email'/>
                        {/* <TextField id="outlined-basic" label="Outlined" /> */}
                       <div className="margin-top">
                        <textarea name="" id="" cols="50" onChange={e => setmessage (e.target.value)} placeholder='Message' className={styles.contacttext} rows="10"></textarea>
                       </div>
                       <Button variant="contained" color="primary"  disableElevation  onClick={async(e) => {
                         try{
                            const {data} = await axios.post(`${sever}/contact`, {name, message, email})
                            Notification({
                              title:"Message sent successfully",
                              message:`Thanks for contacting us, we will get back to you once we receive the email`,
                              type:"success",
                              container:"top-right",
                              insert:"top",
                              animationIn:"fadeInUp",
                              animationOut:"fadeOut",
                              duration:5000
                            })
                         }
                         catch(err) {
                          Notification({
                            title:"Message send fail",
                            message:`we are sorry, an error occured`,
                            type:"info",
                            container:"top-right",
                            insert:"top",
                            animationIn:"fadeInUp",
                            animationOut:"fadeOut",
                            duration:5000
                          })
                          setname('')
                          setemail('')
                          setmessage('')
                         }        
                       }} >
                             Send Message
                        </Button>
                    </form>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default Contactus
