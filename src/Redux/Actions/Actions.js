import Axios from 'axios'
import { urlApi } from '../../helper/database';


export const onLogin = (userObject) => {
    return(dispatch) => {
        dispatch({
            type: 'LOADING'
        })
        Axios.get(urlApi + 'users', {
            params : {
                username : userObject.username,
                password : userObject.password,
    
            }
        })
        .then((res) => {
            if(res.data.length > 0) {
                dispatch({
                    type : 'LOGIN_SUCCESS',
                    payload : {
                        username : res.data[0].username,
                        role : res.data[0].role,
                        id : res.data[0].id
                    }
                })
               
            }
        })
        .catch((err)=>{
            console.log(err);
            
        })
    }

}

export const onRegister = (userObject) => {
    return (dispatch) => {
        dispatch({
            type: 'LOADING'
        })
        Axios.get(urlApi + 'users', {
            params: {
                username: userObject.username
            }
        })
        .then((res)=> {
            if(res.data.length > 0){
                dispatch({
                    type : 'USERNAME_UDAH_ADA',
                    payload : 'Username Taken'
                })
            } else {
                userObject.role = 'user'
                Axios.post(urlApi + 'users', userObject)
                .then((res)=>{
                    console.log(res.data);
                    dispatch({
                        type : 'LOGIN_SUCCESS',
                        payload : {
                            username : res.data.username,
                            role : res.data.role,
                            id : res.data.id,
                        }

                    })
                    
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
}

export const keepLogin = (cookieData, id) => {
    return (dispatch) => {
        Axios.all([
            Axios.get(urlApi + 'users', {
                params: {
                    username : cookieData
                }
            }),
            Axios.get(urlApi + 'cart?userId=' + id)
        ])
        .then(([cookieArr, cartArr])=> {
            console.log(cookieArr, cartArr, id);
            dispatch({
                type: 'KEEP_LOGIN',
                payload: {
                    username : cookieArr.data[0].username,
                    role : cookieArr.data[0].role,
                    id : cookieArr.data[0].id,   
                    cartAction: cartArr.data.length          
                }
                
            })
            
        })
        .catch((err)=>{
            console.log(err);
            
        })
    }

} 

export const resetUser = () => {
    return (dispatch) => {
        dispatch({
            type: 'RESET'
        })
    }
}

export const showId = () =>{
    return (dispatch) => {
        dispatch({
            type: 'SHOWID'
        })
    }
}

export const cookieChecker = () =>{
    return (dispatch) => {
        dispatch({
            type: 'COOKIE'
        })
    }
}

export const updateCart = (id) => {
    return (dispatch) => {
        Axios.get(urlApi + 'cart?userId=' + id)
        .then(res=>{
            dispatch({
                type: 'UPDATE',
                payload: {
                    cartAction: res.data.length
                }
            })
        })
        .catch(err=>{
            console.log(err);
            
        })
    }

}


