import {SignIn_Action} from '../constants/signInActions'
export const login=(username,password)=>dispatch=>{
   
    var user ={'Email':username,'Password':password}
    
    const postRequest =  fetch('https://localhost:5001/api/Account/Login', {
          method: 'POST',
       headers: {'Content-Type':'application/json;charset=UTF-8'},
      mode: 'cors',
     body:JSON.stringify(user)
     }).then((response)=>{
      console.log("required"+response.status)
    //console.log('********'+response.statusText);
      response.json().then(data=>{
            //alert(data.userId);
        console.log("data:......" + data.signInStatus )
       if(data.signInStatus==='Authorized'){
         console.log('auth')
         alert('id is'+data.userId);
         return dispatch({type:SignIn_Action.AUTHORIZED,userId:data.userId});
       }
       else if(data.signInStatus==='Not_Authorized'){
        console.log('not auth')
         return dispatch({type:SignIn_Action.NOTAUTHORIZED})
       }
    
      })
  })
}