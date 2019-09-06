import React, {Component} from 'react'
import './Auth.css'
import { onLogin, onRegister } from '../../Redux/Actions';
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import Cookie from 'universal-cookie'
import swal from 'sweetalert';

let cookieObj = new Cookie()

class Auth extends Component {
    state = {
        page: 'LOGIN',
        registerUsername: '',
        registerPassword: '',
        repeatPassword: '',
        registerEmail: '',
        loginUsername: '',
        loginPassword: '',
        isSame: true
    }

    componentWillReceiveProps(newProps){
        cookieObj.set('userData', newProps.username, {path : '/'})
        cookieObj.set('userId', newProps.id, {path : '/'})
    }
    

    onLoginBtnHandler = () => {
        let loginObj = {
            username : this.state.loginUsername,
            password : this.state.loginPassword,
        }

        this.props.onLogin(loginObj)
        
    }

    onRegisterBtnHandler = () => {
        if(this.state.registerEmail && this.state.registerPassword && this.state.repeatPassword && this.state.registerUsername){
            if (this.state.repeatPassword !== this.state.registerPassword || (this.state.repeatPassword == '' && this.state.registerPassword == '')){
                this.setState({isSame : false})
            } else {
                let registerObj = {
                    username : this.state.registerUsername,
                    password : this.state.repeatPassword,
                    email: this.state.registerEmail
                }
        
                this.props.onRegister(registerObj)       
            }
            
        } else {
            swal('input')
        }
    }

    passwordChecker = () => {
        if(!this.state.isSame){
            return(
                <div className="alert alert-danger">Password belom sama</div>
            )
        }
    }


    render(){
        if (this.props.username) {
            return <Redirect to="/" exact/>
        }
        return(
            <div className="container auth">
                {
                    this.props.massage
                    ?
                    <h3>{this.props.massage}</h3>
                    :
                    null
                }
                <div className="row">
                    <div className="col-3 text-center auth-left">
                        <h1>Welcome!</h1>
                        <p>Belanja di Ungupedia pake dengkul, anti wacana club!</p>
                        <div className={"box-left d-inline-block m-1 " + (this.state.page == "LOGIN" ? "active" : '') } onClick={()=> this.setState({page: 'LOGIN'})}>Login</div>
                        <div className={"box-right d-inline-block m-1 " + (this.state.page == "REGISTER" ? "active" : '') } onClick={()=> this.setState({page: 'REGISTER'})}>Register</div>
                        
                    </div>
                    <div className="col-9 auth-right text-center pb-5">
                        {
                            this.state.page == "REGISTER"
                            ?
                            <div className="container-fluid ">
                                <h3 className="pb-3" style={{color:'#495057', marginTop:'8%'}}>Register Now!</h3>
                                <div className="row">
                                    <div className="col-6">
                                        <div className="form-group">
                                            <input type="text" className="form-control" placeholder="Username" onChange={(e)=> this.setState({registerUsername: e.target.value})}/>
                                        </div>
                                    </div>
                                    <div className="col-6">
                                        <div className="form-group">
                                            <input type="text" className="form-control" placeholder="Email" onChange={(e)=> this.setState({registerEmail: e.target.value})}/>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-6">
                                        <div className="form-group">
                                            <input type="password" className="form-control" placeholder="Password" onChange={(e)=> this.setState({registerPassword: e.target.value})}/>
                                        </div>
                                    </div>
                                    <div className="col-6">
                                        <div className="form-group">
                                            <input type="password" className="form-control" placeholder="Repeat Password" onChange={(e)=> this.setState({repeatPassword: e.target.value})}/>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-8">
                                        {this.passwordChecker()}

                                    </div>
                                    <div className="col-4">
                                        {
                                            !this.props.loading
                                            ?
                                            <input type="button" className="btn float-right btn-register" value="Register" onClick={this.onRegisterBtnHandler}/>
                                            :
                                            <div className="spinner-border text-primary">
                                                <span className="sr-only">Loading...</span>
                                            </div>
                                        }
                                    </div>
                                </div>                           
                            </div>
                            :
                            <div className="container-fluid ">
                                <h3 className="pb-3" style={{color:'#495057', marginTop:'8%'}}>Login</h3>
                                <div className="row">
                                    <div className="col-6">
                                        <div className="form-group">
                                            <input type="text" className="form-control" placeholder="Username" onChange={e => this.setState({loginUsername: e.target.value})}/>
                                        </div>
                                    </div>
                                    <div className="col-6">
                                        <div className="form-group">
                                            <input type="password" className="form-control" placeholder="Password" onChange={e => this.setState({loginPassword: e.target.value})}/>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-12">
                                        {
                                            !this.props.loading
                                            ?
                                            <input type="button" className="btn float-right btn-register" value="Login" onClick={this.onLoginBtnHandler}/>
                                            :
                                            <div className="spinner-border text-primary">
                                                <span className="sr-only">Loading...</span>
                                            </div>
                                        }
                                    </div>
                                </div>                                
                            </div>

                        }

                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        loading : state.user.loading,
        massage : state.user.msg,
        username: state.user.username,
        id: state.user.id
    }
}

export default connect(mapStateToProps, {onLogin, onRegister})(Auth) 