import { Packages_Action } from '../constants/packagesActions'
var jwt = require('jsonwebtoken');
var key = "this_is_our_super_long_key_for_token_validation_project_2019_06_28$smesk.in";
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
                // alert('succes created' + data.allPackages.length)
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
        headers: {
            'Content-Type': 'application/json;charset=UTF-8'
        },
        mode: 'cors',
    }).then((response) => {
        console.log(response.status + "response" + "stattus text is" + response.statusText);
        if (response.status === 404) {
            alert("server error")
        }
        else {
            response.json().then(data => {
                if (data.packageStatus == 'GetAll') {
                    return dispatch({ type: Packages_Action.SHOW, packageList: data.allPackages })
                }
                else {
                    return dispatch({ type: Packages_Action.FAILED })
                }
            })
        }
    }).catch(error => alert(error))
}

export const deletePackage = (id) => dispatch => {
    const postPack = fetch('https://localhost:5001/api/Packages/'+id, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json;charset=UTF-8'
        },
        mode: 'cors',
    }).then((response) => {
        console.log(response.status + "response" + "stattus text is" + response.statusText);
        if (response.status === 404) {
            alert("server error")
        }
        else {
            response.json().then(data => {
                if (data.packageStatus == 'DeletedSuccess') {
                 //   alert(data.packages.id)
                    return dispatch({ type: Packages_Action.SHOW, packageList: data.allPackages })
                }
                else {
                    return dispatch({ type: Packages_Action.FAILED })
                }
            })
        }
    }).catch(error => alert(error))
}


export const fetchPackagebyId = (id) => dispatch => {
    const postPack = fetch('https://localhost:5001/api/Packages/'+id, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json;charset=UTF-8'
        },
        mode: 'cors',
    }).then((response) => {
        console.log(response.status + "response" + "stattus text is" + response.statusText);
        if (response.status === 404) {
            alert("server error")
        }
        else {
            response.json().then(data => {
                if (data.packageStatus == 'GetSpecific') {
                    alert(data.packages.id)
                    return dispatch({ type: Packages_Action.UNDERUPDATE, package: data.packages })
                }
                else {
                    return dispatch({ type: Packages_Action.FAILED })
                }
            })
        }
    }).catch(error => alert(error))
}

export const updatePackage = (id,packageName, price, totalusers, providedStorage, duration) => dispatch => {
    var packData = {'Id':id,
        'Name': packageName, 'Price': price, 'Totalusers': totalusers,
        'providedStorage': providedStorage, 'totalDuration': duration
    }
    const postPack = fetch('https://localhost:5001/api/Packages/'+id, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json;charset=UTF-8' },
        mode: 'cors',
        body: JSON.stringify(packData)
    }).then((response) => {
        console.log(response.status + "response");
        response.json().then(data => {
            //  console.log(data.status+"data")
            console.log(data.packageStatus + data.allPackages.length)
            if (data.packageStatus == 'UpdatedSuccess') {
                //this.fetchPackage();
              
               return dispatch({ type: Packages_Action.SHOW, packageList: data.allPackages })
            }
            else if (data.packageStatus == 'CreatedFailure') {
                return dispatch({ type: Packages_Action.FAILED })
            }

        })
    })
}


