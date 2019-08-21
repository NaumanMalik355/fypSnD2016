import {Users_Action,Users_Status} from '../constants/usersActions'
const initialState={
    users_status:Users_Status.SHOW
}
export default function(state=initialState,action){
    switch (action.type) {
        case Users_Action.NEW:
        return {...state,users_status:Users_Status.NEW}
        case Users_Action.SHOW:
        return {...state,users_status:Users_Status.SHOW}
        case Users_Action.SUCCESS:
        return {...state,users_status:Users_Status.SUCCESS}
        case Users_Action.LOADNEW:
       // alert('in new load')
        return {...state,users_status:Users_Status.NEW}
        case Users_Action.LOADSHOW:
        return {...state,users_status:Users_Status.SHOW}
        case Users_Action.NEWRole:case Users_Action.LOADNEWRole:
        return {...state,users_status:Users_Status.NEWRole}
        case Users_Action.SHOWROLE: case Users_Action.LOADSHOWROLE:
        return {...state,users_status:Users_Status.SHOWROLE}
        default:
        return {...state}
           
    }
}