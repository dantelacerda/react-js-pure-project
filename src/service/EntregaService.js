import Cookies from 'universal-cookie';

export async function InserirNovaEntrega(userData) {
    var cookies = new Cookies();
    return new Promise((resolve, reject) =>{
        fetch('http://domain' + '/Entrega/Exibicao/cm_group', {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': cookies.get('accessToken')
            },
            method: 'POST',
            body: JSON.stringify(userData)
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

export function GetEntrega(value) {
    var cookies = new Cookies();
    return new Promise((resolve, reject) =>{
        fetch('http://domain' +'/Entrega/Exibicao/' + value, {
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

