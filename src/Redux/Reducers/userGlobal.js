const INTIAL_STATE = {id: 0, username: '', role: '', cookie: false, loading: false, msg: '', showId: false}

export default (state=INTIAL_STATE, action) => {
    switch(action.type) {
        case 'SHOWID':
            return {...state, showId: !state.showId, cookie: true}
        case 'LOADING':
            return {...INTIAL_STATE, loading: true, cookie: true}
        case 'LOGIN_SUCCESS' :
            return {...INTIAL_STATE, username: action.payload.username, role: action.payload.role, id: action.payload.id, cookie: true}
        case 'USERNAME_UDAH_ADA' :
            return {...INTIAL_STATE, msg : action.payload, cookie: true}
        case 'KEEP_LOGIN' :
            return {...INTIAL_STATE, username: action.payload.username, role: action.payload.role, id: action.payload.id, cookie: true}
        case 'RESET' :
            return {...INTIAL_STATE, cookie: true}
        case 'COOKIE' :
                return {...state, cookie: true}
        default:
            return state
    }
}