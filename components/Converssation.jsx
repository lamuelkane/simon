import React from 'react'
import styles from '../styles/messages.module.css'
import Badge from '@material-ui/core/Badge';

export const Converssation = (props) => {
    return (
        <div className={`${styles.Converssation}`} onClick={e => {
            props.setsenderid(props.id)
             props.setshowcontent(true)}
             }>
            <div className={`${styles.Converssationimgwrapper}`}>
                <Badge color="primary" variant="dot">
                        <img src="../assets/images/post/post20.jpg" alt="" className={`${styles.Converssationimg} round`}/>
                </Badge>
            </div>
            <div className={`${styles.Converssationcontent}`}>
                <div className={`${styles.Converssationcontentheader}`}>
                    <h4 className={`${styles.Converssationcontentheaderh3}`}>john carter</h4>
                    <small>5mins ago</small>
                </div>
                <div>
                   {props.id}
                </div>
                <span className={`${styles.unreadmessagecount}`}>
                    3
                </span>
            </div>
        </div>
    )
}
