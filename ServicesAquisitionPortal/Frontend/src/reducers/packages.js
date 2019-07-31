import {Packages_Action,Packages_Status} from '../constants/packagesActions'
//import {fetchPackage} from '../actions/packagesActions'
const initialState={
    packages_status:Packages_Status.SHOW,
    packagesList:[]
}

export default function(state=initialState,action){
    switch (action.type) {
        case Packages_Action.NEW:
        return {...state,packages_status:Packages_Status.NEW}
        case Packages_Action.LOADSHOW:
       //  props.fetchPackage();
       return {...state,packages_status:Packages_Status.LOADSHOW}
        case Packages_Action.SHOW:
    //    alert('in show reducer')
        return {...state,packages_status:Packages_Status.SHOW,packagesList:action.packageList}
        case Packages_Action.SUCCESS:
        return {...state,packages_status:Packages_Status.SUCCESS}
           
    
        default:
        return {...state}
            
    }
}