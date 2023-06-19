import React from 'react'
import playstore from '../../../images/playstore.png'
import appstore from '../../../images/Appstore.png'
import'../Footer/footer.css'
const Footer = () => {
    return (
        <div className='footer'>
            <div className='leftFooter'>
                <h2>Download The App</h2>
                <p>Click bellow to get our app</p>
                <img src={playstore} alt='playstore'/>
                <img src={appstore} alt='playstore'/>
            </div>
            <div className='midFooter'>
                <h1>ECOMMERSE</h1>
                <p>High quality is our first priority</p>
            </div>
            <div className='rightFooter'>
                <h4>Follow us</h4>
                <a href='/'>Instagram</a>
                <a href='/'>Facebook</a>
                <a href='/'>Gmail</a>
                <a href='/'>Linkedin</a>
            </div>
        </div>
    )
}

export default Footer
