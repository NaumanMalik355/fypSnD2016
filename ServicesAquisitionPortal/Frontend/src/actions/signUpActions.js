import {Payment_Action} from '../constants/paymentActions'
export const signUpDistributor = (disDetail) => dispatch => {
    var distributor = {
        'FirstName': disDetail.FirstName, "LastName": disDetail.LastName, "Email": disDetail.Email, 
        "Contact": disDetail.Contact,"Address": disDetail.Address,"Province":disDetail.Province,
        "City":disDetail.City,"PostalCode":disDetail.PostalCode,"Country":disDetail.Country,
        "StoreName": disDetail.Store,
    }
    fetch('https://localhost:5001/api/Account/DistRegister', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json;charset=UTF-8' },
        mode: 'cors',
        body: JSON.stringify(distributor)
    }).then((response) => {
        console.log("required" + response.status)
        //console.log('********'+response.statusText);
        response.json().then(data => {
            //alert(data.userId);
            console.log("data:......" + data.accountStatus)
            if (data.accountStatus === 'RegisteredSuccess') {
                console.log('auth')
                return dispatch({ type: Payment_Action.SUCCESS });
            }
            else  {
                console.log('not auth')
                return dispatch({ type: Payment_Action.FAILED })
            }

        })
    })


}