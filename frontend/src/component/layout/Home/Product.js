import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'
import ReactStars from 'react-rating-stars-component'

function Product({ product }) {
    return (
        <Fragment>
            <Link className='productCard' to="/">


                <img className='productDP' src={product.images[0].url} alt={product.name} />
                <div className='productInfo'>

                    <p className='productName'>{product.name}</p>
                    {/* <p className='productDescription'>{product.description}</p> */}
                    <p className='productDescription'>
                        {
                            product.description.length > 50 ? `${product.description.slice(0, 50)}.......` : product.description
                        }

                    </p>
                    <p className='productPrice'>₹{product.price}</p>
                    <div className='ratingContainer'>
                        <ReactStars /> <span className='reviewCount'>(200 ratings)</span>

                    </div>
                </div>

            </Link>
        </Fragment>
    )
}

export default Product
