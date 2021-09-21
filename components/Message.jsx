import styles from '../styles/Chatbox.module.css'
import {useRef, useEffect} from 'react'

const Message = (props) => {
    const scroll = useRef()

    useEffect(() => {
        scroll.current?.scrollIntoView({behavior: 'smooth'})
    },[])

    return (
        <>
            <div className={`${styles.message} ${!props.admin && styles.own}  ${props.admin && styles.adminmessage}`}  ref={scroll}>
                <img src={`${!props.admin ? './assets/images/post/post12.jpg' : './assets/images/logo.jpg' }`} alt="" width='35px' height='35px' className={`${styles.messageimg} margin-right`}/>
                <div  className={`${styles.messagetext}`}>
                    <span>{props.message.text}</span>
                    <small className={`${styles.messagetime}`}>8 mins ago</small>
                </div>
            </div>
        </>
    );
}

export default Message;