import Cookies from 'universal-cookie';

function GetContactByName(value, cb) {
    var cookies = new Cookies();
    var param = value.replace("/","")
    return new Promise((resolve, reject) =>{
        fetch('http://url' + encodeURIComponent(param) + '*', {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': cookies.get('accessToken')
            },
            method: 'GET'
        })
            .then((response) => response.json())
            .then((res) => {
                resolve(res);
            })
            .catch((error) => {
                reject(error);
            });
    });
}


export function GetContact(value, cb) {
    value = createEncodedUriParam(value)
    if(value.length >= 1){
        GetContactByName(value).then((result) => {
            return setTimeout(cb, 1, result);
        });
    }

}

export function GetContactByExactlyName(value) {
    var cookies = new Cookies();
    var param = value.replace("/","")
    return new Promise((resolve, reject) =>{
        fetch('http://url' + encodeURIComponent(param), {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': cookies.get('accessToken')
            },
            method: 'GET'
        })
            .then((response) => response.json())
            .then((res) => {
                resolve(res);
            })
            .catch((error) => {
                reject(error);
            });
    });
}

function createEncodedUriParam(param) {
    while(param.startsWith('/')) {
        param = param.replace(param.substr(0,1),'')
    }
    return param;
}