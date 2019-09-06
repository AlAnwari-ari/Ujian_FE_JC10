import React, { Component } from 'react';
import './AdminDashboard.css'
import Axios from 'axios';
import { urlApi } from '../../helper/database';
import {Link} from 'react-router-dom'


class ParaSultan extends Component {
    state = {
        userData: {},
        allData: [],
        data : {},
        totalPrice : [],
        
    }

    componentDidMount(){
        this.getDataSultan()
        
        
    }
    

    getDataSultan = () => {
        Axios.get(urlApi + 'history')
        .then(res=>{
            console.log(res.data);
            this.setState({allData: res.data})
            var tampung = []

            for (let i = 0; i < res.data.length; i++){
                tampung[i] = parseInt(this.state.allData[i].totalPrice)
              
            }
            this.setState({totalPrice: Math.max(...tampung)})

            let index = tampung.indexOf(Math.max(...tampung))
            this.setState({data: res.data[index]})

            Axios.get(urlApi + 'users/' + res.data[index].userId)
            .then(res=>{
            console.log(res.data);
            this.setState({userData: res.data})
                      
            })
            .catch(err=>{
            console.log(err);
            
        })

            
                      
        })
        .catch(err=>{
            console.log(err);
            
        })

    }



    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <div className="card shadow mt-3">
                            <div className="card-header border-0 pt-5">
                                <h4>The Most Sultan User is {this.state.userData.username}</h4>
                            </div>
                            <div className="card-body">
                                <p>Total Belanjaan tertinggi adalah Rp{new Intl.NumberFormat('id-ID').format(this.state.totalPrice)}</p>
                                
                            </div>
                            <div className="card-footer align-items-center">
                                <p>Ayo <Link to='/'>Kalahkan {this.state.userData.username}!</Link></p>
                                
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default ParaSultan;