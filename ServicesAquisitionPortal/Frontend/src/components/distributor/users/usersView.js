import React,{Component} from 'react'
import {Users_Action,Users_Status} from '../../../constants/usersActions'

import ShowUsers from './showUsers'
import CreateUser from './createUsers'
import { connect } from 'react-redux';
import DashboardDis from '../dashboard/dashboard'
const mapStateToProps=state=>({
users_Status:state.users_Reducer.users_status
})
const mapDispatchToProps=(dispatch)=>{
    return{
        createUser:()=>{dispatch({type:Users_Action.NEW})},
        showUser:()=>{dispatch({type:Users_Action.SHOW})},

    }
}
class UsersView extends React.Component{
constructor(props){
    super(props);
    
}



getScreen(status){
    switch (status) {
        case Users_Status.SHOW:
       return     <ShowUsers createUser={this.props.createUser} />
       case Users_Status.NEW:
       return     <CreateUser showUser={this.props.showUser} />
    default:
        
    }
}
render(){
    return(<div><DashboardDis getScreen={this.getScreen(this.props.users_Status)} 
    getAction={this.getAction} /></div>)
}
}

export default connect(mapStateToProps,mapDispatchToProps)(UsersView)