import Cookies from 'universal-cookie';

function GetExibidoraByName(value, cb) {
    var cookies = new Cookies();
    var param = value.replace("/","")
    return new Promise((resolve, reject) =>{
        fetch('http://url' +'sigla-nome/' + encodeURIComponent(param) + '*', {
            headers: {
                'Accept': 'application/json',
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


export function GetExibidora(value, cb) {

    if(value.length >= 1){

    GetExibidoraByName(value).then((result) => {
            return setTimeout(cb, 1, result);
        });
    }

}

export function GetExibidoraByExactlyName(value, cb) {
    var cookies = new Cookies();
    var param = value.replace("/","")
    return new Promise((resolve, reject) =>{
        fetch('http://url' +'sigla-nome/' + encodeURIComponent(param), {
            headers: {
                'Accept': 'application/json',
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