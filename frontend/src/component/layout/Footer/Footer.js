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
                <h1>ECOMMERSE.COM</h1>
                <h5>Follow us</h5>
                <p>High quality is our first priority</p>
            </div>
            <div className='rightFooter'>
                <a href='/'>instagram</a>
                <a href='/'>facebook</a>
                <a href='/'>gmail</a>
                <a href='/'>linkedin</a>
            </div>
        </div>
    )
}

export default Footer
