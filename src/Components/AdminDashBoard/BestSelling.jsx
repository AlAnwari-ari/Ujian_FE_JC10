import React, { Component } from 'react';
import './AdminDashboard.css'
import Axios from 'axios';
import { urlApi } from '../../helper/database';

class BestSelling extends Component {
    state = {
        data : []
    }

    componentDidMount(){
        this.getdataHistory()
    }
    
    getdataHistory = () => {
        Axios.get(urlApi + 'history')
        .then(res=>{
            console.log(res);
            this.setState({data: res.data})
            
        })
        .catch(err=>{
            console.log(err);
            
        })    
    }

    renderIncome = () => {
        var hasil = 0
        for (let i = 0; i < this.state.data.length; i++){
            hasil += this.state.data[i].totalPrice
        }

        return hasil
    }



    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <div className="card shadow mt-3">
                            <div className="card-header border-0 pt-5">
                                <h5>Total Income</h5>
                            </div>
                            <div className="card-body">
                                <p>Total pendapatan dari user belanja adalah Rp{new Intl.NumberFormat('id-ID').format(this.renderIncome())}</p>
                                
                            </div>
                            <div className="card-footer align-items-center">
                                <p>Pendapatan dihitung dari {this.state.data.length} transaksi yang berhasil</p>

                                
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default BestSelling;