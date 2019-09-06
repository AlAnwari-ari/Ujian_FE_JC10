import React from 'react'
import './productData.css'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import Axios from 'axios';
import { urlApi } from '../../helper/database';
import { updateCart } from '../../Redux/Actions';
import swal from 'sweetalert';



const Product = (props) => {
    const {name, price, discount, image, productId} = props

    const addToCart = () => {
        let cartObj = {
            productId : productId,
            userId: props.id,
            quantity : 1,
            price : price,
            img : image,
            discount : parseInt(discount),
            productName : name
        }

        Axios.get(urlApi + `cart?userId=${props.id}&productId=${productId}`)
        .then((res)=>{
            if (res.data.length > 0) {
                cartObj.quantity = parseInt(res.data[0].quantity) + 1
                Axios.put(urlApi + 'cart/' + res.data[0].id, cartObj)
                .then((res)=>{
                    swal('Thank you', `Ayo belanja lebih banyak lagi (put)`,'success')
                })
                .catch((err)=>{
                    console.log(err);
                    
                })
                
            } else {
                Axios.post(urlApi + 'cart', cartObj)
                .then((res)=>{
                    props.updateCart(props.id)
                    swal('Thank you', `Ayo belanja lebih banyak lagi (post)`,'success')
                })
                .catch((err)=>{
                    console.log(err);
                    
                })
            }


        })
        .catch((err)=>{
            console.log(err);
            
        })
        
    }

    return(
        <div className="card col-md-auto m-3">
            {
                discount > 0 
                ?
                <div className="diskon text-white text-center">{discount}%</div>
                    :
                null
            }
            <Link to={'/product-details/' + productId}><img className="card-img-top" style={{width:'200px', height:'200px'}} src={image} alt="gambarbro"/></Link>
            <div className="card-body">
                <h5 className="card-title">{name}</h5>
                {
                    discount > 0 
                    ?
                    <p style={{textDecoration:'line-through', color:'red'}} className="card-text">Rp.{new Intl.NumberFormat('id-ID').format(price)}</p>
                    :
                    null             
                }
                <p className="card-text">Rp.{new Intl.NumberFormat('id-ID').format(price - price * discount/100)},-</p>
            </div>
            <div className="card-footer" style={{background:'none'}}>
                {
                    props.username
                    ?
                    <input type="button" value="Buy"className="btn btn-primary btn-block" onClick={addToCart}/>
                    :
                    <Link to='/auth' style={{textDecoration:'none', color:'inherit'}}><input type="button" value="Buy"className="btn btn-primary btn-block"/></Link>
                }
            </div>
            
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        id : state.user.id,
        username : state.user.username
    }
}

export default connect(mapStateToProps, {updateCart})(Product) 