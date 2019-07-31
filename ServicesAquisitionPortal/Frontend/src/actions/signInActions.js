import {SignIn_Action} from '../constants/signInActions'
export const login=(username,password)=>dispatch=>{
   
    var user ={'username':username,'password':password}
    
    const postRequest =  fetch('https://localhost:5001/api/Auth/login', {
          method: 'POST',
       headers: {'Content-Type':'application/json;charset=UTF-8'},
      mode: 'cors',
     body:JSON.stringify(user)
     }).then((response)=>{
      console.log(response.status)
    //console.log('********'+response.statusText);
      response.json().then(data=>{
            //alert(data.userId);
        console.log("data:......" + data.signInStatus )
       if(data.signInStatus==='Authorized'){
         console.log('auth')
         return dispatch({type:SignIn_Action.AUTHORIZED});
       }
       else if(data.signInStatus==='Not_Authorized'){
        console.log('not auth')
         return dispatch({type:SignIn_Action.NOTAUTHORIZED})
       }
    
      })
  })
}