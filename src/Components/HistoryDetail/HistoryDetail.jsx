import React, {Component} from 'react'
import Axios from 'axios';
import { urlApi } from '../../helper/database';
import {Link, Redirect} from 'react-router-dom'
import {connect} from 'react-redux'

class HistoryDetail extends Component {
    state = {
        history : {},
        item:[]
    }

    componentDidMount(){
        this.getHistoryDetails()
    }
    
    getHistoryDetails = () => {
        Axios.get(urlApi + 'history/' + this.props.match.params.id)
        .then((res)=>{
            console.log(res);
            this.setState({history: res.data, item: res.data.items})
        })
        .catch((err)=>{
            console.log(err);          
        })
    }

    renderProductDetail = () => {
        var jsx = this.state.item.map((val,idx)=>{
            return(
                <tr>
                    <td>{idx+1}</td>
                    <td><img src={val.img} alt="grb" width="80px"/></td>
                    <td>{val.productName}</td>
                    <td>{val.discount}</td>
                    <td>{val.price - (val.price * (val.discount/100))}</td>
                    <td>{val.quantity}</td>
                    <td>{(val.price - (val.price*(val.discount/100)))*val.quantity}</td>
                    
                </tr>
            )
        })
        return jsx
    }

    totalQty = () => {
        var jsx = this.state.item
        var hasil = 0

        for(let i = 0; i < jsx.length; i++){
            hasil += parseInt(jsx[i].quantity)
        }
        return hasil
    }

    render(){
        if (this.props.username == '') {
            return <Redirect to="/" exact/>
        }
        return(
            <div className="container">
                <div className="row justify-content-center mt-3">
                    <div className="col-6">
                        <div className="card">
                            <div className="card-header">
                                <h4>Detail : {this.state.history.time}</h4>
                            </div>
                            <div className="card-body">
                                <ul class="list-group list-group-flush">
                                    <li class="list-group-item">Penerima : {this.state.history.recipient}</li>
                                    <li class="list-group-item">Alamat : {this.state.history.address}</li>
                                    <li class="list-group-item">Kode Pos : {this.state.history.postalCode}</li>
                                    <li class="list-group-item">Total Harga : Rp {this.state.history.totalPrice}</li>
                                </ul>
                            </div>
                        </div>
                    </div>

                </div>
                <table className="table mt-3 text-center">
                    <thead className="thead-dark">
                        <tr>
                            <th>No</th>
                            <th>Image</th>
                            <th>Product Name</th>
                            <th>Discount</th>
                            <th>Price</th>
                            <th>Quantity</th>
                            <th>Total Price</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.renderProductDetail()}
                    </tbody>
                    <tfoot>
                        <tr>
                            <td><Link style={{textDecoration:'none', color:'inherit'}} to='/history'><input className="btn btn-dark btn-block" type="button" value="BACK"/></Link></td>
                            <td colSpan="4"><h5>Total</h5></td>
                            <td><h5>{this.totalQty()}</h5></td>
                            <td><h5>Rp{this.state.history.totalPrice}</h5></td>
                        </tr>
                    </tfoot>
                </table>

            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        id : state.user.id,
        username : state.user.username
    }
}

export default connect(mapStateToProps)(HistoryDetail)