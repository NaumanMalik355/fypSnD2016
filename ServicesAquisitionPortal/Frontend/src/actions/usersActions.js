import { Users_Action } from '../constants/usersActions'

export const AssignRolePrivileges=(RoleName,DistributorId,SelectedPrivilege)=>dispatch=>{
var rolePrivilege={'RoleName':RoleName,'distId':DistributorId,
'selectedPrivileges':SelectedPrivilege}
fetch('https://localhost:5001/api/Privileges/AssignPrivilege', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json;charset=UTF-8' },
        mode: 'cors',
        body: JSON.stringify(rolePrivilege)
    }).then((response) => {
        console.log("required" + response.status)
        //console.log('********'+response.statusText);
        response.json().then(data => {
            //alert(data.userId);
            console.log("data:......" + data.status)
            if (data.assignRolePrivilegesStatus === 'Success') {
                console.log('auth')
                alert(data.rolePrivilegesList.length+"is role privilges list")
               // return dispatch({ type: Payment_Action.SUCCESS });
            }
            else  {
                console.log('not auth')
              //  return dispatch({ type: Payment_Action.FAILED })
            }

        })
    })


}