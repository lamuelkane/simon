import React, { useState, useRef, useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import Rating from 'material-ui-rating';
import Button from '@material-ui/core/Button';
import axios from 'axios'
import { GlobalContext } from "../context/Globalcontext";
import {Notification} from './Notification'


function TabPanel(props) {
    
  const error = useRef()
  const success = useRef()
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-auto-tabpanel-${index}`}
      aria-labelledby={`scrollable-auto-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `scrollable-auto-tab-${index}`,
    'aria-controls': `scrollable-auto-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    // width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
}));

export function ProductDescription(props) {
  const {sever, product} = useContext(GlobalContext)
  const classes = useStyles();
  const [value, setValue] = useState(0);
  const [rating, setrating] = useState(0)
  const [reviews, setreviews] = useState([])
  const [name, setname] = useState()
  const [email, setemail] = useState()
  const [review, setreview] = useState()
  const submit = useRef()
  const error = useRef()
  const success = useRef()

  const getreviews = async () => {
    const {data} = await axios.get(`${sever}/api/reviews/productreview`)
    setreviews(data)
  }

  
  useEffect(() => {
    getreviews()
  },[])

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <audio src="./notification/success.mp3" ref={success} ></audio>
        <audio src="./notification/error.mp3" ref={error} ></audio>
      <AppBar position="static" color="default">
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant="scrollable"
          scrollButtons="auto"
          aria-label="scrollable auto tabs example"
        >
          <Tab label="Description" {...a11yProps(0)} />
          <Tab label="Review" {...a11yProps(1)} />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        {
          props.product?.description
        }
      </TabPanel>
      <TabPanel value={value} index={1}>
          <div>
           {
            reviews.filter(revie => revie.approved).filter(rev => rev.ProductId === product?._id).map(item => (
              <div className={`margin-bottom`} key={item._id}>
              <div className={`flex justify-between align-center`}>
                  <div className={`flex align-center`}>
                          <AccountCircleIcon />
                          <span className={`margin-left`}>{item.name}</span>
                  </div>
                  <Rating
                      value={item.rating}
                      max={5}
                      readOnly
                  />
              </div>
              <div>
                 {item.review} 
              </div>
          </div>
          
            ))   
          }
          </div>
          <form onSubmit={async(e) => {
            e.preventDefault()
            if(rating < 1) {
              Notification({
                title:"Incomplete Information",
                message:`Please add a rating amount`,
                type:"info",
                container:"top-right",
                insert:"top",
                animationIn:"fadeInUp",
                animationOut:"fadeOut",
                duration:5000
              })
              error.current.play()
              return
            }
            const userreview = {
              name,
              email,
              review,
              rating,
              productId: props.product._id
            }
            
            const {data} = await axios.post(`${sever}/api/reviews/insertproductreview`, userreview)
            setname('')
            setemail('')
            setreview('')
            setrating(0)
            Notification({
              title:"Succesfully Rated Product",
              message:`Thanks for Rating This product`,
              type:"success",
              container:"top-right",
              insert:"top",
              animationIn:"fadeInUp",
              animationOut:"fadeOut",
              duration:5000
            })
            success.current.play()
          }} >
              <h2>Write Something about this product</h2>
              <input type="text" placeholder='Name'  value={name} onChange={e => setname(e.target.value)} required />
              <input type="email" placeholder='Email'  value={email} onChange={e => setemail(e.target.value)} required />
              <textarea  value={review} placeholder='REVIEW' onChange={e => setreview(e.target.value)} cols="50" required rows="10" className='margin-y' ></textarea>
              <div className="blackbg">
                  <Rating
                        value={rating}
                        max={5}
                        onChange={(i) => setrating(i)}
                  />
              </div>
              <button className="hide" ref={submit} type='submit'></button>
                  <Button variant="contained" color="primary" onClick={(e) => {
                      submit.current.click()
                  }} >
                      SEND REVIEW
                  </Button>
          </form>
      </TabPanel>
    </div>
  );
}
