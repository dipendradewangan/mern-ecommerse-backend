import React, { Fragment } from 'react'
import './Home.css'
import { CgMouse } from 'react-icons/cg'
import ProductCard from './ProductCard.js'
import MetaData from '../MetaData'


const product = {
    images: [{ url: 'https://m.media-amazon.com/images/I/51LATy7uCGL._SL1000_.jpg' }],
    name: 'Lenovo G5080',
    price: 512,
    description: 'lenovo g5080 with 1tb hard disk, 4 gb ram core i3 prossor 4th generation',
    rating: 4
}

const Home = () => {
    return <Fragment>
        <MetaData title={'Home'}/>
        <div className='banner'>

            <h3>WELCOME TO SHOPCART</h3>
            <h4>Shop smarter, shop effortlessly</h4>
            <a href='#productTitle'>
                Scroll <CgMouse />
            </a>
        </div>
        <p className='productTitle' id='productTitle'>Feachered Products</p>
        <div className='productContainer'>
            <ProductCard product={product} />
            <ProductCard product={product} />
            <ProductCard product={product} />
            <ProductCard product={product} />
            <ProductCard product={product} />
            <ProductCard product={product} />
            <ProductCard product={product} />
            <ProductCard product={product} />
        </div>
    </Fragment>

}

export default Home
