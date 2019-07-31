import React,{Component} from 'react'
import {Packages_Action,Packages_Status} from '../../../constants/packagesActions'
import CreatePackage from './createPackage'
import ShowPackages from './showPackage'
import { connect } from 'react-redux';
import Dashboard from '../dashboard/dashboard'
import {PostPackage,fetchPackage} from '../../../actions/packagesActions'
const mapStateToProps=state=>({
packages_Status:state.packages_Reducer.packages_status,
packagelist:state.packages_Reducer.packagesList
})
const mapDispatchToProps=(dispatch)=>{
    return{
        PostPackage : (packageName, price, totalusers, providedStorage, duration)=>
        {dispatch(PostPackage  (packageName, price, totalusers, providedStorage, duration))},
        fetchPackage:()=>{dispatch(fetchPackage())},
        CreatePackage:()=>{dispatch({type:Packages_Action.NEW})},

    }
}
class PackagesView extends React.Component{
constructor(props){
    super(props);
}
componentDidMount(){
   // alert(this.props.packages_Status)
    if(this.props.packages_Status==='LOAD_SHOW'){
        this.props.fetchPackage();
    }
}
getScreen(status){
    switch (status) {
        
        case Packages_Status.SHOW:
       // alert(this.props.packagelist.length+"in child")
       return     <ShowPackages 
       packagelist={this.props.packagelist}  createPackage={this.props.CreatePackage}/>
       case Packages_Status.NEW:
       return     <CreatePackage 
       fetchPackage={this.props.fetchPackage} PostPackage={this.props.PostPackage}/>
    default:
        
    }
}
render(){
    return(<div><Dashboard getScreen={this.getScreen(this.props.packages_Status)} /></div>)
}
}

export default connect(mapStateToProps,mapDispatchToProps)(PackagesView)