import Cookies from 'universal-cookie';

function GetClienteByName(value, cb) {

    var cookies = new Cookies();
    return new Promise((resolve, reject) =>{
        fetch('http://url' +'getby_name/' + encodeURIComponent(value), {
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

export function GetClienteByCnpj(value, cb) {

    var cookies = new Cookies();
    return new Promise((resolve, reject) =>{
        fetch('http://url' + 'getby_cpfcnpj/' + encodeURIComponent(value), {
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


export function GetClientes(value, cb) {
    value = createEncodedUriParam(value)
       if(value.length > 2){
            GetClienteByName(value).then((result) => {
                return setTimeout(cb, 1, result);
            });
       }

}


export function GetClientesCnpj(value, cb) {

    value = createEncodedUriParam(value)
        if(value.length > 2){
            GetClienteByCnpj(value).then((result) => {
                return setTimeout(cb, 1, result);
            });
        }

}

function createEncodedUriParam(param) {
    while(param.startsWith('/')) {
        param = param.replace(param.substr(0,1),'')
    }
    return param;
}