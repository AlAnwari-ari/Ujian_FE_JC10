import React,{Component} from 'react'
import Axios from 'axios';
import { urlApi } from '../../helper/database';
import {connect} from 'react-redux'
import {Link, Redirect} from 'react-router-dom'


class History extends Component {
    state = {
        historyData: [],
        details: false,

    }

    componentWillReceiveProps(newProps){
        this.getDataHistory(newProps.id)
    }

    componentDidMount(){
        this.getDataHistory(this.props.id)
    }

    getDataHistory = (id) => {
        Axios.get(urlApi + 'history?userId=' + id)
        .then(res=>{
            console.log(res.data)
            this.setState({historyData: res.data})
            
        })
        .catch(err=>{
            console.log(err);
            
        })

    }

    renderDataHistory = () => {
        var historyRender = this.state.historyData.map((val,idx) => {
            return (
                <tr>
                    <td>{idx + 1}</td>
                    <td>{val.time}</td>
                    <td>{val.items.length}</td>
                    <td>Rp{val.totalPrice}</td>
                    <td>{val.address}</td>
                    <td><Link style={{textDecoration:'none', color:'inherit'}} to={'/history/' + val.id}><input type="button" className="btn btn-primary" value="DETAILS"/></Link></td>
                </tr>
            )
        })
        return historyRender
    }

    

    render() {
        if (this.props.username == '') {
            return <Redirect to="/" exact/>
        } else {
            if (this.state.historyData.length > 0){
                return (
                    <div>
                        <div className="container">
                            <div className="row">
                                <div className="col">
                                    <div className="card mt-5">
                                        <div className="card-header text-center">
                                            <h4>History Transaksi</h4>
        
                                        </div>
                                        <div className="card-body">
                                            <table className="table text-center">
                                                <thead className="thead-dark">
                                                    <tr>
                                                        <th>No.</th>
                                                        <th>Tanggal</th>
                                                        <th>Items</th>
                                                        <th>Total Harga</th>
                                                        <th>Alamat</th>
                                                        <th>Details</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {this.renderDataHistory()}
        
                                                </tbody>
        
                                            </table>
        
                                        </div>
        
                                    </div>
                                </div>
        
                            </div>
        
                        </div>
                        
                    </div>
                )

            } else {
                return (
                    <div className="container mt-5">
                        <div className="alert alert-danger text-center"><h4>Anda Belum Memiliki Riwayat Transaksi, Let's <Link to='/' style={{color:'green'}}>Go Shopping</Link> </h4></div>
                    </div>
                )
            }
        }
    }
}

const mapStateToProps = (state) => {
    return {
        id : state.user.id,
        username : state.user.username
    }
}

export default connect(mapStateToProps)(History) 