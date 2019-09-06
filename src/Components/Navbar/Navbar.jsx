import React from 'react'
import './Navbar.css'
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem } from 'reactstrap';

import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import Cookie from 'universal-cookie'
import { resetUser } from '../../Redux/Actions';



let cookieObj = new Cookie()

class NavbarComp extends React.Component{
    state = {
        navbarOpen : false,

    }

    onBtnLogout = () => {
        cookieObj.remove('userData')
        cookieObj.remove('userCart')
        this.props.resetUser()
        
    }

    render(){
        return(
            <div>
                <Navbar className="kotak" light expand="md">
                    <Link to="/"><NavbarBrand className="text-white"><i class="fa fa-heart" aria-hidden="true"></i> Ungupedia</NavbarBrand></Link>
                    <NavbarToggler onClick={() => this.setState({navbarOpen: !this.state.navbarOpen})}/>
                     <Collapse navbar>
                         <Nav className="ml-auto" navbar>
                            {
                                this.props.userObj.username !== '' && this.props.userObj.role !== ''
                                ?
                                <>
                                    <NavItem>
                                        <NavLink className="text-white">Cart {this.props.cart}</NavLink>
                                    </NavItem>
                                    <NavItem>
                                        <NavLink className="text-white">{
                                            this.props.tampil
                                            ?
                                            this.props.userObj.id
                                            :
                                            null
                                        }</NavLink>
                                    </NavItem>
                                    <NavItem>
                                        <NavLink className="text-white"><i class="fa fa-user" aria-hidden="true"></i> {this.props.userObj.username}</NavLink>
                                    </NavItem>
                                    <NavItem>
                                        <NavLink className="text-white">{this.props.userObj.role}</NavLink>
                                    </NavItem>
                                    <UncontrolledDropdown nav inNavbar>
                                        <DropdownToggle nav caret className="text-white">
                                            Options
                                        </DropdownToggle>
                                        <DropdownMenu right className="sub">
                                            {
                                                this.props.userObj.role == 'admin'
                                                ?
                                                <Link style={{textDecoration:'none', color:'inherit'}} to="/admin/admindashboard">
                                                    <div className="pinggir1"><DropdownItem className="submenu" >
                                                        Admin Dashboard
                                                    </DropdownItem></div>
                                                </Link>
                                                :
                                                    <div className="pinggir1"><DropdownItem className="submenu" >
                                                        <i class="fa fa-user" aria-hidden="true"></i> Profile
                                                    </DropdownItem></div>
                                            }
                                            <Link to='/cart' style={{textDecoration:'none', color:'inherit'}}><div className="pinggir2"><DropdownItem className="submenu">
                                            <i class="fa fa-shopping-cart" aria-hidden="true"></i> Cart
                                            </DropdownItem></div></Link>
                                            <Link to='/history' style={{textDecoration:'none', color:'inherit'}}><div className="pinggir3"><DropdownItem className="submenu">
                                            <i class="fa fa-history" aria-hidden="true"></i> History
                                            </DropdownItem></div></Link>
                                            <DropdownItem divider/>
                                            <Link to='/' style={{textDecoration:'none', color:'inherit'}}><div className="pinggir4" onClick={this.onBtnLogout}><DropdownItem className="submenu">
                                            <i class="fa fa-sign-out" aria-hidden="true"></i> Logout
                                            </DropdownItem></div></Link>
                                        </DropdownMenu>
                                    </UncontrolledDropdown>
                                </>   
                                :
                                <>
                                    <NavItem>
                                        <NavLink><Link to='/auth' className="text-white"><i class="fa fa-user-plus" aria-hidden="true"></i> Register</Link></NavLink>
                                    </NavItem>
                                    <NavItem>
                                        <NavLink><Link to='/auth' className="text-white"><i class="fa fa-sign-in" aria-hidden="true"></i> Login</Link></NavLink>
                                    </NavItem>
                                </>       
                            }

                         </Nav>
                    </Collapse>

                </Navbar>

            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        userObj : state.user,
        tampil: state.user.showId,
        cart: state.cart.cartLength
    }
}

export default connect(mapStateToProps, {resetUser})(NavbarComp) 