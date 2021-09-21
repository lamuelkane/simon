import styles from '../styles/Dashboard.module.css'
import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import NotificationsIcon from '@material-ui/icons/Notifications';
import ChatBubbleIcon from '@material-ui/icons/ChatBubble';
import Link from '@material-ui/core/Link';
import {useRouter} from 'next/router'
import { useEffect} from 'react'

const Dashboardheader = () => {
    let router = useRouter()
    
    useEffect(() => {
        if(!localStorage.getItem('user')) router.push('/login')
    }, [])

    return (
        <> 
            <div className={`${styles.dashboardheader}`}>
                <div className={`flex align-center justify-center column ${styles.adminimgholder}`}>
                    <img src="./assets/images/post/post17.jpg" alt="" className={`round ${styles.dashboardimg} pointer`}/>
                    <div className={`${styles.adminname}`}>Admin</div>
                </div>
                <div className={`margin-right white`}>
                    <IconButton color="inherit">
                        <div className={`flex justify-between`}>
                            <div className="margin-right">
                                <Link color="inherit" href="/dashboard">
                                    <Badge badgeContent={4} color="secondary">
                                        <NotificationsIcon />
                                    </Badge>
                                </Link>
                            </div>
                            <div className="margin-right">
                                <Link color="inherit" href="/messages">
                                    <Badge badgeContent={4} color="secondary">
                                        <ChatBubbleIcon />
                                    </Badge>
                                </Link>
                            </div>
                        </div>
                    </IconButton>
                </div>
            </div>
        </>
    );
}

export default Dashboardheader;