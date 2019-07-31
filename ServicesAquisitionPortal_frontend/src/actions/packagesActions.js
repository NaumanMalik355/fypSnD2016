import { Packages_Action } from '../constants/packagesActions'

export const PostPackage = (packageName, price, totalusers, providedStorage, duration) => dispatch => {
    var packData = {
        'Name': packageName, 'Price': price, 'Totalusers': totalusers,
        'providedStorage': providedStorage, 'totalDuration': duration
    }
    const postPack = fetch('https://localhost:5001/api/Packages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json;charset=UTF-8' },
        mode: 'cors',
        body: JSON.stringify(packData)
    }).then((response) => {
        console.log(response.status + "response");
        response.json().then(data => {
            //  console.log(data.status+"data")
            console.log(data.packageStatus + data.allPackages.length)
            if (data.packageStatus == 'CreatedSuccess') {
                alert('succes created' + data.allPackages.length)
                return dispatch({ type: Packages_Action.SHOW, packageList: data.allPackages })
            }
            else if (data.packageStatus == 'CreatedFailure') {
                return dispatch({ type: Packages_Action.FAILED })
            }

        })
    })
}


export const fetchPackage = () => dispatch => {
   
    const postPack = fetch('https://localhost:5001/api/Packages', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json;charset=UTF-8' },
        mode: 'cors',
      //  body: JSON.stringify(packData)
    }).then((response) => {
        console.log(response.status + "response");
        response.json().then(data => {
            //  console.log(data.status+"data")
            console.log(data.packageStatus + data.allPackages.length)
            if (data.packageStatus == 'GetAll') {
              //  alert('get success' + data.allPackages.length)
                return dispatch({ type: Packages_Action.SHOW, packageList: data.allPackages })
            }
            else {
                return dispatch({ type: Packages_Action.FAILED })
            }

        })
    })
}
