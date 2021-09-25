import QuestionAnswerIcon from '@material-ui/icons/QuestionAnswer';
import axios from 'axios'
import React, { useState, useEffect, useRef, useContext } from 'react'
import {io} from 'socket.io-client'
import Notification from './Notification'
import styles from '../styles/Chatbox.module.css'
import SendIcon from '@material-ui/icons/Send';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Message from "./Message";
import { v4 as uuidv4 } from 'uuid';
import {GlobalContext} from '../context/GlobalContext'

const Chatbox = () => {
    let {sever} = useContext(GlobalContext)
    const [id, setid] = useState()
    const [show, setshow] = useState(false)
    const socket = useRef()
    const scroll = useRef()
    const newmessagearrived = useRef()
    const [message, setMessage] = useState('')
    const [conversation, setconversation] = useState([])
    const [messages, setmessages] = useState([])
    const [conversationid, setconversationid] = useState('')
    const notificationSound = useRef()
    let count = 0
    let unreadMessages = []

    useEffect(() => {
        
        if (!localStorage.getItem('id')) {
            localStorage.setItem('id', uuidv4())
            setid(localStorage.getItem('id'))
        }
        else{
            setid(localStorage.getItem('id'))
        }
        getmessage()
        socket.current = io('ws://localhost:5001/')
        socket.current.on('getmessage', msg => {
            msg.received = true
            unreadMessages.push(msg)
            // updatemessage(msg)
            socket.current.emit('messagestatus', unreadMessages)
            //   notificationSound.current.play()
            getmessage()
        })
        
        socket.current.on('getmessagestatus', msg => {
           // alert('hey')
            getmessage()
        })

        socket.current.emit('adduser', id)
        
    }, []);
    
    useEffect(() => {
        socket.current?.emit('adduser', id)
    }, [id]);

    useEffect(() => {
        getmessage()
    }, []); 

    let getmessage = async() => {

        try {
            const {data} = await axios.get(`${sever}/chats/messages`)
            setmessages(data)
            // scroll.current?.scrollIntoView({behavior: 'smooth'})
            // newmessagearrived.current?.classList.add('animate__wobble')
            // setTimeout(() => {
            //     newmessagearrived.current?.classList.remove('animate__wobble')
            // }, 1000);

        } catch (error) {
       
        }    }

    let sendMessage = async(e) => {

        if(!message) return
        const msg = {
            text: message,
            senderid: id
        }
        try {
            const {data} = await axios.post(`${sever}/chats/message`, msg)
           getmessage()
            setMessage('')
            scroll.current?.scrollIntoView({behavior: 'smooth'})
            socket.current.emit('sendMessge', data)
            // notificationSound.current.play()
        } catch (error) {
            console.log(error)  
        }
    }

    let updatemessages = async(unreadMessages)=> {
        try {
            const {data} = await axios.post('/chats/messages/update', unreadMessages)
        } catch (error) {
          console.log(error)  
        }

    }

    let updatemessage = async(unreadMessages)=> {
        try {
            const {data} = await axios.post('/chats/message/update', unreadMessages)
           // console.log(data)
        } catch (error) {
          console.log(error)  
        }

    }

    return (
        <>
            {!show &&  <div className={`${styles.chatboxicon} pointer ${show && 'hide'}`} onClick={e => setshow(true)}>
                <QuestionAnswerIcon />
            </div>}
        <div className={`${styles.chatboxwrapper}`}>  
            <div className={`${styles.chatboxcontainer} ${show ? styles.show : styles.hide}`}>
            <div className={`${styles.chatboxclose} pointer`} onClick={e => setshow(false)}><ExpandMoreIcon /></div>
                <div className={`${styles.chatboxtop}`}>
                    <div className={`${styles.chatboxtopicon} flex align-center`}>
                        <AccountCircleIcon />
                    </div>   
                    <div className={`${styles.chatboxtoptext}`}>What's on your mind</div>
                </div>
                {/* <form className={`${styles.chatbottom} flex column justify-center align-center`}>
                    <input type="text" className={`${styles.chatname}`} placeholder='Enter Your Name' />
                    <input type="text" className={`${styles.chatemail}`} placeholder='Enter your Email' />
                    <textarea name=""  className={`${styles.chattext}`} placeholder='What Is On Your Mind' id="" cols="20" rows="8"></textarea>
                </form> */}
                <form className={`${styles.chatbottom} flex column justify-center align-center`} onSubmit={e => e.preventDefault()}>
                    <div className={`${styles.chattextsholder}`}>
                       {
                           messages.filter(mess => mess.senderid === id).map(mess => (
                                   <Message message={mess} key={mess._id} admin={mess.receiverid}/>
                           ))
                       }
                    </div>
                    <div className={`${styles.chattextchat}`}>
                        <textarea  className={`${styles.chattextchattext} padding`} placeholder='What Is On Your Mind' value={message} onChange={e => setMessage(e.target.value)} ></textarea>
                        <button  className={`${styles.chattextchatbtn}`} onClick={sendMessage} >
                            <SendIcon />
                        </button>
                    </div>
                </form>
            </div>
        </div>
        </>
    )
}

export default Chatbox;