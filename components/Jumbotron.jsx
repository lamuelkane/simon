import { useState, useEffect } from 'react';
import styles from '../styles/Jumbotron.module.css'

const Jumbotron = () => {
    const [content, setcontent] = useState();

    let index = 1
    const changecontent = () => {
        let values = [
            {
                img: `<img src=./assets/images/post/post6.jpg alt="" class='${styles.jumbbackground}'/>`,
                text: `<div class='${styles.jumbtext}'>
                            <h1>ADVANCED SHOPPING CENTER</h1>
                            <p>Look Bright Everyday</p>
                            <small>all you are looking for at a glance </small>
                        </div>`
            },
            {
                img: `<img src=./assets/images/post/post28.jpg alt="" class='${styles.jumbbackground}'/>`,
                text: `<div class='${styles.jumbtext}'>
                            <h1>ADVANCED SHOPPING CENTER</h1>
                            <p>Look Bright Everyday</p>
                            <small>all you are looking for at a glance </small>
                        </div>`
            },
            {
                img: `<img src=./assets/images/post/post15.jpg alt="" class='${styles.jumbbackground}'/>`,
                text: `<div class='${styles.jumbtext}'>
                            <h1>ADVANCED SHOPPING CENTER</h1>
                            <p>Look Bright Everyday</p>
                            <small>all you are looking for at a glance </small>
                        </div>`
            },
            {
                img: `<img src=./assets/images/post/post20.jpg alt="" class='${styles.jumbbackground}'/>`,
                text: `<div class='${styles.jumbtext}'>
                            <h1>ADVANCED SHOPPING CENTER</h1>
                            <p>Look Bright Everyday</p>
                            <small>all you are looking for at a glance </small>
                        </div>`
            },
            {
                img: `<img src=./assets/images/post/post7.jpg alt="" class='${styles.jumbbackground}'/>`,
                text: `<div class='${styles.jumbtext}'>
                            <h1>ADVANCED SHOPPING CENTER</h1>
                            <p>Look Bright Everyday</p>
                            <small>all you are looking for at a glance </small>
                        </div>`
            },
           
        ]

        setcontent(`<div class='${styles.jumb} margin-bottom'>
        
    </div>`)

        // setTimeout(() => {
            setcontent(` <div class='${styles.jumb} margin-bottom'>
                            ${values[index].img}
                           ${values[index].text}
                            <div class='jumboverlay'></div>
                        </div>`
                    )
        // }, 1000);

        if(index === values.length - 1){
            index = 0
            return
        }
        index++
    }

    useEffect(() => {
        setInterval(() => {
            changecontent()
        }, 5000);
    }, []);

    return (
        <>
        <div dangerouslySetInnerHTML={{ __html: content }}>

        </div>
       
        </>
    )
}

export default Jumbotron;