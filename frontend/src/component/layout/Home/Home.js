import React, { Fragment } from 'react'
import './Home.css'
import { CgMouse } from 'react-icons/cg'

const Home = () => {
    return <Fragment>
        <div className='banner'>

            <h3>WELCOME TO SHOPCART</h3>
            <h4>Shop smarter, shop effortlessly</h4>
            <a href='/'>
                Scroll <CgMouse />
            </a>
        </div>
    </Fragment>

}

export default Home
