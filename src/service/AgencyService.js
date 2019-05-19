import Cookies from 'universal-cookie';

function GetAgenciaByName(value, cb) {
    var cookies = new Cookies();

    return new Promise((resolve, reject) =>{
        fetch('http://url' +'nome/' + encodeURIComponent(value), {
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


export function GetAgencia(value, cb) {
    value = createEncodedUriParam(value)
    if(value.length > 2){
        GetAgenciaByName(value).then((result) => {
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