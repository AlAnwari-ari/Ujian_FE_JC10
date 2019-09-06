const cartGlobal = {cartLength: 0}

export default (state=cartGlobal, action) => {
    switch(action.type) {
        case 'KEEP_LOGIN' :
            return {...cartGlobal, cartLength:action.payload.cartAction}
        case 'UPDATE' :
            return {...state, cartLength:action.payload.cartAction}
        default:
            return state
    }
}