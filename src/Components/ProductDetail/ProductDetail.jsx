import React, { Component } from 'react';
import {FavoriteBorderOutlined, Favorite} from '@material-ui/icons'
import Axios from 'axios';
import { urlApi } from '../../helper/database';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom'
import { updateCart } from '../../Redux/Actions';
import swal from 'sweetalert';




class ProductDetails extends Component {

    state = {
        product : {},
        qtyInput : 0,
        wishlist : false
    }

    componentDidMount(){
        this.getProductDetails()
    }

    getProductDetails = () => {
        Axios.get(urlApi + 'products/' + this.props.match.params.id)
        .then((res)=>{
            console.log(res)
            console.log(this.props.match.params.id);
            this.setState({product: res.data})
        })
        .catch((err)=>{
            console.log(err);          
        })
    }

    addToCart = () => {
        let cartObj = {
            productId : this.state.product.id,
            userId: this.props.id,
            quantity : parseInt(this.state.qtyInput),
            price : this.state.product.harga,
            img : this.state.product.img,
            discount : parseInt(this.state.product.discount),
            productName : this.state.product.nama
        }

        Axios.get(urlApi + `cart?userId=${this.props.id}&productId=${this.state.product.id}`)
        .then((res)=>{
            if (res.data.length > 0) {
                cartObj.quantity = parseInt(res.data[0].quantity) + parseInt(this.state.qtyInput)
                Axios.put(urlApi + 'cart/' + res.data[0].id, cartObj)
                .then((res)=>{
                    swal('Thank you', `Ayo belanja lebih banyak lagi`,'success')
                })
                .catch((err)=>{
                    console.log(err);
                    
                })
                
            } else {
                Axios.post(urlApi + 'cart', cartObj)
                .then((res)=>{
                    this.props.updateCart(this.props.id)
                    swal('Thank you', `Ayo belanja lebih banyak lagi`,'success')
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

    render() {
        var {nama, harga, discount, deskripsi, img} = this.state.product
        return (
            <div className='container mt-3'>
                <div className="row">
                    <div className='col-md-4'>
                        <div className="card" style={{width: '100%'}}>
                            <img className="card-img-top" src={img} alt="Card cap" />
                            <div className="card-body">
                            </div>
                        </div>
                    </div>

                    <div className='col-md-8'>
                        <h1 style={{color:'#4c4c4c'}}>{nama} &nbsp;{this.state.wishlist ? <Favorite onClick={() => this.setState({wishlist : !this.state.wishlist})} style={{color:'red',fontSize:32, cursor:'pointer'}}/> : <FavoriteBorderOutlined onClick={() => this.setState({wishlist : !this.state.wishlist})} style={{color:'red',fontSize:32, cursor:'pointer'}}/>}</h1>
                        <div style={{backgroundColor:'#D50000', 
                                    width:"50px",
                                    height:'22px',
                                    color:'white',
                                    textAlign:'center',
                                    display: 'inline-block'}}>
                            {discount}%
                        </div>
                        <span style={{fontSize:'12px', 
                                    fontWeight:'600',
                                    color:"#606060", 
                                    marginLeft:'10px',
                                    textDecoration: 'line-through'}}>Rp. {harga} </span>

                        <div style={{fontSize:'24px',
                                    fontWeight:'700',
                                    color:'#FF5722',
                                    marginTop:'20px'}}>Rp. {harga - (harga * (discount/100))}</div>

                        <div className='row'>
                            <div className='col-md-2'>
                                <div style={{marginTop:'15px', fontSize:'16px', fontWeight:'700', color:'#606060'}}>Jumlah</div>
                                <input ref="qty" onChange={(e)=> this.setState({qtyInput: e.target.value})} type="number" min={0} className="form-control" style={{width:'60px', marginTop:'10px'}}/>
                            </div>
                            <div className='col-md-6'>
                                <div style={{marginTop:'15px', fontSize:'16px', fontWeight:'700', color:'#606060'}}>Catatan Untuk Penjual (Opsional)</div>
                                <input type='text' style={{marginTop:'12px'}} placeholder="Contoh: Warna Putih, Ukuran XL" className='form-control'/>
                            </div>
                        </div>
                        <div className='row mt-4'>
                            <div className='col-md-8'>
                                <p style={{color:'#606060', fontStyle:"italic"}}>{deskripsi}
                                </p>
                            </div>
                        </div>
                        
                        {this.props.username === '' ?
                        <div className='row mt-4'>
                            <input disabled type="button"   className='btn border-secondary col-md-2' value="Add To Wishlist"/>
                            <input disabled type="button"  className='btn btn-primary col-md-3' value="Beli Sekarang"/>
                            <input disabled type="button"   className='btn btn-success col-md-3' value="Tambah ke Keranjang"/>
                        </div>
                            :
                        <div className='row mt-4'>
                            <div className="col-md-4">
                                {
                                    this.props.userObj
                                    ?
                                    <input  type="button" onClick={this.addToCart} className='btn btn-success btn-block' value="Tambah ke Keranjang"/>
                                    :
                                    <Link style={{textDecoration:'none'}} to='/auth'><input  type="button"className='btn btn-success btn-block' value="Tambah ke Keranjang"/></Link>
                                }
                            </div>
                        </div>
                        }
                        
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        userObj : state.user.username,
        id : state.user.id
    }
}

export default connect(mapStateToProps, {updateCart})(ProductDetails);