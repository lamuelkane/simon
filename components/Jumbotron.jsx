import { useState, useEffect } from 'react';
import styles from '../styles/Jumbotron.module.css'

const Jumbotron = () => {
    const [content, setcontent] = useState();

    let index = 1
    const changecontent = () => {
        let values = [
            {
                img: `<img src=./assets/images/hero/hero1.jpg alt="" class='${styles.jumbbackground}'/>`,
                text: `<div class='${styles.jumbtext}'>
                            <h1>RELEIFWEED420</h1>
                            <p>The Key To Getting High</p>
                            <small class='curly x-large'>Amazing Variety Of Flavors and Strains </small>
                        </div>`
            },
            {
                img: `<img src=./assets/images/hero/hero2.png alt="" class='${styles.jumbbackground}'/>`,
                text: `<div class='${styles.jumbtext}'>
                            <h1>RELEIFWEED420</h1>
                            <p>The Key To Getting High</p>
                            <small class='curly x-large'>Amazing Variety Of Flavors and Strains </small>
                        </div>`
            },
            {
                img: `<img src=./assets/images/hero/hero3.jpg alt="" class='${styles.jumbbackground}'/>`,
                text: `<div class='${styles.jumbtext}'>
                            <h1>RELEIFWEED420</h1>
                            <p>The Key To Getting High</p>
                            <small class='curly x-large'>Amazing Variety Of Flavors and Strains </small>
                        </div>`
            },
            {
                img: `<img src=./assets/images/hero/hero4.jpg alt="" class='${styles.jumbbackground}'/>`,
                text: `<div class='${styles.jumbtext}'>
                            <h1>RELEIFWEED420</h1>
                            <p>The Key To Getting High</p>
                            <small class='curly x-large'>Amazing Variety Of Flavors and Strains </small>
                        </div>`
            },
            {
                img: `<img src=./assets/images/hero/hero5.jpg alt="" class='${styles.jumbbackground}'/>`,
                text: `<div class='${styles.jumbtext}'>
                            <h1>RELEIFWEED420</h1>
                            <p>The Key To Getting High</p>
                            <small class='curly x-large'>Amazing Variety Of Flavors and Strains </small>
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