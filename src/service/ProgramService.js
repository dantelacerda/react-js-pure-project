import Cookies from 'universal-cookie';

function GetProgramByName(value, cb) {
    var cookies = new Cookies();
    var param = value.replace("/","")
    return new Promise((resolve, reject) =>{
        fetch('http://url' +'nome-sigla/' + encodeURIComponent(param) + '*'
            + '?dias_vigencia_passado=5&dias_vigencia_futuro=10', {
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


export function GetProgram(value, cb) {

    if(value.length >= 1){
    GetProgramByName(value).then((result) => {
            return setTimeout(cb, 1, result);
        });
    }

}

export function GetProgramByExactlyName(value) {
    var cookies = new Cookies();
    var param = value.replace("/","")
    return new Promise((resolve, reject) =>{
        fetch('http://url' +'nome-sigla/' + encodeURIComponent(param)
            + '?dias_vigencia_passado=5&dias_vigencia_futuro=10', {
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