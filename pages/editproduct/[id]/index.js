import {useRouter} from 'next/router'
import React from 'react';
import react, {useState, useRef, useEffect, useContext} from "react"
import axios from 'axios'
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Link from '@material-ui/core/Link';
import Dashboardsidebar from '../../../components/Dashboardsidebar';
import Dashboardheader from '../../../components/Dashboardheader';
import Head from 'next/head'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import DeleteIcon from '@material-ui/icons/Delete';
import {GlobalContext} from '../../../context/Globalcontext'


function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: 'none',
  },
  title: {
    flexGrow: 1,
  },
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9),
    },
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  fixedHeight: {
    height: 240,
  },
}));

export default function Dashboard() {
  const {sever} = useContext(GlobalContext)
  const [option, setoption] = useState(false)
  const [name, setname] = useState("")
  const [price, setprice] = useState(null)
  const [productName, setproductName] = useState("")
  const [productPrice, setproductPrice] = useState(null)
  const [productDescription, setproductDescription] = useState(null)
  const [category, setcategory] = useState("edibles")
  const [productImage, setproductImage] = useState()
  const [categories, setcategories] = useState([])
  const [show, setshow] = useState(true);
  const [options, setoptions] = useState([]);
  const router =  useRouter()
  const {id} = router.query

  const getproduct = async(pro) => {
      const {data} = await axios.get(`${sever}/api/products/${pro}`)
      setproductName(data.name)
      setproductPrice(data.price)
      setcategory(data.category)
      setproductDescription(data.description)
      setoptions(data.options)
      setproductImage(`../../${data.image}`)
  }

  useEffect(() => {
    getproduct(id)
  }, [])

  let sendProduct = async(e) =>  {
    e.preventDefault()
    if (!productImage) {
      alert('please choose an image')
      return
    }
   let product = {
             name:productName,
             image:productImage,
             description:productDescription, 
             price:productPrice,
             options,
             category,
             countInStock: 30,
             _id: '613afcfe1ebbd3207488e1f8',
         }
   try {
   const {data} =  axios.post(`${sever}/api/products/updateproduct`, product)
  //  Notification({
  //    title:"Product create success",
  //    message:`Sucessfuly created product`,
  //    type:"success",
  //    container:"top-right",
  //    insert:"top",
  //    animationIn:"fadeInUp",
  //    animationOut:"fadeOut",
  //    duration:5000
  //  })
  //  notificationSound.current.play()
  //  setTimeout(() => {
  //    window.location.reload()
  //  }, 3000);
     console.log(data);
   } catch (error) {
     console.log(error);
   }
  },
 addProductOption = () => {
   if (!name || !price) {
     return
   }
  options.push({name, price})
  setoptions(options)
   console.log(options)
   setname("")
   setprice(0)
   setoption(false)
 }

 let sendimage = async(e) => {
  var bodyFormData = new FormData();
  let i = e.target.files[0]
  bodyFormData.append('picture', i); 
  console.clear()
  console.log(i)
  try {
    const {data} = await axios({
      method: "post",
      url: `${sever}/api/products/uploadphoto`,
      data: bodyFormData,
      headers: { "Content-Type": "multipart/form-data" },
    })
    console.clear()
    console.log(data)
    setproductImage(`${sever}/uploads/${data.filename}`)
  } catch (error) {
    alert('an error ocurred while uploading image')
    console.log(error)
  }
}

  const classes = useStyles();
  const [open, setOpen] = React.useState(true);
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

  return (
    <div className={classes.root}>
      <Head>
                <title>create-product</title>
                <meta name="description" content="Generated by create next app" />
                <link rel="icon" href="./assets/images/logo.jpg" />
            </Head>
      <CssBaseline />
      <Dashboardsidebar />
      <Dashboardheader />
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
            <Grid item xs={12}>
              <Paper className={classes.paper}>
                <form action="" className={`flex column`}  onSubmit={sendProduct}>
                    <div className={`flex align-center justify-between margin-bottom wrap`}>
                        <TextField id="standard-basic" label="Name" value={productName} onChange={e => setproductName(e.target.value)} required/>
                        <TextField id="standard-basic" label="Price" value={productPrice} onChange={e => setproductPrice(parseInt(e.target.value))} required/>
                        <select name="" id="" className={`padding`} value={category} onChange={e => setcategory(e.target.value)} >
                            <option>category 1</option>
                            <option>category 2</option>
                            <option>category 3</option>
                            <option>category 4</option>
                        </select>
                        <input
                            accept="image/*"
                            className={`hide`}
                            id="contained-button-file"
                            multiple
                            type="file"
                            onChange={async(e) => sendimage(e)}
                        />
                        <label htmlFor="contained-button-file">
                           { !productImage?
                           <Button variant="contained" color="primary" component="span">
                                Upload
                            </Button> : <img src={productImage} alt="" height={80} width='80px' className='round' />
                            }
                        </label>
                    </div>
                    <textarea name="" id="" cols="30" rows="10" required value={productDescription}  onChange={e => setproductDescription(e.target.value)} ></textarea>
                    <div className={`margin-bottom flex wrap column`}>
                        <h3>options</h3>
                        {
                          options.map(opt => (
                            <div  className={`flex align-center wrap padding`} key={opt.name}>
                              <TextField id="standard-basic" label="Standard" value={opt.name} />
                              <TextField id="standard-basic" label="Standard" value={opt.price} />
                              <div className={`margin-top`} id={opt.name} onClick={e => {
                                setoptions(options.filter(o => o.name !== opt.name))
                                }}>
                                <Button variant="contained" color="secondary" component="span" startIcon={<DeleteIcon />} >
                                    Delete
                                </Button>
                              </div>
                          </div>
                          ))
                        }
                    </div>
                    <div className={`margin-bottom flex wrap column`}>
                        <Button variant="contained" color="primary" component="span" onClick={e => setoption(true)} >
                            Add Option
                        </Button>
                       {option && <div  className={`flex align-center wrap `}>
                             <TextField id="standard-basic" label="Standard" onChange={e => setname(e.target.value)} />
                            <TextField id="standard-basic" label="Standard" onChange={e => setprice(parseInt(e.target.value))} />
                            <div className={`margin-top`}>
                              <Button variant="contained" color="primary" component="span" onClick={addProductOption}>
                                  Save Option
                              </Button>
                            </div>
                        </div>}
                    </div>
                    <Button variant="contained" color="primary" component="span" type='submit' onClick={sendProduct}>
                        Save Product
                    </Button>
                </form>
              </Paper>
            </Grid>
          <Box pt={4}>
            <Copyright />
          </Box>
        </Container>
      </main>
    </div>
  );
}