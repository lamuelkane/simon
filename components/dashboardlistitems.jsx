
import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import Link from 'next/link';
import DashboardIcon from '@material-ui/icons/Dashboard';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import AssignmentIcon from '@material-ui/icons/Assignment';
import RateReviewIcon from '@material-ui/icons/RateReview';
import AddBoxIcon from '@material-ui/icons/AddBox';
import EditIcon from '@material-ui/icons/Edit';

export const mainListItems = (
  <div>
      <Link color="inherit" href="/dashboard">
    <ListItem button>
      <ListItemIcon>
        <DashboardIcon />
      </ListItemIcon>
        <ListItemText primary="Dashboard" />
    </ListItem>
      </Link>
      <Link color="inherit" href="/orders">
    <ListItem button>
      <ListItemIcon>
        <ShoppingCartIcon />
      </ListItemIcon>
          <ListItemText primary="Orders" />
    </ListItem>
      </Link>
      <Link color="inherit" href="/productreview">
    <ListItem button>
      <ListItemIcon>
        <RateReviewIcon />
      </ListItemIcon>
         <ListItemText primary="Product Reviews" />
    </ListItem>
      </Link>
      <Link color="inherit" href="/createproduct">
    <ListItem button>
      <ListItemIcon>
        <AddBoxIcon />
      </ListItemIcon>
           <ListItemText primary="Create Product" />
    </ListItem>
      </Link>
      <Link color="inherit" href="/editproducts">
    <ListItem button>
      <ListItemIcon>
        <EditIcon />
      </ListItemIcon>
        <ListItemText primary="Edit Product" />
    </ListItem>
      </Link>
  </div>
);

export const secondaryListItems = (
  <div>
    <ListSubheader inset>Saved reports</ListSubheader>
    <ListItem button>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Current month" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Last quarter" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <AssignmentIcon />     
      </ListItemIcon>
      <ListItemText primary="Year-end sale" />
    </ListItem>
  </div>
);