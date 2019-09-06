import React, {Component} from 'react'
import './Home.css'
import {connect} from 'react-redux'
import Axios from 'axios';
import { urlApi } from '../../helper/database';
import Product from '../ProductsData/productData';
import { showId, updateCart } from '../../Redux/Actions';



class Home extends Component {
    state = {
        productsData: []
    }

    componentDidMount() {
        this.getProductsData()
        this.props.updateCart(this.props.id)

    }

    getProductsData = () => {
        Axios.get (urlApi + 'products')
        .then((res) => {
            console.log(res)
            this.setState({productsData: res.data})
        })
        .catch((err)=>{
            console.log(err);
        })
    }

    show = () => {
        this.props.showId()
    }

    renderProducts = () => {
        var products = this.state.productsData.map(val => {
            return(
                <Product name={val.nama} price={val.harga} discount={val.discount} image={val.img} productId={val.id}></Product>
            )
        })

        return products
    }

    render() {
        return(
            <div>
                <div className="container">
                    <div className="row">
                        <div className="col-lg-3 mt-4">
                            <div className="input-group mb-2">
                                <input type="text" ref="searchBook" className="form-control" placeholder="Masukkan kata kunci ... "  />
                                <div className="input-group-append">
                                    <button className="btn-cari btn text-white" type="button" id="button-addon2" onClick={this.show}>Go</button>
                                </div>
                            </div> 
                            <div className="card p-2">
                                
                                <form ref="formFilter" style={{boxShadow:"none", fontSize:"14px"}}>
                                    <div className="judul form-label col-sm-6 text-left font-weight-bold pl-1 text-secondary">Cari Produk</div>
                                    <input className="form-control form-control-sm mb-2" placeholder="Cari Produk"></input>
                                    
                                    <div className="form-label col-sm-6 text-left font-weight-bold pl-1 text-secondary mb-1">Cari Toko</div>
                                    <input className="form-control form-control-sm mb-2" placeholder="Cari Toko"></input>
                                    
                                    <div className="form-label col-sm-6 text-left font-weight-bold pl-1 text-secondary mb-1">Cari User</div>
                                    <input className="form-control form-control-sm mb-2" placeholder="Cari User"></input> 

                                    <button className="btn btn-cari text-white">Filter</button>                               
                                </form>

                            </div>
                            
                        </div>
                        <div className="col-lg-9 mt-4">
                            {
                                this.props.username ? <h3>Welcome, {this.props.username}</h3> : null
                            }
                        </div>
                        {/* korsel */}
                    </div>
                    <div className="row justify-content-center">
                        {this.renderProducts()}
                    </div>

                    
                    
                    
                </div>
            </div>
        )
    }
}

export default connect(state => {
    return {
        username: state.user.username,
        id: state.user.id
    }
}, {showId, updateCart})(Home) ;