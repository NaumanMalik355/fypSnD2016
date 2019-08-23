import React,{Component} from 'react'
import {Users_Action,Users_Status} from '../../../constants/usersActions'

import CreateRole from './createRole'
import ShowRole from './showRoles'
import { connect } from 'react-redux';
import DashboardDis from '../dashboard/dashboard'
import {AssignRolePrivileges} from '../../../actions/usersActions'
const mapStateToProps=state=>({
users_Status:state.users_Reducer.users_status
})
const mapDispatchToProps=(dispatch)=>{
    return{
        createRole:()=>{dispatch({type:Users_Action.NEWRole})},
        showRole:()=>{dispatch({type:Users_Action.SHOWROLE})},
        AssignRolePrivileges:(RoleName,DistributorId,SelectedPrivilege)=>
        dispatch(AssignRolePrivileges(RoleName,DistributorId,SelectedPrivilege))
    }
}
class RolesView extends React.Component{
constructor(props){
    super(props);
    
}



getScreen(status){
    switch (status) {
        case Users_Status.NEWRole:
     //   alert(+"userId in roleview")
       return     <CreateRole  showRole={this.props.showRole} 
       AssignRolePrivileges={this.props.AssignRolePrivileges}
       userId={this.props.match.params.userId} />
       case Users_Status.SHOWROLE:
       return     <ShowRole createRole={this.props.createRole} />
    default:
        
    }
}
render(){
    return(<div><DashboardDis getScreen={this.getScreen(this.props.users_Status)} 
    getAction={this.getAction} /></div>)
}
}

export default connect(mapStateToProps,mapDispatchToProps)(RolesView)