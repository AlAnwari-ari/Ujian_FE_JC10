import React, {Component} from 'react';
import {withRouter, Route, Switch} from 'react-router-dom'
import Home from './Components/Home/Home';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/font-awesome/css/font-awesome.min.css';
import NavbarComp from './Components/Navbar/Navbar';
import Register from './Components/Register/Register';
import Auth from './Components/Auth/Auth';
import Cookie from 'universal-cookie'
import {connect} from 'react-redux'
import { keepLogin, cookieChecker } from './Redux/Actions';
import ProductDetails from './Components/ProductDetail/ProductDetail';
import Cart from './Components/Cart/Cart';
import AdminDashboard from './Components/AdminDashBoard/AdminDashboard';
import History from './Components/History/History';
import HistoryDetail from './Components/HistoryDetail/HistoryDetail';



let cookieObj = new Cookie()


class App extends Component {
  
  componentDidMount(){
    let cookieVar = cookieObj.get('userData')
    let cookieUserId = cookieObj.get('userId')
    if (cookieVar) {
      this.props.keepLogin(cookieVar, cookieUserId)
    } else {
      this.props.cookieChecker()
    }
  }

  

  render(){
    if(this.props.globalCookie){

      return (
        <div>
          <NavbarComp />
          <Switch>
            <Route component={Home} path='/' exact/>
            <Route component={Auth} path='/auth' exact/>
            <Route component={Register} path='/register' exact />
            <Route component={ProductDetails} path='/product-details/:id' exact/>
            <Route component={Cart} path='/cart' exact/>
            <Route component={AdminDashboard} path='/admin/admindashboard' exact/>
            <Route component={History} path='/history' exact/>
            <Route component={HistoryDetail} path='/history/:id'/>
            
          </Switch>
          
        </div>
      );
    }
    return <div>Loading...</div>
  }
}

const mapStateToProps = (state) => {
  return {
    globalCookie : state.user.cookie,
    id: state.user.id
  }
}

export default connect(mapStateToProps, {keepLogin, cookieChecker})(withRouter(App)) ;
