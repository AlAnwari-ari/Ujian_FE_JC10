import React, {Component} from  'react'
import Axios from 'axios';
import {connect} from 'react-redux'
import './Cart.css'
import { urlApi } from '../../helper/database';
import swal from 'sweetalert';
import { updateCart } from '../../Redux/Actions';
import {Redirect, Link} from 'react-router-dom'





class Cart extends Component {
    state = {
        cartData : [],
        checkOut : false,
        inputPenerima: '',
        inputKodePos: '',
        inputAlamat: '',
        inputUang: 0
    }

    componentWillReceiveProps(newProps){
        this.getDataCart(newProps.id)

    }

    componentDidMount(){
        this.getDataCart(this.props.id)
        
    }

    componentDidUpdate(){
        this.props.updateCart(this.props.id)
        console.log('apa');
        
             
    }

    deleteCartItem= (id) =>{
        Axios.delete(urlApi + 'cart/' + id)
        .then((res)=>{
            swal('Deleted Success', `Ayo belanja lagi (delete)`,'success')
            this.getDataCart(this.props.id)
        })
        .catch((err)=>{
            console.log(err);
            
        })
    }

    getDataCart = (id) => {
        Axios.get(urlApi + 'cart?userId=' + id)
        .then((res)=>{
            this.setState({cartData : res.data})
            
        })
        .catch(err=>{
            console.log(err);
            
        })
    }



    renderCart = () => {
        var carts = this.state.cartData.map((val, idx)=>{
            return(
                <tr>
                    <td>{val.productName}</td>
                    <td>{val.price - (val.price * (val.discount/100))}</td>
                    <td><div className="btn-group">
                        <button type="button" className="btn btn-secondary" onClick={()=> this.onBtnQty('min', idx)}>-</button>
                        <button type="button" className="btn btn-secondary">{val.quantity}</button>
                        <button type="button" className="btn btn-secondary" onClick={()=> this.onBtnQty('add', idx)}>+</button>
                        </div></td>
                    <td>{(val.price - (val.price*(val.discount/100)))*val.quantity}</td>
                    <td><input type="button" value="DELETE" className="btn btn-danger" onClick={()=> this.deleteCartItem(val.id)}/></td>
                </tr>
            )
        })
        return carts
    }

    renderTotalHarga = () => {
        var totalHarga = 0
        this.state.cartData.map(val=>{
            totalHarga += (val.price - (val.price*(val.discount/100)))*val.quantity
            
        })

        return totalHarga
    }

    renderTotalQty = () => {
        var totalQty = 0
        this.state.cartData.map(val=>{
            totalQty += val.quantity
            
        })

        return totalQty
    }

    onBtnQty = (action, idx) => {
        let arrCart = this.state.cartData

        if(action == 'min'){
            if(arrCart[idx].quantity > 1){
                arrCart[idx].quantity -= 1
                Axios.put(urlApi + 'cart/' + arrCart[idx].id, arrCart[idx])
                .then(res => this.getDataCart(this.props.id))
                .catch(err=> console.log(err));
                
            }

        } else if(action == 'add') {
            arrCart[idx].quantity += 1
            Axios.put(urlApi + 'cart/' + arrCart[idx].id, arrCart[idx])
            .then(res => this.getDataCart(this.props.id))
            .catch(err=> console.log(err));

        }

    }

    onBtnCheckOut = () => {
        let totalPrice = this.renderTotalHarga()
        let d = new Date()
        let today = `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`
        let items = this.state.cartData
        let kembalian = parseInt(this.state.inputUang) - parseInt(totalPrice)
        let newData = {
            userId : this.props.id,
            items,
            time : today,
            totalPrice,
            recipient : this.state.inputPenerima,
            address : this.state.inputAlamat,
            postalCode : this.state.inputKodePos
        }

        if (kembalian > 0){
            Axios.post(urlApi + 'history', newData)
            .then(res=>{
                console.log(res);
            
            })
            .catch(err=>{
                console.log(err);
            
            })

            for (let i = 0; i < this.state.cartData.length; i++){
                Axios.delete(urlApi + 'cart/' + this.state.cartData[i].id)
                .then(res=>{
                    console.log(res)
                    this.getDataCart(this.props.id)
                    
                    
                })
                .catch(err=>{
                    console.log(err)
                    
                })
            }

            this.setState({checkOut: true})
            swal('Thank you', `Kembalian kamu= Rp${kembalian}`,'success')

        } else if (kembalian == 0) {
            Axios.post(urlApi + 'history', newData)
            .then(res=>{
                console.log(res);
            
            })
            .catch(err=>{
                console.log(err);
            
            })
            
            for(let i = 0; i < this.state.cartData.length; i++){
                Axios.delete(urlApi + 'cart/' + this.state.cartData[i].id)
                .then(res=>{
                    console.log(res)
                    this.getDataCart(this.props.id)
                    
                })
                .catch(err=>{
                    console.log(err)
                    
                })
            }
            
            this.setState({checkOut: true})        
            swal('Thank you', `Uang anda pas`,'success')

        } else {
            swal('Perhatian!', `Uang anda kurang Rp${parseInt(totalPrice) - parseInt(this.state.inputUang)}`,'warning')

        }

    }

    checkOutHandler = () => {
        if (this.renderTotalHarga() > 0){
            this.setState({checkOut: !this.state.checkOut})
        } else {
            this.setState({checkOut: false})
        }
    }

    render(){
        if (this.props.username == '') {
            return <Redirect to="/" exact/>
        } else {
            if (this.state.cartData.length > 0){
                return (
                    <div className="container">
                        <table className="table mt-3 text-center">
                            <thead className="thead-dark">
                                <tr>
                                    <th>Name</th>
                                    <th>Price</th>
                                    <th>Quantity</th>
                                    <th>Total Price</th>
                                    <th>Delete</th>
                                </tr>
                            </thead>
        
                            <tbody>
                                {this.renderCart()}
        
                            </tbody>
                        </table>
        
                        <div className="row justify-content-center">
                            <div className="col-6">
                                <div className="card mt-3">
                                    <div className="bg-dark card-header payment" onClick={this.checkOutHandler}>
                                        <div className="row text-center text-white">
                                            <div className="col-5 align-self-center">
                                                <h5>CheckOut Box</h5> 
                                            </div>
                                            <div className="col-1 align-self-center">
                                                <h5>|</h5>
                                            </div>
                                            <div className="col-6 align-item-center">
                                                <h5>Total Harga= Rp{this.renderTotalHarga()}</h5>
                                            </div>
                                        </div>
                                    </div>
                                    {
                                        this.state.checkOut
                                        ?
                                        <>
                                        <div className="card-body">
                                            <input type="text" placeholder="Nama Penerima" className="form-control" onChange={(e)=> this.setState({inputPenerima: e.target.value})}/>
                                            <input type="text" placeholder="Alamat" className="form-control mt-2" onChange={(e)=> this.setState({inputAlamat: e.target.value})}/>
                                            <input type="text" placeholder="KodePos" className="form-control mt-2" onChange={(e)=> this.setState({inputKodePos: e.target.value})}/>
                                        </div>
                                        <div className="card-footer">
                                            <div className="row">
                                                <div className="col-6">
                                                    <input type="text" placeholder="Uang Anda" className="form-control" onChange={(e)=> this.setState({inputUang: e.target.value})}/>
        
                                                </div>
                                                <div className="col-6">
                                                    <input type="button" value="PAY" className="btn btn-secondary btn-block" onClick={this.onBtnCheckOut}/>
                                                </div>
                                            </div>
                                        </div>
                                        </>
                                        :
                                        null
        
                                    }
                                </div>
                            </div>
                        </div>
        
                    </div>
                )

            } else {
                return (
                    <div className="container mt-5">
                        <div className="alert alert-danger text-center"><h4>Cart Anda Kosong, Let's <Link to='/' style={{color:'green'}}>Go Shopping</Link></h4></div>
                    </div>
                )
            }
        }
    }
}

const mapStateToProps = (state) => {
    return {
        id : state.user.id,
        username: state.user.username
    
    }
}

export default connect(mapStateToProps, {updateCart})(Cart) 